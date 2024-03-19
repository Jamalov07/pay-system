import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { CompanyCreateRequest } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'

export class CompanyCreateRequestDto implements CompanyCreateRequest {
	@ApiProperty({ example: 'jamalov 12' })
	@IsString()
	@IsOptional()
	address?: string

	@ApiProperty({ example: 'jamalov' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	ownerId: string
}
