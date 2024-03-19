import { PaginationRequest, PaginationResponse } from '../../../interfaces'
import { WalletType } from '../enums'
import { WalletOptional, WalletRequeired } from './wallet-fields.interfaces'

export declare type WalletFindOneRequest = Pick<WalletRequeired, 'id'>

export declare type WalletFindOneResponse = Pick<WalletRequeired, 'id' | 'type' | 'number' | 'expiredDate' | 'balance' | 'createdAt'> & {
	bank: any
	owner?: any
	company?: any
}

export declare type WalletFindAllRequest = PaginationRequest & Pick<WalletOptional, 'number' | 'bankId' | 'ownerId' | 'companyId'> & { type?: WalletType }

export declare type WalletFindAllResponse = PaginationResponse<WalletFindOneResponse>

export declare type PaymentHistoryFindAllRequest = {
	userId?: string
	bankId?: string
	walletId?: string
	companyId?: string
	pageNumber?: number
	pageSize?: number
}

export declare type PaymentHistoryFindAllResponse = PaginationResponse<{ sender: any; receiver: any; moneyAmount: any }>
