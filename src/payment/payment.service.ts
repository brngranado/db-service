import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import * as crypto from 'crypto';
import { WalletService } from 'src/wallet/wallet.service';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    private readonly walletService: WalletService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    private readonly emailService: EmailService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const { document, amount } = createPaymentDto;
    const userFinded = await this.usersRepository.findOne({
      where: { document },
    });

    const phone = userFinded.phone.slice(1);

    const wallet = await this.walletService.findAll({
      phone: phone,
      document: document,
    });

    if (!wallet || wallet.balance < amount) {
      return {
        message: 'Insufficient balance',
        status: 500,
      };
    }

    const token = this.generateToken();

    await this.emailService.sendMail({
      to: userFinded.email,
      subject: 'Payment Confirmation',
      text: `Your payment confirmation token is: ${token}`,
      templete: './src/email/templete.pug',
      dataTemplete: {
        title: 'Payment Confirmation',
        token: token,
        amount: amount,
      },
    });

    const sessionId = this.generateSessionId();

    await this.paymentRepository.save({
      document: document,
      amount: amount,
      user_id: sessionId,
      token: 0,
      created_at: new Date().toISOString(),
    });

    return {
      message: 'A confirmation email has been sent.',
      sessionId,
      token,
    };
  }

  private generateToken(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  private generateSessionId(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  async confirm(confirmPaymentDto: ConfirmPaymentDto) {
    const { sessionId, token } = confirmPaymentDto;

    const payment = await this.paymentRepository.findOne({
      where: { user_id: sessionId },
    });

    if (!payment) {
      return {
        message: 'Invalid session ID',
      };
    }

    const user = await this.usersRepository.findOne({
      where: { document: payment.document },
    });

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    await this.walletService.createExpense({
      phone: user.phone,
      document: user.document,
      amount: payment.amount,
    });

    await this.paymentRepository.update(
      { user_id: sessionId, document: payment.document },
      { token: token },
    );

    return {
      message: 'Payment confirmed successfully',
      status: 200,
    };
  }
}
