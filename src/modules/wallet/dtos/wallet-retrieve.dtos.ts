import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator'
import {
	PaymentHistoryFindAllRequest,
	PaymentHistoryFindAllResponse,
	WalletFindAllRequest,
	WalletFindAllResponse,
	WalletFindOneRequest,
	WalletFindOneResponse,
} from '../interfaces'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { WalletType } from '../enums'
export class WalletFindOneRequestDto implements WalletFindOneRequest {
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class WalletFindOneResponseDto implements WalletFindOneResponse {
	@ApiProperty({ type: String, example: 'uuid' })
	id: string

	@ApiProperty({ type: String, example: 'name' })
	type: string

	@ApiProperty({ type: String, example: 'number' })
	number: string

	@ApiProperty({ example: '50000' })
	balance: string

	@ApiProperty({ type: Date, example: '2023.11.11' })
	expiredDate: Date

	@ApiProperty({ type: Date, example: '2023.11.11' })
	createdAt: Date

	bank: any
	company?: any
	owner?: any
}

export class WalletFindAllRequestDto implements WalletFindAllRequest {
	@IsUUID('4')
	@IsString()
	@IsOptional()
	bankId?: string

	@IsUUID('4')
	@IsString()
	@IsOptional()
	companyId?: string

	@IsUUID('4')
	@IsString()
	@IsOptional()
	ownerId?: string

	@IsString()
	@IsOptional()
	number?: string

	@IsString()
	@IsEnum(WalletType)
	@IsOptional()
	type?: WalletType

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

export class WalletFindAllResponseDto implements WalletFindAllResponse {
	@ApiProperty({ type: WalletFindOneResponseDto, isArray: true })
	data: WalletFindOneResponseDto[]

	@ApiProperty({ type: Number, example: 5 })
	count: number

	@ApiProperty({ type: Number, example: 10 })
	pageSize: number
}

export class PaymentHistoryFindAllRequestDto implements PaymentHistoryFindAllRequest {
	@IsUUID('4')
	@IsOptional()
	bankId?: string

	@IsUUID('4')
	@IsOptional()
	companyId?: string

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

	@IsUUID('4')
	@IsOptional()
	userId?: string

	@IsUUID('4')
	@IsOptional()
	walletId?: string
}

class PaymentFindOneResponse {
	@ApiProperty({ type: WalletFindOneResponseDto })
	sender: any

	@ApiProperty({ type: WalletFindOneResponseDto })
	receiver: any

	@ApiProperty({ example: 4456545 })
	amountMoney: bigint
}

export class PaymentHistoryFindAllResponseDto implements PaymentHistoryFindAllResponse {
	@ApiProperty({ example: 4 })
	count: number

	@ApiProperty({ type: PaymentFindOneResponse })
	data: { sender: any; receiver: any; moneyAmount: bigint }[]

	@ApiProperty({ example: 4 })
	pageSize: number
}
