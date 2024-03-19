import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { WalletCreateRequest1, WalletCreateRequest2, WalletCreateResponse } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'
import { WalletType } from '../enums'

export class WalletCreateRequest1Dto implements WalletCreateRequest1 {
	@ApiProperty({ type: String, example: 'uuid' })
	@IsString()
	@IsNotEmpty()
	bankId: string

	@ApiProperty({ type: String, example: 'uuid' })
	@IsString()
	@IsUUID('4')
	@IsNotEmpty()
	ownerId: string

	@ApiProperty({ type: String, example: 'card' })
	@IsString()
	@IsEnum(WalletType)
	@IsOptional()
	type: WalletType
}

export class WalletCreateRequest2Dto implements WalletCreateRequest2 {
	@ApiProperty({ type: String, example: 'uuid' })
	@IsString()
	@IsUUID('4')
	@IsNotEmpty()
	bankId: string

	@ApiProperty({ type: String, example: 'uuid' })
	@IsString()
	@IsUUID('4')
	@IsNotEmpty()
	companyId: string

	@ApiProperty({ type: String, example: 'card' })
	@IsString()
	@IsEnum(WalletType)
	@IsOptional()
	type: WalletType
}

export class WalletCreateResponseDto implements WalletCreateResponse {
	@ApiProperty({ example: 'uuid' })
	id: string
}
