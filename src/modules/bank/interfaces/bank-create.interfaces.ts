import { BankOptional, BankRequeired } from './bank-fields.interfaces'

export declare type BankCreateRequest = Pick<BankRequeired, 'name' | 'cardStarts' | 'cardExpiration'> & Pick<BankOptional, 'address' | 'isMain'>

export declare type BankCreateResponse = null
