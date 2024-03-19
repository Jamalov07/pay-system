import { BadRequestException, Injectable } from '@nestjs/common'
import { BankPrismaService, UserPrismaService } from '../database'
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
	WalletFindOneRequest,
	WalletFindOneResponse,
	WalletUpdateRequest,
	WalletUpdateResponse,
} from './interfaces'
import { MailerService } from '../node-mailer/mailer.service'
import { NestMailerService } from '../../nest-mailer/nest-mailer.service'

@Injectable()
export class WalletRepository {
	readonly userDb: UserPrismaService
	readonly bankDb: BankPrismaService
	mailerSerivce: MailerService
	nestMailerService: NestMailerService

	constructor(userDb: UserPrismaService, bankDb: BankPrismaService, mailerService: MailerService, nestMailerService: NestMailerService) {
		this.userDb = userDb
		this.bankDb = bankDb
		this.mailerSerivce = mailerService
		this.nestMailerService = nestMailerService
	}

	async findOneById(payload: WalletFindOneRequest): Promise<WalletFindOneResponse> {
		return await this.bankDb.wallet.findFirst({
			where: { id: payload.id },
			select: { id: true, balance: true, bank: { select: { id: true, cardStarts: true, name: true } }, createdAt: true, expiredDate: true, number: true, type: true },
		})
	}

	async findAll(payload: WalletFindAllRequest): Promise<WalletFindOneResponse[]> {
		return this.bankDb.wallet.findMany({
			where: {
				number: { contains: payload.number, mode: 'insensitive' },
				type: payload.type,
				ownerId: payload.ownerId,
				bankId: payload.bankId,
				companyId: payload.companyId,
			},
			select: {
				id: true,
				balance: true,
				bank: { select: { id: true, cardStarts: true, name: true } },
				createdAt: true,
				expiredDate: true,
				number: true,
				type: true,
				password: true,
			},
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
		})
	}

	async countAll(payload: WalletFindAllRequest): Promise<number> {
		return this.bankDb.wallet.count({
			where: {
				number: { contains: payload.number, mode: 'insensitive' },
				type: payload.type,
				ownerId: payload.ownerId,
				bankId: payload.bankId,
				companyId: payload.companyId,
			},
		})
	}

