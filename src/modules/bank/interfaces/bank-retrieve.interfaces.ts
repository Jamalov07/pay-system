import { PaginationRequest, PaginationResponse } from '../../../interfaces'
import { BankOptional, BankRequeired } from './bank-fields.interfaces'

export declare type BankFindOneRequest = Pick<BankRequeired, 'id'>

export declare type BankFindOneResponse = Pick<BankRequeired, 'id' | 'address' | 'name' | 'cardExpiration' | 'cardStarts' | 'isMain' | 'createdAt'>

export declare type BankFindAllRequest = PaginationRequest & Pick<BankOptional, 'name' | 'address' | 'cardStarts' | 'isMain'>

export declare type BankFindAllResponse = PaginationResponse<BankFindOneResponse>
