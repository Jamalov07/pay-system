import { IsNotEmpty, IsUUID } from 'class-validator'
import { CompanyDeleteRequest } from '../interfaces'

export class CompanyDeleteRequestDto implements CompanyDeleteRequest {
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
