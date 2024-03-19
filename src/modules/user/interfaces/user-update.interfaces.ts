import { UserOptional } from './user-fields.interfaces'

export declare type UserUpdateRequest = Pick<
	UserOptional,
	'birthdayDate' | 'email' | 'firstName' | 'lastName' | 'middleName' | 'passportNumber' | 'password' | 'phoneNumber' | 'pinfl'
>
export declare type UserUpdateResponse = null
