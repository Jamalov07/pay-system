import { WalletType } from '../enums'

export declare interface WalletRequeired {
	id: string
	bankId: string
	ownerId: string
	companyId: string
	type: string | WalletType
	number: string
	expiredDate: Date
	balance: string
	password?: number
	createdAt: Date
	updatedAt: Date
	deletedAt: Date
}

export declare interface WalletOptional {
	id?: string
	bankId?: string
	ownerId?: string
	companyId?: string
	type?: string
	number?: string
	expiredDate?: Date
	balance?: string
	password?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}
