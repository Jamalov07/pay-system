import { Injectable, NotFoundException } from '@nestjs/common'
import { CompanyRepository } from './company.repository'
import {
	CompanyCreateRequest,
	CompanyCreateResponse,
	CompanyDeleteRequest,
	CompanyDeleteResponse,
	CompanyFindAllRequest,
	CompanyFindAllResponse,
	CompanyFindOneRequest,
	CompanyFindOneResponse,
	CompanyUpdateRequest,
	CompanyUpdateResponse,
} from './interfaces'

@Injectable()
export class CompanyService {
	readonly companyRepository: CompanyRepository
	constructor(companyRepository: CompanyRepository) {
		this.companyRepository = companyRepository
	}

	async findAll(payload: CompanyFindAllRequest): Promise<CompanyFindAllResponse> {
		const companys = await this.companyRepository.findAll(payload)
		const count = await this.companyRepository.countAll(payload)

		return { count, data: companys, pageSize: companys.length }
	}

	async findOne(payload: CompanyFindOneRequest): Promise<CompanyFindOneResponse> {
		const company = await this.companyRepository.findOneById(payload)
		if (!company) {
			throw new NotFoundException('Company not found')
		}
		return company
	}

	async create(payload: CompanyCreateRequest): Promise<CompanyCreateResponse> {
		await this.companyRepository.create(payload)
		return null
	}

	async update(payload1: CompanyFindOneRequest, payload2: CompanyUpdateRequest): Promise<CompanyUpdateResponse> {
		await this.companyRepository.findOneById(payload1)

		await this.companyRepository.update(payload1, payload2)

		return null
	}

	async delete(payload: CompanyDeleteRequest): Promise<CompanyDeleteResponse> {
		await this.companyRepository.delete(payload)
		return null
	}
}
