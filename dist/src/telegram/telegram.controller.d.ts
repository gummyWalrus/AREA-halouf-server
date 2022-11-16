import { TelegramService } from './telegram.service';
import { Area } from "../area/schemas/area.schema";
export declare class TelegramController {
    private readonly telegramService;
    constructor(telegramService: TelegramService);
    sensSMS(area: Area): Promise<void | import("axios").AxiosResponse<any, any>>;
}
