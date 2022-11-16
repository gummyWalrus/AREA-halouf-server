import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../src/user/user.service';
import { MyTwitterOauthStrategy } from './twitter/mytwitter-oauth.strategy';
import { Response } from 'express';
import { DiscordStrategy } from './discord/discord-strategy';
export declare class AuthController {
    private authService;
    private readonly userService;
    private readonly config;
    private readonly mytwitter;
    private readonly discordStrategy;
    constructor(authService: AuthService, userService: UserService, config: ConfigService, mytwitter: MyTwitterOauthStrategy, discordStrategy: DiscordStrategy);
    redirectAfterSignIn(req: any, token: {
        token: string;
    }): {
        url: string;
    };
    login(req: any): Promise<any>;
    google(req: any): Promise<{
        url: string;
    }>;
    redirectToAuthGoogle(req: Request): Promise<void>;
    googleRedirect(req: any, res: any): Promise<void>;
    redirectToAuthGithub(req: any): Promise<void>;
    github(req: any): Promise<{
        url: string;
    }>;
    githubRedirect(req: any, res: any): Promise<void>;
    redirectToAuthDiscord(res: any): Promise<void>;
    discord(req: any): Promise<{
        url: string;
    }>;
    discordHead(): Promise<{
        msg: string;
    }>;
    discordRedirect(req: any, res: any): Promise<void>;
    twitter(req: any, res: Response): Promise<void>;
    twitterRedirect(req: any, res: any): Promise<void>;
    loggedInServices(req: any): Promise<any[]>;
}
