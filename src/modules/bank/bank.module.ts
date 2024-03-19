import { Module } from '@nestjs/common'
import { BankController } from './bank.controller'
import { BankService } from './bank.service'
import { BankRepository } from './bank.repository'
import { DatabaseModule } from '../database'

@Module({
	imports: [DatabaseModule],
	controllers: [BankController],
	providers: [BankService, BankRepository],
})
export class BankModule {}
