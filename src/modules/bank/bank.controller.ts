import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common'
import { BankService } from './bank.service'
import {
	BankCreateRequestDto,
	BankDeteleRequestDto,
	BankFindAllRequestDto,
	BankFindAllResponseDto,
	BankFindOneRequestDto,
	BankFindOneResponseDto,
	BankUpdateRequestDto,
	SeparateMoneyFromMainBankDto,
} from './dtos'
import { BankCreateResponse, BankDeleteResponse, BankFindAllResponse, BankFindOneResponse, BankUpdateResponse } from './interfaces'
import { IS_MAIN, PAGE_NUMBER, PAGE_SIZE } from './constants'
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { InternalServerErrorExceptionDto } from '../../dtos'

@ApiTags('Bank')
@Controller('bank')
export class BankController {
	readonly bankService: BankService
	constructor(bankService: BankService) {
		this.bankService = bankService
	}

	@HttpCode(HttpStatus.OK)
	@Get()
	@ApiQuery({ name: 'pageNumber', required: false, example: 1 })
	@ApiQuery({ name: 'pageSize', required: false, example: 10 })
	@ApiQuery({ name: 'name', required: false, type: String })
	@ApiOkResponse({ type: BankFindAllResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async findAll(@Query() payload: BankFindAllRequestDto): Promise<BankFindAllResponse> {
		return await this.bankService.findAll({
			...payload,
			isMain: payload.isMain ?? IS_MAIN,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
		})
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiOkResponse({ type: BankFindOneResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async findOn(@Param() payload: BankFindOneRequestDto): Promise<BankFindOneResponse> {
		return this.bankService.findOne(payload)
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	@ApiNoContentResponse({ description: 'No Content' })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async create(@Body() paylaod: BankCreateRequestDto): Promise<BankCreateResponse> {
		return this.bankService.create(paylaod)
	}

	@HttpCode(HttpStatus.CREATED)
	@Post('separate')
	@ApiCreatedResponse({ schema: { example: { message: 'completed!' } } })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async separateFromMainBank(@Body() paylaod: SeparateMoneyFromMainBankDto): Promise<{ message: string }> {
		return this.bankService.separateFromMainBank(paylaod)
	}

	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiNoContentResponse({ description: 'No Content' })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async update(@Param() payload1: BankFindOneRequestDto, @Body() payload2: BankUpdateRequestDto): Promise<BankUpdateResponse> {
		return this.bankService.update(payload1, payload2)
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiNoContentResponse({ description: 'No Content' })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async delete(@Param() payload: BankDeteleRequestDto): Promise<BankDeleteResponse> {
		return this.bankService.delete(payload)
	}
}