	async createCard(payload: WalletCreateRequest1): Promise<WalletCreateResponse> {
		const owner = await this.userDb.user.findFirst({ where: { id: payload.ownerId } })
		if (!owner) {
			throw new BadRequestException('Owner not found ')
		}

		if (!owner.passportNumber || !owner.pinfl) {
			throw new BadRequestException('Your profil is not full filled, please update your profile')
		}
		if (!owner.birthdayDate || !owner.firstName || !owner.lastName || !owner.middleName) {
			throw new BadRequestException('Your profil is not full filled, please update your profile')
		}
		const bank = await this.bankDb.bank.findFirst({ where: { id: payload.bankId } })
		if (!bank) {
			throw new BadRequestException('bank not found with ' + payload.bankId)
		}
		if (bank.isMain) {
			throw new BadRequestException('This bank is a main')
		}
		let cardNumber = await this.bankDb.incrementCardNumber.findFirst({})
		let number = ''

		if (cardNumber) {
			number = `${BigInt(cardNumber.num) + 1n}`
			await this.bankDb.incrementCardNumber.update({ where: { id: cardNumber.id }, data: { num: `${BigInt(cardNumber.num) + 1n}` } })
		} else {
			cardNumber = await this.bankDb.incrementCardNumber.create({})
			number = cardNumber.num
		}
		const wallet = await this.bankDb.wallet.create({
			data: {
				bankId: payload.bankId,
				ownerId: payload.ownerId,
				type: 'card',
				expiredDate: new Date(new Date().setFullYear(new Date().getFullYear() + bank.cardExpiration)),
				number: number,
			},
		})
		return { id: wallet.id }
	}
	async createWallet(payload: WalletCreateRequest2): Promise<{ message: string }> {
		const company = await this.userDb.company.findFirst({ where: { id: payload.companyId } })
		if (!company) {
			throw new BadRequestException('Company not found ')
		}
		const owner = await this.userDb.user.findFirst({ where: { id: company.ownerId } })
		if (!owner) {
			throw new BadRequestException('Owner not found ')
		}

		if (!owner.passportNumber || !owner.pinfl) {
			throw new BadRequestException('Your profil is not full filled, please update your profile')
		}
		if (!owner.birthdayDate || !owner.firstName || !owner.lastName || !owner.middleName) {
			throw new BadRequestException('Your profil is not full filled, please update your profile')
		}

		const bank = await this.bankDb.bank.findFirst({ where: { id: payload.bankId } })
		if (!bank) {
			throw new BadRequestException('bank not found with ' + payload.bankId)
		}
		if (bank.isMain) {
			throw new BadRequestException('This bank is a main')
		}
		let walletNumber = await this.bankDb.incrementWalletNumber.findFirst({})
		let number = ''

		if (walletNumber) {
			number = `${BigInt(walletNumber.num) + 1n}`
			await this.bankDb.incrementWalletNumber.update({ where: { id: walletNumber.id }, data: { num: `${BigInt(walletNumber.num) + 1n}` } })
		} else {
			walletNumber = await this.bankDb.incrementWalletNumber.create({})
			number = walletNumber.num
		}

		await this.bankDb.wallet.create({
			data: {
				bankId: payload.bankId,
				companyId: payload.companyId,
				type: 'accountNumber',
				expiredDate: new Date(new Date().setFullYear(new Date().getFullYear() + bank.cardExpiration)),
				number: number,
			},
		})
		return { message: 'successfully created' }
	}

	async update(payload1: WalletFindOneRequest, payload2: WalletUpdateRequest): Promise<WalletUpdateResponse> {
		await this.bankDb.wallet.update({
			where: { id: payload1.id },
			data: { password: payload2.password },
		})
		return { message: 'succesfully updated' }
	}

