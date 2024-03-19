import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator'
import { UserCreateRequest } from '../interfaces'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class UserCreateRequestDto implements UserCreateRequest {
	@ApiProperty({ example: 'jamalov@gmail.com' })
	@IsEmail()
	@IsNotEmpty()
	email: string

	@ApiProperty({ example: new Date() })
	@IsDateString()
	@IsNotEmpty()
	birthdayDate?: Date

	@ApiProperty({ example: 'jamal' })
	@IsString()
	@MinLength(4)
	@IsOptional()
	firstName?: string

	@ApiProperty({ example: 'jamalov' })
	@IsString()
	@MinLength(5)
	@IsOptional()
	lastName?: string

	@ApiProperty({ example: 'jamalovich' })
	@IsString()
	@MinLength(8)
	@IsOptional()
	middleName?: string

	@ApiProperty({ example: 'AS1111111' })
	@IsString()
	@IsOptional()
	@Matches(/^[A-Z]{2}\d{7}$/, { message: 'Passport number is not valid' })
	passportNumber?: string

	@ApiProperty({ example: '998192222222' })
	@IsPhoneNumber('UZ')
	@IsNotEmpty()
	phoneNumber: string

	@ApiProperty({ example: '11111112222211' })
	@IsString()
	@IsOptional()
	@Type(() => BigInt)
	pinfl?: string
}
