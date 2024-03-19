import { BadRequestException, Injectable } from '@nestjs/common'
import { BankPrismaService, UserPrismaService } from '../database'
import {
	UserCreateRequest,
	UserCreateResponse,
	UserDeleteRequest,
	UserDeleteResponse,
	UserFindAllRequest,
	UserFindOneRequest,
	UserFindOneResponse,
	UserUpdateRequest,
	UserUpdateResponse,
} from './interfaces'

@Injectable()
export class UserRepository {
	readonly userDb: UserPrismaService
	readonly bankDb: BankPrismaService

	constructor(userDb: UserPrismaService, bankDb: BankPrismaService) {
		this.userDb = userDb
		this.bankDb = bankDb
	}

	async findOneById(payload: UserFindOneRequest): Promise<UserFindOneResponse> {
		return await this.userDb.user.findFirst({
			where: { id: payload.id },
			select: {
				id: true,
				birthdayDate: true,
				createdAt: true,
				email: true,
				firstName: true,
				passportNumber: true,
				middleName: true,
				password: true,
				phoneNumber: true,
				lastName: true,
				pinfl: true,
			},
		})
	}

	async findOneByEmail(email: string): Promise<UserFindOneResponse> {
		return await this.userDb.user.findFirst({
			where: { email },
			select: {
				id: true,
				birthdayDate: true,
				createdAt: true,
				email: true,
				firstName: true,
				passportNumber: true,
				middleName: true,
				password: true,
				phoneNumber: true,
				lastName: true,
				pinfl: true,
			},
		})
	}

	async findOneByPassportNumber(passportNumber: string): Promise<UserFindOneResponse> {
		return await this.userDb.user.findFirst({
			where: { passportNumber },
			select: {
				id: true,
				birthdayDate: true,
				createdAt: true,
				email: true,
				firstName: true,
				passportNumber: true,
				middleName: true,
				password: true,
				phoneNumber: true,
				lastName: true,
				pinfl: true,
			},
		})
	}

	async findOneByPhoneNumber(phoneNumber: string): Promise<UserFindOneResponse> {
		return await this.userDb.user.findFirst({
			where: { phoneNumber },
			select: {
				id: true,
				birthdayDate: true,
				createdAt: true,
				email: true,
				firstName: true,
				passportNumber: true,
				middleName: true,
				password: true,
				phoneNumber: true,
				lastName: true,
				pinfl: true,
			},
		})
	}

	async findOneByPinfl(pinfl: string): Promise<UserFindOneResponse> {
		return await this.userDb.user.findFirst({
			where: { pinfl },
			select: {
				id: true,
				birthdayDate: true,
				createdAt: true,
				email: true,
				firstName: true,
				passportNumber: true,
				middleName: true,
				password: true,
				phoneNumber: true,
				lastName: true,
				pinfl: true,
			},
		})
	}

	async findAll(payload: UserFindAllRequest): Promise<UserFindOneResponse[]> {
		return this.userDb.user.findMany({
			where: {
				email: { contains: payload.email, mode: 'insensitive' },
				firstName: { contains: payload.firstName, mode: 'insensitive' },
				lastName: { contains: payload.lastName, mode: 'insensitive' },
				middleName: { contains: payload.middleName, mode: 'insensitive' },
				passportNumber: { contains: payload.passportNumber, mode: 'insensitive' },
				phoneNumber: { contains: payload.phoneNumber, mode: 'insensitive' },
				pinfl: { contains: payload.pinfl, mode: 'insensitive' },
			},
			select: {
				id: true,
				birthdayDate: true,
				createdAt: true,
				email: true,
				firstName: true,
				passportNumber: true,
				middleName: true,
				password: true,
				phoneNumber: true,
				lastName: true,
				pinfl: true,
			},
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
		})
	}

	async countAll(payload: UserFindAllRequest): Promise<number> {
		return this.userDb.user.count({
			where: {
				email: { contains: payload.email, mode: 'insensitive' },
				firstName: { contains: payload.firstName, mode: 'insensitive' },
				lastName: { contains: payload.lastName, mode: 'insensitive' },
				middleName: { contains: payload.middleName, mode: 'insensitive' },
				passportNumber: { contains: payload.passportNumber, mode: 'insensitive' },
				phoneNumber: { contains: payload.phoneNumber, mode: 'insensitive' },
				pinfl: { contains: payload.pinfl, mode: 'insensitive' },
			},
		})
	}

	async create(payload: UserCreateRequest): Promise<UserCreateResponse> {
		if (payload.email) {
			if (await this.findOneByEmail(payload.email)) {
				throw new BadRequestException('Email already exists')
			}
		}

		if (payload.passportNumber) {
			if (await this.findOneByEmail(payload.passportNumber)) {
				throw new BadRequestException('Passport number already exists')
			}
		}

		if (payload.phoneNumber) {
			if (await this.findOneByEmail(payload.phoneNumber)) {
				throw new BadRequestException('Phone already exists')
			}
		}

		if (payload.pinfl) {
			if (await this.findOneByEmail(payload.pinfl)) {
				throw new BadRequestException('Pinfl already exists')
			}
		}

		await this.userDb.user.create({
			data: {
				birthdayDate: new Date(payload.birthdayDate),
				email: payload.email,
				firstName: payload.firstName,
				lastName: payload.lastName,
				middleName: payload.middleName,
				passportNumber: payload.passportNumber,
				phoneNumber: payload.phoneNumber,
				pinfl: payload.pinfl,
			},
		})
		return null
	}

	async update(payload1: UserFindOneRequest, payload2: UserUpdateRequest): Promise<UserUpdateResponse> {
		if (payload2.email) {
			const c1 = await this.findOneByEmail(payload2.email)
			if (c1 && c1.id !== payload1.id) {
				throw new BadRequestException('Email already exists')
			}
		}

		if (payload2.passportNumber) {
			const c2 = await this.findOneByEmail(payload2.passportNumber)
			if (c2 && c2.id !== payload1.id) {
				throw new BadRequestException('Passport number already exists')
			}
		}

		if (payload2.phoneNumber) {
			const c3 = await this.findOneByEmail(payload2.phoneNumber)
			if (c3 && c3.id !== payload1.id) {
				throw new BadRequestException('Phone already exists')
			}
		}

		if (payload2.pinfl) {
			const c4 = await this.findOneByEmail(payload2.pinfl)
			if (c4 && c4.id !== payload1.id) {
				throw new BadRequestException('Pinfl already exists')
			}
		}
		await this.userDb.user.update({
			where: { id: payload1.id },
			data: {
				birthdayDate: new Date(payload2.birthdayDate),
				email: payload2.email,
				firstName: payload2.firstName,
				lastName: payload2.lastName,
				middleName: payload2.middleName,
				passportNumber: payload2.passportNumber,
				phoneNumber: payload2.phoneNumber,
				pinfl: payload2.pinfl,
				password: payload2.password,
			},
		})
		return null
	}

	async delete(payload: UserDeleteRequest): Promise<UserDeleteResponse> {
		await this.userDb.user.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })
		return null
	}
}