	async delete(payload: WalletDeleteRequest): Promise<WalletDeleteResponse> {
		await this.bankDb.wallet.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })
		return null
	}

	async payForAny(payload: PayForAllRequest): Promise<PayForAllResponse> {
		const sender = await this.bankDb.wallet.findFirst({ where: { number: String(BigInt(payload.senderNumber)) } })
		if (!sender) {
			throw new BadRequestException('Sender not found')
		}
		if (Number(sender.balance) < Number(payload.amountOfMoney)) {
			throw new BadRequestException('Your balance is not enough')
		}
		console.log(String(BigInt(payload.receiverNumber)))
		const receiver = await this.bankDb.wallet.findFirst({ where: { number: String(payload.receiverNumber) } })
		if (!receiver) {
			throw new BadRequestException('Receiver not found')
		}

		const newPaymentHistory = await this.bankDb.paymentHistory.create({ data: { moneyAmount: payload.amountOfMoney, fromWalletId: sender.id, toWalletId: receiver.id } })

		return { id: newPaymentHistory.id }
	}

	async confirmPayment(payload: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> {
		const paymentHistory = await this.bankDb.paymentHistory.findFirst({ where: { id: payload.id } })
		if (!paymentHistory) {
			throw new BadRequestException('Payment not found')
		}

		console.log(paymentHistory)

		const receiver = await this.bankDb.wallet.findFirst({
			where: { id: paymentHistory.toWalletId },
			select: { bank: { select: { name: true } }, number: true, type: true, balance: true, password: true, id: true, ownerId: true, companyId: true },
		})
		if (!receiver) {
			throw new BadRequestException('Receiver not found')
		}
		const sender = await this.bankDb.wallet.findFirst({
			where: { id: paymentHistory.fromWalletId },
			select: { bank: { select: { name: true } }, number: true, type: true, balance: true, password: true, id: true },
		})
		if (!sender) {
			throw new BadRequestException('Sender not found')
		}
		if (Number(sender.balance) < Number(paymentHistory.moneyAmount)) {
			throw new BadRequestException('Your balance is not enough')
		}
		if (sender.password !== payload.password) {
			throw new BadRequestException('password is incorrect')
		}

		await this.bankDb.wallet.update({ where: { id: sender.id }, data: { balance: String(Number(BigInt(sender.balance)) - Number(BigInt(paymentHistory.moneyAmount))) } })
		await this.bankDb.wallet.update({
			where: { id: paymentHistory.toWalletId },
			data: { balance: String(Number(BigInt(sender.balance)) + Number(BigInt(paymentHistory.moneyAmount))) },
		})

		await this.bankDb.paymentHistory.update({ where: { id: paymentHistory.id }, data: { isSuccess: true } })

		await this.userDb.paymentHistory.create({
			data: { fromWalletId: paymentHistory.fromWalletId, toWalletId: paymentHistory.toWalletId, moneyAmount: paymentHistory.moneyAmount, isSuccess: true },
		})

		if (receiver.type === 'accountNumber') {
			const comp = await this.userDb.company.findFirst({ where: { id: receiver.companyId }, select: { owner: { select: { email: true } } } })
			await this.mailerSerivce.sendMail(comp.owner.email, String(paymentHistory.moneyAmount)).catch(() => undefined)
			await this.nestMailerService.sendMessageToUser(comp.owner.email, String(paymentHistory.moneyAmount)).catch(() => undefined)
		}

		if (receiver.type === 'card') {
			const user = await this.userDb.user.findFirst({ where: { id: receiver.ownerId }, select: { email: true } })
			await this.mailerSerivce.sendMail(user.email, String(paymentHistory.moneyAmount)).catch(() => undefined)
			await this.nestMailerService.sendMessageToUser(user.email, String(paymentHistory.moneyAmount)).catch(() => undefined)
		}

		return { amountOfMoney: paymentHistory.moneyAmount.toString(), createdAt: new Date(), sender: sender, receiver: receiver }
	}

	async findAllPaymentHistory(payload: PaymentHistoryFindAllRequest): Promise<PaymentHistoryFindAllResponse> {
		const { bankId, companyId, userId, walletId } = payload

		const payments1 = await this.bankDb.paymentHistory.findMany({
			where: {
				fromWallet: { id: walletId, bankId: bankId, ownerId: userId, companyId: companyId },
			},
			select: { id: true, toWallet: true, fromWallet: true, moneyAmount: true },
			// skip: (payload.pageNumber - 1) * payload.pageSize,
			// take: payload.pageSize,
		})

		const payments2 = await this.bankDb.paymentHistory.findMany({
			where: {
				toWallet: {
					id: walletId,
					bankId: bankId,
					ownerId: userId,
					companyId: companyId,
				},
			},
			select: { id: true, toWallet: true, fromWallet: true, moneyAmount: true },
			// skip: (payload.pageNumber - 1) * payload.pageSize,
			// take: payload.pageSize,
		})

		// const count = await this.bankDb.paymentHistory.count({
		// 	where: {
		// 		OR: [
		// 			{ fromWallet: { id: walletId, bankId: bankId, ownerId: userId, companyId: companyId } },
		// 			{ toWallet: { id: walletId, bankId: bankId, ownerId: userId, companyId: companyId } },
		// 		],
		// 	},
		// })

		const payments = await this.bankDb.paymentHistory.findMany({
			where: {
				id: { in: [...payments1, ...payments2].map((p) => p.id) },
			},
			select: { id: true, toWallet: true, fromWallet: true, moneyAmount: true },
		})

		return {
			data: payments.map((p) => ({ moneyAmount: p.moneyAmount.toString(), sender: p.fromWallet, receiver: p.toWallet })),
			count: 0,
			pageSize: payments.length,
		}
	}
}
