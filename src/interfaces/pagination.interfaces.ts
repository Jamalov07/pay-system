export declare interface PaginationRequest {
	pageNumber?: number
	pageSize?: number
}

export declare interface PaginationResponse<T> {
	count: number
	pageSize: number
	data: T[]
}
