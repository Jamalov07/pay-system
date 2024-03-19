import { WalletOptional } from './wallet-fields.interfaces'

export declare type WalletUpdateRequest = Pick<WalletOptional, 'password'>

export declare type WalletUpdateResponse = { message: string }

export declare type PayForAllRequest = {
	senderNumber: bigint
	amountOfMoney: bigint
	receiverNumber: bigint
}

export declare type PayForAllResponse = { id: string }

export declare type ConfirmPaymentRequest = { id: string; password: number }
export declare type ConfirmPaymentResponse = { sender: any; receiver: any; amountOfMoney: any; createdAt: Date }
