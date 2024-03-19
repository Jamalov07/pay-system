import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common'
import { CompanyService } from './company.service'
import {
	CompanyCreateRequestDto,
	CompanyDeleteRequestDto,
	CompanyFindAllRequestDto,
	CompanyFindAllResponseDto,
	CompanyFindOneRequestDto,
	CompanyFindOneResponseDto,
	CompanyUpdateRequestDto,
} from './dtos'
import { CompanyCreateResponse, CompanyDeleteResponse, CompanyFindAllResponse, CompanyFindOneResponse, CompanyUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from './constants'
import { ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { InternalServerErrorExceptionDto } from '../../dtos'

@ApiTags('Company')
@Controller('company')
export class CompanyController {
	readonly companyService: CompanyService
	constructor(companyService: CompanyService) {
		this.companyService = companyService
	}

	@HttpCode(HttpStatus.OK)
	@Get()
	@ApiQuery({ name: 'pageNumber', required: false, example: 1 })
	@ApiQuery({ name: 'pageSize', required: false, example: 10 })
	@ApiOkResponse({ type: CompanyFindAllResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async findAll(@Query() payload: CompanyFindAllRequestDto): Promise<CompanyFindAllResponse> {
		return await this.companyService.findAll({
			...payload,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
		})
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiOkResponse({ type: CompanyFindOneResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async findOn(@Param() payload: CompanyFindOneRequestDto): Promise<CompanyFindOneResponse> {
		return this.companyService.findOne(payload)
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	@ApiNoContentResponse({ description: 'No Content' })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async createCompany(@Body() paylaod: CompanyCreateRequestDto): Promise<CompanyCreateResponse> {
		return this.companyService.create(paylaod)
	}

	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiNoContentResponse({ description: 'No Content' })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async update(@Param() payload1: CompanyFindOneRequestDto, @Body() payload2: CompanyUpdateRequestDto): Promise<CompanyUpdateResponse> {
		return this.companyService.update(payload1, payload2)
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiNoContentResponse({ description: 'No Content' })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async delete(@Param() payload: CompanyDeleteRequestDto): Promise<CompanyDeleteResponse> {
		return this.companyService.delete(payload)
	}
}
