import { IsNotEmpty, IsUUID } from 'class-validator'
import { BankDeleteRequest } from '../interfaces'

export class BankDeteleRequestDto implements BankDeleteRequest {
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
