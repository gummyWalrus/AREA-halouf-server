import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { auth } from "twitter-api-sdk";
export declare class MyTwitterOauthStrategy {
    private readonly configService;
    constructor(configService: ConfigService);
    authClient: auth.OAuth2User;
    redirect(req: Request): Promise<{
        url: string;
    }>;
    handleRedirect(req: Request): Promise<any>;
}
