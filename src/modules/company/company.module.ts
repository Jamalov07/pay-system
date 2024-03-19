import { Module } from '@nestjs/common'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { CompanyRepository } from './company.repository'
import { DatabaseModule } from '../database'

@Module({
	imports: [DatabaseModule],
	controllers: [CompanyController],
	providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
