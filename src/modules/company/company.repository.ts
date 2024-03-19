import { BadRequestException, Injectable } from '@nestjs/common'
import { BankPrismaService, UserPrismaService } from '../database'
import {
	CompanyCreateRequest,
	CompanyCreateResponse,
	CompanyDeleteRequest,
	CompanyDeleteResponse,
	CompanyFindAllRequest,
	CompanyFindOneRequest,
	CompanyFindOneResponse,
	CompanyUpdateRequest,
	CompanyUpdateResponse,
} from './interfaces'

@Injectable()
export class CompanyRepository {
	readonly userDb: UserPrismaService
	readonly bankDb: BankPrismaService

	constructor(userDb: UserPrismaService, bankDb: BankPrismaService) {
		this.userDb = userDb
		this.bankDb = bankDb
	}

	async findOneById(payload: CompanyFindOneRequest): Promise<CompanyFindOneResponse> {
		return await this.userDb.company.findFirst({
			where: { id: payload.id },
			select: {
				id: true,
				address: true,
				createdAt: true,
				owner: true,
				name: true,
			},
		})
	}

	async findOneByName(name: string): Promise<CompanyFindOneResponse> {
		return await this.userDb.company.findFirst({
			where: { name },
			select: {
				id: true,
				address: true,
				createdAt: true,
				owner: true,
				name: true,
			},
		})
	}

	async findAll(payload: CompanyFindAllRequest): Promise<CompanyFindOneResponse[]> {
		return this.userDb.company.findMany({
			where: {
				name: { contains: payload.name, mode: 'insensitive' },
				address: { contains: payload.address, mode: 'insensitive' },
				ownerId: payload.ownerId,
			},
			select: {
				id: true,
				address: true,
				createdAt: true,
				owner: true,
				name: true,
			},
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
		})
	}

	async countAll(payload: CompanyFindAllRequest): Promise<number> {
		return this.userDb.company.count({
			where: {
				name: { contains: payload.name, mode: 'insensitive' },
				address: { contains: payload.address, mode: 'insensitive' },
				ownerId: payload.ownerId,
			},
		})
	}

	async create(payload: CompanyCreateRequest): Promise<CompanyCreateResponse> {
		if (payload.name) {
			if (await this.findOneByName(payload.name)) {
				throw new BadRequestException('Name already exists')
			}
		}

		await this.userDb.company.create({
			data: {
				address: payload.address,
				name: payload.name,
				ownerId: payload.ownerId,
			},
		})
		return null
	}

	async update(payload1: CompanyFindOneRequest, payload2: CompanyUpdateRequest): Promise<CompanyUpdateResponse> {
		if (payload2.name) {
			const c1 = await this.findOneByName(payload2.name)
			if (c1 && c1.id !== payload1.id) {
				throw new BadRequestException('Name already exists')
			}
		}

		await this.userDb.company.update({
			where: { id: payload1.id },
			data: {
				address: payload2.address,
				name: payload2.name,
				ownerId: payload2.ownerId,
			},
		})
		return null
	}

	async delete(payload: CompanyDeleteRequest): Promise<CompanyDeleteResponse> {
		await this.userDb.company.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })
		return null
	}
}
