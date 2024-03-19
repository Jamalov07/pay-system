import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient as UserPrismaClient } from '@prisma/user/client'

@Injectable()
export class UserPrismaService extends UserPrismaClient implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(UserPrismaService.name)
	constructor(config: ConfigService) {
		super({
			datasources: {
				db: {
					url: config.getOrThrow<string>('database1.url'),
				},
			},
		})
	}
	async onModuleInit() {
		let retries = 5
		while (retries > 0) {
			try {
				await this.$connect()

				this.logger.log('Successfully connected to postgres database')

				break
			} catch (err) {
				this.logger.error(err)

				this.logger.error(`there was an error connecting to database, retrying .... (${retries})`)

				retries -= 1

				await new Promise((res) => setTimeout(res, 3_000)) // wait for three seconds
			}
		}
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}
}
