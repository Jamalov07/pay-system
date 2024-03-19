import { IsDateString, IsEmail, IsOptional, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator'
import { UserUpdateRequest } from '../interfaces'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class UserUpdateRequestDto implements UserUpdateRequest {
	@ApiProperty({ example: new Date() })
	@IsDateString()
	@IsOptional()
	birthdayDate?: Date

	@ApiProperty({ example: 'jamalov@gmail.com' })
	@IsEmail()
	@IsOptional()
	email?: string

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

	@ApiProperty({ example: 'AS1112111' })
	@IsString()
	@IsOptional()
	@Matches(/^[A-Z]{2}\d{7}$/, { message: 'Passport number is not valid' })
	passportNumber?: string

	@ApiProperty({ example: '1234567' })
	@IsString()
	@IsOptional()
	password?: string

	@ApiProperty({ example: '999229245556' })
	@IsPhoneNumber('UZ')
	@IsOptional()
	phoneNumber?: string

	@ApiProperty({ example: '12345677654321' })
	@IsString()
	@IsOptional()
	@Type(() => BigInt)
	pinfl?: string
}
