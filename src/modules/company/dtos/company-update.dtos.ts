import { IsOptional, IsString, IsUUID } from 'class-validator'
import { CompanyUpdateRequest } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'

export class CompanyUpdateRequestDto implements CompanyUpdateRequest {
	@ApiProperty({ example: 'jamalovich' })
	@IsString()
	@IsOptional()
	name?: string

	@ApiProperty({ example: 'jamalovich' })
	@IsString()
	@IsOptional()
	address?: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	ownerId?: string
}
