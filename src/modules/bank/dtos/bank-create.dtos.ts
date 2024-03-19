import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Max, Min } from 'class-validator'
import { BankCreateRequest } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class BankCreateRequestDto implements BankCreateRequest {
	@ApiProperty({ type: String, example: 'name' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ type: String, example: 'address' })
	@IsString()
	@IsOptional()
	address?: string

	@ApiProperty({ type: String, example: '7800' })
	@IsString()
	@Length(4)
	@IsNotEmpty()
	@Type(() => String)
	cardStarts: string

	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	@IsOptional()
	isMain?: boolean

	@ApiProperty({ type: Number, example: 5 })
	@IsNumber()
	@Min(1)
	@Max(10)
	@IsNotEmpty()
	cardExpiration: number
}

export class SeparateMoneyFromMainBankDto {
	@ApiProperty({ example: 50000 })
	// @IsNumber()
	@IsNotEmpty()
	money: bigint

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	bankId: string
}
