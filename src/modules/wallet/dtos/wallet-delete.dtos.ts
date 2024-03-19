import { IsNotEmpty, IsUUID } from 'class-validator'
import { WalletDeleteRequest } from '../interfaces'

export class WalletDeteleRequestDto implements WalletDeleteRequest {
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
