import { CompanyOptional, CompanyRequired } from './company-fields.interfaces'

export declare type CompanyCreateRequest = Pick<CompanyRequired, 'name' | 'ownerId'> & Pick<CompanyOptional, 'address'>
export declare type CompanyCreateResponse = null
