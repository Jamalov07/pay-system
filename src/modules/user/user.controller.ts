import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import {
	UserCreateRequestDto,
	UserDeleteRequestDto,
	UserFindAllRequestDto,
	UserFindAllResponseDto,
	UserFindOneRequestDto,
	UserFindOneResponseDto,
	UserUpdateRequestDto,
} from './dtos'
import { UserCreateResponse, UserDeleteResponse, UserFindAllResponse, UserFindOneResponse, UserUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from './constants'
import { ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { InternalServerErrorExceptionDto } from '../../dtos'

@ApiTags('User')
@Controller('user')
export class UserController {
	readonly userService: UserService
	constructor(userService: UserService) {
		this.userService = userService
	}

	@HttpCode(HttpStatus.OK)
	@Get()
	@ApiQuery({ name: 'pageNumber', required: false, example: 1 })
	@ApiQuery({ name: 'pageSize', required: false, example: 10 })
	@ApiOkResponse({ type: UserFindAllResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async findAll(@Query() payload: UserFindAllRequestDto): Promise<UserFindAllResponse> {
		return await this.userService.findAll({
			...payload,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
		})
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiOkResponse({ type: UserFindOneResponseDto })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async findOn(@Param() payload: UserFindOneRequestDto): Promise<UserFindOneResponse> {
		return this.userService.findOne(payload)
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	@ApiNoContentResponse({ description: 'No Content' })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async createUser(@Body() paylaod: UserCreateRequestDto): Promise<UserCreateResponse> {
		return this.userService.create(paylaod)
	}

	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiNoContentResponse({ description: 'No Content' })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async update(@Param() payload1: UserFindOneRequestDto, @Body() payload2: UserUpdateRequestDto): Promise<UserUpdateResponse> {
		return this.userService.update(payload1, payload2)
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	@ApiParam({ name: 'id', required: true, type: String })
	@ApiNoContentResponse({ description: 'No Content' })
	@ApiInternalServerErrorResponse({ type: InternalServerErrorExceptionDto, description: 'Internal server error' })
	async delete(@Param() payload: UserDeleteRequestDto): Promise<UserDeleteResponse> {
		return this.userService.delete(payload)
	}
}
