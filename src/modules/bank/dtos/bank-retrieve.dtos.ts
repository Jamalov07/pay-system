import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator'
import { BankFindAllRequest, BankFindAllResponse, BankFindOneRequest, BankFindOneResponse } from '../interfaces'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
export class BankFindOneRequestDto implements BankFindOneRequest {
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class BankFindOneResponseDto implements BankFindOneResponse {
	@ApiProperty({ type: String, example: 'uuid' })
	id: string

	@ApiProperty({ type: String, example: 'bank name' })
	name: string

	@ApiProperty({ type: String, example: 'address' })
	address: string

	@ApiProperty({ type: Boolean, example: true })
	isMain: boolean

	@ApiProperty({ type: String, example: '8600' })
	cardStarts: string

	@ApiProperty({ type: Number, example: 5 })
	cardExpiration: number

	@ApiProperty({ type: Date, example: '2023.11.11' })
	createdAt: Date
}

export class BankFindAllRequestDto implements BankFindAllRequest {
	@IsString()
	@IsOptional()
	name?: string

	@IsString()
	@IsOptional()
	address?: string

	@IsBoolean()
	@IsOptional()
	isMain?: boolean

	@IsString()
	@IsOptional()
	cardStarts?: string

	@IsPositive()
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	pageNumber?: number

	@IsPositive()
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	pageSize?: number
}

export class BankFindAllResponseDto implements BankFindAllResponse {
	@ApiProperty({ type: BankFindOneResponseDto, isArray: true })
	data: BankFindOneResponseDto[]

	@ApiProperty({ type: Number, example: 5 })
	count: number

	@ApiProperty({ type: Number, example: 10 })
	pageSize: number
}
