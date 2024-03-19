import { Module } from '@nestjs/common'
import { WalletController } from './wallet.controller'
import { WalletService } from './wallet.service'
import { WalletRepository } from './wallet.repository'
import { DatabaseModule } from '../database'
import { MailerModule } from '../node-mailer/mailer.module'
import { NestMailerModule } from '../../nest-mailer/nest-mailer.module'

@Module({
	imports: [DatabaseModule, MailerModule, NestMailerModule],
	controllers: [WalletController],
	providers: [WalletService, WalletRepository],
})
export class WalletModule {}
