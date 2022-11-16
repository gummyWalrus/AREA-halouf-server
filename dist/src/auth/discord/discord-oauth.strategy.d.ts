import { Profile } from 'passport-discord';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../src/user/user.service';
import { HttpService } from '@nestjs/axios';
declare const DiscordOauthStrategy_base: new (...args: any[]) => any;
export declare class DiscordOauthStrategy extends DiscordOauthStrategy_base {
    private readonly userService;
    private readonly httpService;
    constructor(configService: ConfigService, userService: UserService, httpService: HttpService);
    validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<{
        firstname: string;
        lastname: string;
        email: any;
        password: any;
        discord: {
            token: string;
            username: string;
            id: any;
        };
    }>;
}
export {};
