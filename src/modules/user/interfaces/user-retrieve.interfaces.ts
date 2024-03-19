import { PaginationRequest, PaginationResponse } from '../../../interfaces'
import { UserOptional, UserRequired } from './user-fields.interfaces'

export declare type UserFindOneRequest = Pick<UserRequired, 'id'>

export declare type UserFindOneResponse = Pick<
	UserRequired,
	'id' | 'birthdayDate' | 'firstName' | 'lastName' | 'middleName' | 'passportNumber' | 'email' | 'phoneNumber' | 'pinfl' | 'createdAt'
>

export declare type UserFindAllRequest = PaginationRequest & Pick<UserOptional, 'email' | 'firstName' | 'lastName' | 'middleName' | 'passportNumber' | 'phoneNumber' | 'pinfl'>

export declare type UserFindAllResponse = PaginationResponse<UserFindOneResponse>
