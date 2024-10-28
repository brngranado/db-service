import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}
  async create(createWalletDto: CreateWalletDto) {
    const user = await this.usersRepository.findOne({
      where: {
        document: createWalletDto.document,
        phone: createWalletDto.phone,
      },
    });

    if (!user) {
      return {
        message: 'User not found',
        status: 404,
      };
    }
    const wallet = this.walletRepository.create({
      ...createWalletDto,
      created_at: new Date().toISOString(),
      type: 'charge',
    });
    return this.walletRepository.save(wallet);
  }

  async createExpense(createWalletDto: CreateWalletDto) {
    const user = await this.usersRepository.findOne({
      where: {
        document: createWalletDto.document,
        phone: createWalletDto.phone,
      },
    });

    if (!user) {
      return {
        message: 'User not found',
        status: 404,
      };
    }
    const wallet = this.walletRepository.create({
      ...createWalletDto,
      created_at: new Date().toISOString(),
      type: 'expense',
    });
    return this.walletRepository.save(wallet);
  }
  async findAll(query: any) {
    const { phone, document } = query;

    const records = await this.walletRepository.find({
      where: { phone: `+${phone}`, document: document },
    });

    const charges = records
      .filter((record) => record.type === 'charge')
      .reduce((acc, record) => acc + record.amount, 0);

    const expenses = records
      .filter((record) => record.type === 'expense')
      .reduce((acc, record) => acc + record.amount, 0);

    const balance = charges - expenses;

    return {
      charges,
      expenses,
      balance,
    };
  }
  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
