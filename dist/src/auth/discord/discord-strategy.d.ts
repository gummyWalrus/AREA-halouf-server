import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../src/user/user.service';
import { HttpService } from '@nestjs/axios';
export declare class DiscordStrategy {
    private readonly userService;
    private readonly httpService;
    clientID: any;
    clientSecret: any;
    callbackURL: any;
    scopeSeparator: any;
    scope: any;
    constructor(configService: ConfigService, userService: UserService, httpService: HttpService);
    serializeScopes(): string;
    generateAuthURL(): string;
    refreshAccessToken(user_id: string): Promise<any>;
    getProfile(accessToken: string): Promise<any>;
}
