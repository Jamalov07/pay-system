import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { BankRepository } from './bank.repository'
import {
	BankCreateRequest,
	BankCreateResponse,
	BankDeleteRequest,
	BankDeleteResponse,
	BankFindAllRequest,
	BankFindAllResponse,
	BankFindOneRequest,
	BankFindOneResponse,
	BankUpdateRequest,
	BankUpdateResponse,
} from './interfaces'

@Injectable()
export class BankService {
	readonly bankRepository: BankRepository
	constructor(bankRepository: BankRepository) {
		this.bankRepository = bankRepository
	}

	async findAll(payload: BankFindAllRequest): Promise<BankFindAllResponse> {
		console.log(1)
		const banks = await this.bankRepository.findAll(payload)
		const count = await this.bankRepository.countAll(payload)

		return { count, data: banks, pageSize: banks.length }
	}

	async findOne(payload: BankFindOneRequest): Promise<BankFindOneResponse> {
		const bank = await this.bankRepository.findOneById(payload)
		if (!bank) {
			throw new NotFoundException('Bank not found')
		}
		return bank
	}

	async create(payload: BankCreateRequest): Promise<BankCreateResponse> {
		const candidate1 = await this.bankRepository.findOneByName(payload.name)
		if (candidate1) {
			throw new BadRequestException('Bank name already exists')
		}

		const canidate2 = await this.bankRepository.findOneByCardStarts(payload.cardStarts)
		if (canidate2) {
			throw new BadRequestException('This starter number already in use')
		}

		await this.bankRepository.create(payload)
		return null
	}

	async update(payload1: BankFindOneRequest, payload2: BankUpdateRequest): Promise<BankUpdateResponse> {
		await this.bankRepository.findOneById(payload1)

		if (payload2.name) {
			const candidate = await this.bankRepository.findOneByName(payload2.name)
			if (candidate && candidate.id !== payload1.id) {
				throw new BadRequestException('Bank name already exists')
			}
		}
		await this.bankRepository.update(payload1, payload2)

		return null
	}

	async delete(payload: BankDeleteRequest): Promise<BankDeleteResponse> {
		await this.bankRepository.delete(payload)
		return null
	}

	async separateFromMainBank(payload: { bankId: string; money: bigint }): Promise<{ message: string }> {
		return this.bankRepository.separateMoneyFromMainBank(payload)
	}
}
