import { Controller } from '@nestjs/common'
import { MailerService } from './mailer.service'

@Controller('mailer')
export class MailerController {
	constructor(private mailerService: MailerService) {}

	// @Post()
	// async sendMail() {
	// 	// return await this.mailerService.sendMail()
	// }
}
