import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { json } from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { appConfig } from './configs'
import { HttpExceptionFilter } from './filters'

setImmediate(async (): Promise<void> => {
	const app = await NestFactory.create<INestApplication>(AppModule, {
		cors: true,
	})
	const config = new DocumentBuilder().build()
	app.use(json({ limit: '50mb' }))

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

	app.useGlobalFilters(new HttpExceptionFilter())

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	console.log(appConfig)
	await app.listen(appConfig.port, appConfig.host)
})
