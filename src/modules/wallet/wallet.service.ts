import { Injectable, NotFoundException } from '@nestjs/common'
import { WalletRepository } from './wallet.repository'
import {
	ConfirmPaymentRequest,
	ConfirmPaymentResponse,
	PayForAllRequest,
	PayForAllResponse,
	PaymentHistoryFindAllRequest,
	PaymentHistoryFindAllResponse,
	WalletCreateRequest1,
	WalletCreateRequest2,
	WalletCreateResponse,
	WalletDeleteRequest,
	WalletDeleteResponse,
	WalletFindAllRequest,
	WalletFindAllResponse,
	WalletFindOneRequest,
	WalletFindOneResponse,
	WalletUpdateRequest,
	WalletUpdateResponse,
} from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from './constants'

@Injectable()
export class WalletService {
	readonly walletRepository: WalletRepository
	constructor(walletRepository: WalletRepository) {
		this.walletRepository = walletRepository
	}

	async findAll(payload: WalletFindAllRequest): Promise<WalletFindAllResponse> {
		const wallets = await this.walletRepository.findAll(payload)
		const count = await this.walletRepository.countAll(payload)

		return { count, data: wallets, pageSize: wallets.length }
	}

	async findOne(payload: WalletFindOneRequest): Promise<WalletFindOneResponse> {
		const wallet = await this.walletRepository.findOneById(payload)
		if (!wallet) {
			throw new NotFoundException('Wallet not found')
		}
		return wallet
	}

	async createCard(payload: WalletCreateRequest1): Promise<WalletCreateResponse> {
		return await this.walletRepository.createCard(payload)
	}

	async createWallet(payload: WalletCreateRequest2): Promise<{ message: string }> {
		return await this.walletRepository.createWallet(payload)
	}

	async update(payload1: WalletFindOneRequest, payload2: WalletUpdateRequest): Promise<WalletUpdateResponse> {
		await this.walletRepository.findOneById(payload1)

		return await this.walletRepository.update(payload1, payload2)
	}

	async delete(payload: WalletDeleteRequest): Promise<WalletDeleteResponse> {
		await this.walletRepository.delete(payload)
		return null
	}

	async payForAll(payload: PayForAllRequest): Promise<PayForAllResponse> {
		return this.walletRepository.payForAny(payload)
	}

	async confirmPayment(payload: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> {
		return this.walletRepository.confirmPayment(payload)
	}

	async paymentHistoryFindAll(payload: PaymentHistoryFindAllRequest): Promise<PaymentHistoryFindAllResponse> {
		return this.walletRepository.findAllPaymentHistory({
			...payload,
			pageNumber: PAGE_NUMBER,
			pageSize: PAGE_SIZE,
		})
	}
}
