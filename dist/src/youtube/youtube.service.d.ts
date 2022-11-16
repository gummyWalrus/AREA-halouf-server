/// <reference types="node" />
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { Area } from "../area/schemas/area.schema";
import * as fs from "fs";
export declare class YoutubeService {
    private Config;
    private user;
    constructor(Config: ConfigService, user: UserService);
    private oAuth2Client;
    parameters(area: Area): {
        part: string;
        resource: {
            snippet: {
                title: any;
                description: any;
            };
            status: {
                privacyStatus: string;
            };
        };
        media: {
            mimeType: string;
            body: fs.ReadStream;
        };
    };
    private array_video;
    media(): {
        mimeType: string;
        body: fs.ReadStream;
    };
    video(area: Area): {
        snippet: {
            title: any;
            description: any;
        };
        status: {
            privacyStatus: string;
        };
    };
    react(area: Area): Promise<void>;
    upload(area: Area): Promise<void>;
}
