import { Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../src/user/user.service';
declare const GoogleOauthStrategy_base: new (...args: any[]) => any;
export declare class GoogleOauthStrategy extends GoogleOauthStrategy_base {
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<{
        firstname: any;
        lastname: any;
        email: any;
        password: any;
        google: {
            token: string;
            username: string;
            email: any;
        };
    }>;
}
export {};
