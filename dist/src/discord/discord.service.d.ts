import { HttpService } from '@nestjs/axios';
import { DiscordStrategy } from '../../src/auth/discord/discord-strategy';
import { ConfigService } from '@nestjs/config';
import { Area } from '../../src/area/schemas/area.schema';
export declare class DiscordService {
    private http;
    private discordStrategy;
    private config;
    constructor(http: HttpService, discordStrategy: DiscordStrategy, config: ConfigService);
    getChannels(user_id: string): Promise<void | any[]>;
    sendChannelMsg(area: Area, accessToken: string): Promise<void>;
    react(area: Area): Promise<void>;
}
