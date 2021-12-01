"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const core_module_config_1 = require("./core/core-module.config");
const packageJson = require("../package.json");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle(packageJson.name)
        .setVersion(packageJson.version)
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'headers' }, core_module_config_1.METADATA_AUTHORIZED_KEY)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    app.enableCors();
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map