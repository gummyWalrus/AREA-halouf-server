import { CreateTwitterDto } from "./dto/create-twitter.dto";
import { Area } from '../../src/area/schemas/area.schema';
import { MyTwitterOauthStrategy } from '../../src/auth/twitter/mytwitter-oauth.strategy';
import { UserService } from "../../src/user/user.service";
export declare class TwitterService {
    private readonly twitter;
    private readonly user;
    constructor(twitter: MyTwitterOauthStrategy, user: UserService);
    private config;
    tweet(area: Area): Promise<void | {
        data?: {
            id: string;
            text: string;
        };
        errors?: {
            detail?: string;
            status?: number;
            title: string;
            type: string;
        }[];
    }>;
    react(area: Area): Promise<void | {
        data?: {
            id: string;
            text: string;
        };
        errors?: {
            detail?: string;
            status?: number;
            title: string;
            type: string;
        }[];
    }>;
    create(createTwitterDto: CreateTwitterDto): Promise<{
        message: string;
        status: number;
    }>;
    remove(id: string): Promise<any>;
}
