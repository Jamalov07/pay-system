import { BadRequestException, Injectable } from '@nestjs/common'
import { BankPrismaService, UserPrismaService } from '../database'
import {
	BankCreateRequest,
	BankCreateResponse,
	BankDeleteRequest,
	BankDeleteResponse,
	BankFindAllRequest,
	BankFindOneRequest,
	BankFindOneResponse,
	BankUpdateRequest,
	BankUpdateResponse,
} from './interfaces'

@Injectable()
export class BankRepository {
	readonly userDb: UserPrismaService
	readonly bankDb: BankPrismaService

	constructor(userDb: UserPrismaService, bankDb: BankPrismaService) {
		this.userDb = userDb
		this.bankDb = bankDb
	}

	async findOneById(payload: BankFindOneRequest): Promise<BankFindOneResponse> {
		return await this.bankDb.bank.findFirst({
			where: { id: payload.id },
			select: { id: true, address: true, cardStarts: true, createdAt: true, isMain: true, name: true, cardExpiration: true },
		})
	}

	async findOneByName(name: string): Promise<BankFindOneResponse> {
		return await this.bankDb.bank.findFirst({
			where: { name: name },
			select: { id: true, address: true, cardStarts: true, createdAt: true, isMain: true, name: true, cardExpiration: true },
		})
	}

	async findOneByCardStarts(cardStarts: string): Promise<BankFindOneResponse> {
		return await this.bankDb.bank.findFirst({
			where: { cardStarts: cardStarts },
			select: { id: true, address: true, cardStarts: true, createdAt: true, isMain: true, name: true, cardExpiration: true },
		})
	}

	async findAll(payload: BankFindAllRequest): Promise<BankFindOneResponse[]> {
		return this.bankDb.bank.findMany({
			where: {
				name: { contains: payload.name, mode: 'insensitive' },
				cardStarts: { contains: payload.cardStarts, mode: 'insensitive' },
				address: { contains: payload.address, mode: 'insensitive' },
				// isMain: payload.isMain,
			},
			select: { id: true, address: true, cardStarts: true, createdAt: true, isMain: true, name: true, cardExpiration: true },
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
		})
	}

	async countAll(payload: BankFindAllRequest): Promise<number> {
		return this.bankDb.bank.count({
			where: {
				name: { contains: payload.name, mode: 'insensitive' },
				cardStarts: { contains: payload.cardStarts, mode: 'insensitive' },
				address: { contains: payload.address, mode: 'insensitive' },
				isMain: payload.isMain,
			},
		})
	}

	async create(payload: BankCreateRequest): Promise<BankCreateResponse> {
		if (payload.isMain) {
			const c = await this.bankDb.bank.findFirst({ where: { isMain: true } })
			if (c) {
				payload.isMain = false
			}
		}

		await this.bankDb.bank.create({
			data: { name: payload.name, address: payload.address, cardStarts: payload.cardStarts, cardExpiration: payload.cardExpiration, isMain: payload.isMain },
		})
		return null
	}

	async update(payload1: BankFindOneRequest, payload2: BankUpdateRequest): Promise<BankUpdateResponse> {
		await this.bankDb.bank.update({
			where: { id: payload1.id },
			data: { name: payload2.name, address: payload2.address, cardStarts: payload2.cardStarts, cardExpiration: payload2.cardExpiration, isMain: payload2.isMain },
		})
		return null
	}

	async delete(payload: BankDeleteRequest): Promise<BankDeleteResponse> {
		await this.bankDb.bank.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })
		return null
	}

	async separateMoneyFromMainBank(payload: { bankId: string; money: bigint }): Promise<{ message: string }> {
		const bank = await this.findOneById({ id: payload.bankId })
		if (!bank) {
			throw new BadRequestException('Bank not found')
		}
		if (!bank.isMain) {
			throw new BadRequestException('Bank is not a main')
		}

		const wallets = await this.bankDb.wallet.findMany()

		const middle = Math.floor(Number(BigInt(payload.money)) / wallets.length)
		const lastPay = Number(BigInt(payload.money)) - (wallets.length - 1) * middle

		for (let i = 0; i < wallets.length; i++) {
			if (i == wallets.length - 1) {
				await this.bankDb.wallet.update({ where: { id: wallets[i].id }, data: { balance: String(BigInt(wallets[i].balance) + BigInt(lastPay)) } })
			} else {
				await this.bankDb.wallet.update({ where: { id: wallets[i].id }, data: { balance: String(BigInt(wallets[i].balance) + BigInt(middle)) } })
			}
		}

		return { message: 'completed!' }
	}
}
