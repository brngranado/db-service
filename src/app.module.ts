import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'admin',
      database: process.env.DB_NAME || 'wallet',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + 'src/migrations/**/*{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    WalletModule,
    UserModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
