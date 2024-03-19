import { AppConfig } from '../interfaces'
import 'dotenv/config'

export const appConfig: AppConfig = {
	host: process.env.APP_HOST ?? '127.0.0.1',
	port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
}
