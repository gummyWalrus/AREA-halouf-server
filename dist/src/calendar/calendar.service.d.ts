import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { Area } from "../area/schemas/area.schema";
export declare class CalendarService {
    private Config;
    private user;
    constructor(Config: ConfigService, user: UserService);
    react(area: Area): Promise<void>;
    create(area: Area): Promise<void>;
}
