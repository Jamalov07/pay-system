import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPassportNumber, IsPhoneNumber, IsPositive, IsString, IsUUID } from 'class-validator'
import { UserFindAllRequest, UserFindAllResponse, UserFindOneRequest, UserFindOneResponse } from '../interfaces'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class UserFindOneRequestDto implements UserFindOneRequest {
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class UserFindOneResponseDto implements UserFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'uuid@gmail.com' })
	email: string

	@ApiProperty({ example: new Date() })
	birthdayDate: Date

	@ApiProperty({ example: new Date() })
	createdAt: Date

	@ApiProperty({ example: 'uuidjon' })
	firstName: string

	@ApiProperty({ example: 'uuidbekov' })
	lastName: string

	@ApiProperty({ example: 'uuidaliyevich' })
	middleName: string

	@ApiProperty({ example: 'UU1241211' })
	passportNumber: string

	@ApiProperty({ example: '998948181111' })
	phoneNumber: string

	@ApiProperty({ example: '12345677654321' })
	pinfl: string
}

export class UserFindAllRequestDto implements UserFindAllRequest {
	@IsEmail()
	@IsOptional()
	email?: string

	@IsString()
	@IsOptional()
	firstName?: string

	@IsString()
	@IsOptional()
	lastName?: string

	@IsString()
	@IsOptional()
	middleName?: string

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

	@IsPassportNumber('UZ')
	@IsOptional()
	passportNumber?: string

	@IsPhoneNumber('UZ')
	@IsOptional()
	phoneNumber?: string

	@IsString()
	@IsOptional()
	@Type(() => BigInt)
	pinfl?: string
}

export class UserFindAllResponseDto implements UserFindAllResponse {
	@ApiProperty({ example: 4 })
	count: number

	@ApiProperty({ type: UserFindOneResponseDto, isArray: true })
	data: UserFindOneResponseDto[]

	@ApiProperty({ example: 4 })
	pageSize: number
}
