export declare interface BankRequeired {
	id: string
	name: string
	isMain: boolean
	address: string
	cardStarts: string
	cardExpiration: number
	createdAt: Date
	updatedAt: Date
	deletedAt: Date
}

export declare interface BankOptional {
	id?: string
	name?: string
	isMain?: boolean
	address?: string
	cardStarts?: string
	cardExpiration?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}
