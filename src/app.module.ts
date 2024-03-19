import { Module } from '@nestjs/common'
import { BankModule, DatabaseModule, WalletModule, UserModule, CompanyModule } from './modules'
import { ConfigModule } from '@nestjs/config'
import { bankDbConfig, userDbConfig } from './configs'
import { NestMailerModule } from './nest-mailer/nest-mailer.module'
import { MailerModule } from './modules/node-mailer/mailer.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [userDbConfig, bankDbConfig] }),
		DatabaseModule,
		BankModule,
		WalletModule,
		UserModule,
		CompanyModule,
		NestMailerModule,
		MailerModule,
	],
})
export class AppModule {}
