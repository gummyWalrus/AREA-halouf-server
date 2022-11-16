import { MailService } from './mail.service';
import { Area } from "../area/schemas/area.schema";
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    create(area: Area): Promise<any>;
    remove(id: string): string;
}
