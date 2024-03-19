import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator'
import { CompanyFindAllRequest, CompanyFindAllResponse, CompanyFindOneRequest, CompanyFindOneResponse } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { UserFindOneResponseDto } from '../../user'

export class CompanyFindOneRequestDto implements CompanyFindOneRequest {
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class CompanyFindOneResponseDto implements CompanyFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'uuid@gmail.com' })
	name: string

	@ApiProperty({ example: 'uuidjon' })
	address: string

	@ApiProperty({ example: new Date() })
	createdAt: Date

	@ApiProperty({ type: UserFindOneResponseDto, isArray: true })
	owner: any
}

export class CompanyFindAllRequestDto implements CompanyFindAllRequest {
	@IsEmail()
	@IsOptional()
	name?: string

	@IsString()
	@IsOptional()
	address?: string

	@IsUUID('4')
	@IsOptional()
	ownerId?: string

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

export class CompanyFindAllResponseDto implements CompanyFindAllResponse {
	@ApiProperty({ example: 4 })
	count: number

	@ApiProperty({ type: CompanyFindOneResponseDto, isArray: true })
	data: CompanyFindOneResponseDto[]

	@ApiProperty({ example: 4 })
	pageSize: number
}
