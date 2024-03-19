import { UserOptional, UserRequired } from './user-fields.interfaces'

export declare type UserCreateRequest = Pick<UserRequired, 'email' | 'phoneNumber'> &
	Pick<UserOptional, 'birthdayDate' | 'firstName' | 'lastName' | 'middleName' | 'passportNumber' | 'pinfl'>
export declare type UserCreateResponse = null
