import { WalletType } from '../enums'
import { WalletRequeired } from './wallet-fields.interfaces'

export declare type WalletCreateRequest1 = Pick<WalletRequeired, 'bankId' | 'ownerId'> & { type: WalletType }
export declare type WalletCreateRequest2 = Pick<WalletRequeired, 'bankId' | 'companyId'> & { type: WalletType }

export declare type WalletCreateResponse = Pick<WalletRequeired, 'id'>
