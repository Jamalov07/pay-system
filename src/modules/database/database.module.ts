import { Module } from '@nestjs/common'
import { BankPrismaService } from './bank-postgres.service'
import { UserPrismaService } from './user-postgres.service'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [ConfigModule],
	providers: [BankPrismaService, UserPrismaService],
	exports: [BankPrismaService, UserPrismaService],
})
export class DatabaseModule {}
