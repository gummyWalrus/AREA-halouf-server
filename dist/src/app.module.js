"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const sms_module_1 = require("./sms/sms.module");
const twitter_module_1 = require("./twitter/twitter.module");
const mail_module_1 = require("./mail/mail.module");
const service_module_1 = require("./service/service.module");
const action_module_1 = require("./action/action.module");
const reaction_module_1 = require("./reaction/reaction.module");
const area_module_1 = require("./area/area.module");
const admin_token_middleware_1 = require("./admin-token.middleware");
const service_controller_1 = require("./service/service.controller");
const action_controller_1 = require("./action/action.controller");
const reaction_controller_1 = require("./reaction/reaction.controller");
const github_module_1 = require("./github/github.module");
const mytwitter_oauth_strategy_1 = require("./auth/twitter/mytwitter-oauth.strategy");
const axios_1 = require("@nestjs/axios");
const area_handler_module_1 = require("./area-handler/area-handler.module");
const calendar_module_1 = require("./calendar/calendar.module");
const youtube_module_1 = require("./youtube/youtube.module");
const telegram_module_1 = require("./telegram/telegram.module");
const discord_module_1 = require("./discord/discord.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(admin_token_middleware_1.default)
            .exclude({ path: 'services', method: common_1.RequestMethod.GET }, { path: 'actions', method: common_1.RequestMethod.GET }, { path: 'reactions', method: common_1.RequestMethod.GET }, { path: 'services/:id', method: common_1.RequestMethod.GET }, { path: 'actions/:id', method: common_1.RequestMethod.GET }, { path: 'reactions/:id', method: common_1.RequestMethod.GET })
            .forRoutes(service_controller_1.ServiceController, action_controller_1.ActionController, reaction_controller_1.ReactionController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_URL'),
                    dbName: configService.get('MONGODB_NAME')
                }),
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            sms_module_1.SmsModule,
            twitter_module_1.TwitterModule,
            mail_module_1.MailModule,
            service_module_1.ServiceModule,
            action_module_1.ActionModule,
            reaction_module_1.ReactionModule,
            area_module_1.AreaModule,
            github_module_1.GithubModule,
            axios_1.HttpModule,
            area_handler_module_1.AreaHandlerModule,
            calendar_module_1.CalendarModule,
            youtube_module_1.YoutubeModule,
            telegram_module_1.TelegramModule,
            discord_module_1.DiscordModule,
        ],
        controllers: [
            app_controller_1.AppController,
        ],
        providers: [
            app_service_1.AppService,
            mytwitter_oauth_strategy_1.MyTwitterOauthStrategy
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map