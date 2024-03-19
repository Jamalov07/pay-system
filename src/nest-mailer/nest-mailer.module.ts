import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { Module } from '@nestjs/common'
import { NestMailerService } from './nest-mailer.service'
import 'dotenv/config'

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: process.env.MAILER_HOST,
				port: Number(process.env.MAILER_PORT),
				secure: false,
				auth: {
					user: process.env.MAILDEV_USER,
					pass: process.env.MAILDEV_PASS,
				},
			},
			defaults: {
				from: process.env.MAILDEV_USER,
			},
		}),
	],
	providers: [NestMailerService],
	exports: [NestMailerService],
})
export class NestMailerModule {}
