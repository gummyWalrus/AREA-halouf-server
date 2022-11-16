import { ConfigService } from "@nestjs/config";
import { Area } from '../../src/area/schemas/area.schema';
import { UserService } from '../../src/user/user.service';
export declare class MailService {
    private Config;
    private user;
    constructor(Config: ConfigService, user: UserService);
    encodeMessage(message: any): Promise<string>;
    react(area: Area): Promise<any>;
    remove(id: number): string;
    create(area: Area): Promise<any>;
}
