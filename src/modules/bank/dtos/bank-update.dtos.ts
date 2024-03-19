import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { BankUpdateRequest } from '../interfaces'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class BankUpdateRequestDto implements BankUpdateRequest {
	@ApiPropertyOptional({ type: String, example: 'name' })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ type: String, example: 'address' })
	@IsString()
	@IsOptional()
	address?: string

	@ApiPropertyOptional({ type: String, example: 'cardstarts' })
	@IsString()
	@IsOptional()
	cardStarts?: string

	@ApiPropertyOptional({ type: Boolean, example: true })
	@IsBoolean()
	@IsOptional()
	isMain?: boolean

	@ApiPropertyOptional({ type: Number, example: 5 })
	@IsString()
	@IsOptional()
	cardExpiration?: number
}
