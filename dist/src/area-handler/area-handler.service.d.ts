import { AreaService } from '../../src/area/area.service';
import { ActionService } from '../../src/action/action.service';
import { TwitterService } from '../../src/twitter/twitter.service';
import { ServiceService } from '../../src/service/service.service';
import { MailService } from '../../src/mail/mail.service';
import { CalendarService } from "../calendar/calendar.service";
import { YoutubeService } from "../youtube/youtube.service";
import { SmsService } from "../sms/sms.service";
import { TelegramService } from "../telegram/telegram.service";
import { DiscordService } from '../../src/discord/discord.service';
export declare class AreaHandlerService {
    private areaService;
    private readonly actionService;
    private readonly serviceService;
    private readonly twitterService;
    private readonly gmailService;
    private readonly calendarService;
    private readonly youtubeService;
    private readonly smsService;
    private readonly telegramService;
    private readonly discordService;
    constructor(areaService: AreaService, actionService: ActionService, serviceService: ServiceService, twitterService: TwitterService, gmailService: MailService, calendarService: CalendarService, youtubeService: YoutubeService, smsService: SmsService, telegramService: TelegramService, discordService: DiscordService);
    private readonly svcReactFunc;
    private readonly actionsCallbacks;
    reactToGithubActions(area: any, _this: any): Promise<any>;
    handleGithubAction(body: object): void;
}
