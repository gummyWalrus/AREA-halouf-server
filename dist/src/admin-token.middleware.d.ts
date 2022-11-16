import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export default class AdminTokenMiddleware implements NestMiddleware {
    private readonly config;
    constructor(config: ConfigService);
    use(req: any, res: any, next: () => void): void;
}
