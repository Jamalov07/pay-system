import { registerAs } from '@nestjs/config'
import { DatabaseConfigOptions } from '../interfaces'
import 'dotenv/config'

export const userDbConfig = registerAs<DatabaseConfigOptions>(
	'database1',
	(): DatabaseConfigOptions => ({
		url: process.env.USER_DATABASE_URL,
	}),
)

export const bankDbConfig = registerAs<DatabaseConfigOptions>(
	'database2',
	(): DatabaseConfigOptions => ({
		url: process.env.BANK_DATABASE_URL,
	}),
)
