import { PaginationRequest, PaginationResponse } from '../../../interfaces'
import { CompanyOptional, CompanyRequired } from './company-fields.interfaces'

export declare type CompanyFindOneRequest = Pick<CompanyRequired, 'id'>

export declare type CompanyFindOneResponse = Pick<CompanyRequired, 'id' | 'address' | 'name' | 'createdAt'> & { owner: any }

export declare type CompanyFindAllRequest = PaginationRequest & Pick<CompanyOptional, 'address' | 'name' | 'ownerId'>

export declare type CompanyFindAllResponse = PaginationResponse<CompanyFindOneResponse>
