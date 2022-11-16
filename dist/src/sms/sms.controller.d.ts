import { SmsService } from './sms.service';
import { Area } from "../area/schemas/area.schema";
export declare class SmsController {
    private readonly smsService;
    constructor(smsService: SmsService);
    create(area: Area): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
    check(): string;
}
