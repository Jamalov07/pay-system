import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { DatabaseModule } from '../database'

@Module({
	imports: [DatabaseModule],
	controllers: [UserController],
	providers: [UserService, UserRepository],
})
export class UserModule {}
