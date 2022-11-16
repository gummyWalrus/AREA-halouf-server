"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((req, res, next) => {
        console.log("request headers", req.headers);
        console.log("request path", req.url);
        if (!req.headers['user-agent'])
            req.headers.platform = 'unknown';
        else if (req.headers['user-agent'].includes('Windows') || req.headers['user-agent'].includes('Linux'))
            req.headers.platform = 'web';
        else if (req.headers['user-agent'].includes('iPhone') || req.headers['user-agent'].includes('Android'))
            req.headers.platform = 'mobile';
        else
            req.headers['user-agent'] = 'unknown';
        next();
    });
    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(cookieParser());
    await app.listen(8080);
    console.log("app listening on port 8080");
}
bootstrap();
//# sourceMappingURL=main.js.map