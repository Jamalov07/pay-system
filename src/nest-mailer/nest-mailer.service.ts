import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestMailerService {
	constructor(private readonly mailerService: MailerService) {}

	async sendMessageToUser(email: string, money: any): Promise<null> {
		await this.mailerService
			.sendMail({
				to: email,
				from: 'jamalovn07@gmail.com',
				subject: 'Pul tushdi ' + money,
			})
			.catch(() => undefined)

		return null
	}
}
