import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { Area } from "../area/schemas/area.schema";
import { HttpService } from "@nestjs/axios";
export declare class TelegramService {
    private Config;
    private http;
    private user;
    constructor(Config: ConfigService, http: HttpService, user: UserService);
    private reactions;
    react(area: Area): Promise<any>;
    sendSMS(area: Area): Promise<void | import("axios").AxiosResponse<any, any>>;
    sendAnimation(area: Area): Promise<void | import("axios").AxiosResponse<any, any>>;
    sendPhoto(area: Area): Promise<void | import("axios").AxiosResponse<any, any>>;
    sendDocument(area: Area): Promise<void | import("axios").AxiosResponse<any, any>>;
    sendVideo(area: Area): Promise<void | import("axios").AxiosResponse<any, any>>;
    setChatPhoto(area: Area): Promise<void | import("axios").AxiosResponse<any, any>>;
    setChatTitle(area: Area): Promise<void | import("axios").AxiosResponse<any, any>>;
    setChatDescription(area: Area): Promise<void | import("axios").AxiosResponse<any, any>>;
    setChatStickerSet(area: Area): Promise<void | import("axios").AxiosResponse<any, any>>;
}
