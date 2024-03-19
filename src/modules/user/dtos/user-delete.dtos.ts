import { IsNotEmpty, IsUUID } from 'class-validator'
import { UserDeleteRequest } from '../interfaces'

export class UserDeleteRequestDto implements UserDeleteRequest {
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
