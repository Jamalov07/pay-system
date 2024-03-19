import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import {
	UserCreateRequest,
	UserCreateResponse,
	UserDeleteRequest,
	UserDeleteResponse,
	UserFindAllRequest,
	UserFindAllResponse,
	UserFindOneRequest,
	UserFindOneResponse,
	UserUpdateRequest,
	UserUpdateResponse,
} from './interfaces'

@Injectable()
export class UserService {
	readonly userRepository: UserRepository
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async findAll(payload: UserFindAllRequest): Promise<UserFindAllResponse> {
		const users = await this.userRepository.findAll(payload)
		const count = await this.userRepository.countAll(payload)

		return { count, data: users, pageSize: users.length }
	}

	async findOne(payload: UserFindOneRequest): Promise<UserFindOneResponse> {
		const user = await this.userRepository.findOneById(payload)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		return user
	}

	async create(payload: UserCreateRequest): Promise<UserCreateResponse> {
		await this.userRepository.create(payload)
		return null
	}

	async update(payload1: UserFindOneRequest, payload2: UserUpdateRequest): Promise<UserUpdateResponse> {
		await this.userRepository.findOneById(payload1)

		await this.userRepository.update(payload1, payload2)

		return null
	}

	async delete(payload: UserDeleteRequest): Promise<UserDeleteResponse> {
		await this.userRepository.delete(payload)
		return null
	}
}
