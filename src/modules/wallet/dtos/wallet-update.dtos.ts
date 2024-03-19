import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'
import { ConfirmPaymentRequest, ConfirmPaymentResponse, PayForAllRequest, PayForAllResponse, WalletUpdateRequest } from '../interfaces'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { WalletFindOneResponseDto } from './wallet-retrieve.dtos'

export class WalletUpdateRequestDto implements WalletUpdateRequest {
	@ApiPropertyOptional({ type: String, example: 'pasword' })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	password?: number
}

export class PayForAllRequestDto implements PayForAllRequest {
	@ApiProperty({ example: 200 })
	@IsNotEmpty()
	// @IsNumber()
	@Type(() => BigInt)
	amountOfMoney: bigint

	@ApiProperty({ example: '3500100000000000' })
	@IsNotEmpty()
	// @IsNumber()
	@Type(() => BigInt)
	receiverNumber: bigint

	@ApiProperty({ example: '10000000000000000001' })
	@IsNotEmpty()
	// @IsNumber()
	@Type(() => BigInt)
	senderNumber: bigint
}

export class PayForAllResponseDto implements PayForAllResponse {
	@ApiProperty({ example: 'uuid' })
	id: string
}

export class ConfirmPaymentRequestDto implements ConfirmPaymentRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string

	@ApiProperty({ example: '4444' })
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	password: number
}

export class ConfirmPaymentResponseDto implements ConfirmPaymentResponse {
	@ApiProperty({ example: 1234567876543 })
	amountOfMoney: bigint

	@ApiProperty({ example: new Date() })
	createdAt: Date

	@ApiProperty({ type: WalletFindOneResponseDto })
	receiver: any

	@ApiProperty({ type: WalletFindOneResponseDto })
	sender: any
}
