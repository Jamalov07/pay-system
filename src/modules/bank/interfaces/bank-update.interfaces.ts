import { BankOptional } from './bank-fields.interfaces'

export declare type BankUpdateRequest = Pick<BankOptional, 'address' | 'cardExpiration' | 'cardStarts' | 'name' | 'isMain'>

export declare type BankUpdateResponse = null
