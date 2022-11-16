import { Profile } from 'passport-github';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../src/user/user.service';
declare const GithubOauthStrategy_base: new (...args: any[]) => any;
export declare class GithubOauthStrategy extends GithubOauthStrategy_base {
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<{
        firstname: any;
        lastname: string;
        email: string;
        password: any;
        github: {
            token: string;
            username: any;
        };
    }>;
}
export {};
