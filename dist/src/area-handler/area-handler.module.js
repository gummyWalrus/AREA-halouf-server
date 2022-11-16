"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaHandlerModule = void 0;
const common_1 = require("@nestjs/common");
const area_handler_service_1 = require("./area-handler.service");
const twitter_module_1 = require("../../src/twitter/twitter.module");
const area_module_1 = require("../../src/area/area.module");
const action_module_1 = require("../../src/action/action.module");
const service_module_1 = require("../../src/service/service.module");
const mail_module_1 = require("../../src/mail/mail.module");
const calendar_module_1 = require("../calendar/calendar.module");
const youtube_module_1 = require("../youtube/youtube.module");
const sms_module_1 = require("../sms/sms.module");
const telegram_module_1 = require("../telegram/telegram.module");
const discord_module_1 = require("../../src/discord/discord.module");
let AreaHandlerModule = class AreaHandlerModule {
};
AreaHandlerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => area_module_1.AreaModule),
            action_module_1.ActionModule,
            twitter_module_1.TwitterModule,
            (0, common_1.forwardRef)(() => service_module_1.ServiceModule),
            mail_module_1.MailModule,
            calendar_module_1.CalendarModule,
            youtube_module_1.YoutubeModule,
            sms_module_1.SmsModule,
            telegram_module_1.TelegramModule,
            discord_module_1.DiscordModule
        ],
        providers: [area_handler_service_1.AreaHandlerService],
        exports: [area_handler_service_1.AreaHandlerService]
    })
], AreaHandlerModule);
exports.AreaHandlerModule = AreaHandlerModule;
//# sourceMappingURL=area-handler.module.js.map