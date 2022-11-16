import { TwilioService } from "nestjs-twilio";
import { Area } from "../area/schemas/area.schema";
export declare class SmsService {
    private readonly twilioService;
    constructor(twilioService: TwilioService);
    react(area: Area): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
    sendSMS(area: Area): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
    check(): string;
}
