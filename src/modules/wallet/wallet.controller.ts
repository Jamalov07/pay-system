import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common'
import { WalletService } from './wallet.service'
import {
	ConfirmPaymentRequestDto,
	ConfirmPaymentResponseDto,
	PayForAllRequestDto,
	PaymentHistoryFindAllRequestDto,
	PaymentHistoryFindAllResponseDto,
	WalletCreateRequest1Dto,
	WalletCreateRequest2Dto,
	WalletCreateResponseDto,
	WalletDeteleRequestDto,
	WalletFindAllRequestDto,
	WalletFindAllResponseDto,
	WalletFindOneRequestDto,
	WalletFindOneResponseDto,
	WalletUpdateRequestDto,
} from './dtos'
import {
	ConfirmPaymentResponse,
	PayForAllResponse,
	PaymentHistoryFindAllResponse,
	WalletCreateResponse,
	WalletDeleteResponse,
	WalletFindAllResponse,
	WalletFindOneResponse,
	WalletUpdateResponse,
} from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from './constants'
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { InternalServerErrorExceptionDto } from '../../dtos'

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
	readonly walletService: WalletService
	constructor(walletService: WalletService) {
		this.walletService = walletService
	}

	@HttpCode(HttpStatus.OK)
	@Get('history')
	@ApiOkResponse({ type: PaymentHistoryFindAllResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async paymentHistory(@Query() payload: PaymentHistoryFindAllRequestDto): Promise<PaymentHistoryFindAllResponse> {
		return this.walletService.paymentHistoryFindAll(payload)
	}

	@HttpCode(HttpStatus.OK)
	@Get()
	@ApiQuery({ name: 'pageNumber', required: false, example: 1 })
	@ApiQuery({ name: 'pageSize', required: false, example: 10 })
	@ApiOkResponse({ type: WalletFindAllResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async findAll(@Query() payload: WalletFindAllRequestDto): Promise<WalletFindAllResponse> {
		return await this.walletService.findAll({
			...payload,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
		})
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiOkResponse({ type: WalletFindOneResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async findOn(@Param() payload: WalletFindOneRequestDto): Promise<WalletFindOneResponse> {
		return this.walletService.findOne(payload)
	}

	@HttpCode(HttpStatus.CREATED)
	@Post('card')
	@ApiCreatedResponse({ type: WalletCreateResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async createCard(@Body() paylaod: WalletCreateRequest1Dto): Promise<WalletCreateResponse> {
		return this.walletService.createCard(paylaod)
	}

	@HttpCode(HttpStatus.CREATED)
	@Post('wallet')
	@ApiCreatedResponse({ schema: { example: { message: 'successfully created' } } })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async createWallet(@Body() paylaod: WalletCreateRequest2Dto): Promise<{ message: string }> {
		return this.walletService.createWallet(paylaod)
	}

	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiOkResponse({ schema: { example: { message: 'succesfully updated' } } })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async update(@Param() payload1: WalletFindOneRequestDto, @Body() payload2: WalletUpdateRequestDto): Promise<WalletUpdateResponse> {
		return this.walletService.update(payload1, payload2)
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiNoContentResponse({ description: 'No Content' })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async delete(@Param() payload: WalletDeteleRequestDto): Promise<WalletDeleteResponse> {
		return this.walletService.delete(payload)
	}

	@HttpCode(HttpStatus.OK)
	@Post('payment')
	@ApiOkResponse({ schema: { example: { id: 'uuid' } } })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async payForAll(@Body() payload: PayForAllRequestDto): Promise<PayForAllResponse> {
		return this.walletService.payForAll(payload)
	}

	@HttpCode(HttpStatus.OK)
	@Post('confirm')
	@ApiOkResponse({ type: ConfirmPaymentResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async confirmPayment(@Body() payload: ConfirmPaymentRequestDto): Promise<ConfirmPaymentResponse> {
		return this.walletService.confirmPayment(payload)
	}
}
