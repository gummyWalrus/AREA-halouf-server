"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordOauthStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_discord_1 = require("passport-discord");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../../../src/user/user.service");
const axios_1 = require("@nestjs/axios");
const Chance = require("chance");
const chance = new Chance();
let DiscordOauthStrategy = class DiscordOauthStrategy extends (0, passport_1.PassportStrategy)(passport_discord_1.Strategy, 'discord') {
    constructor(configService, userService, httpService) {
        super({
            clientID: configService.get('DISCORD_CLIENT_ID'),
            clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
            callbackURL: configService.get('DISCORD_REDIRECT_URL'),
            authorizationURL: 'https://discord.com/api/oauth2/authorize?permissions=1099511639040',
            scopeSeparator: ' ',
            scope: ['identify', 'email', 'guilds', 'bot']
        });
        this.userService = userService;
        this.httpService = httpService;
    }
    async validate(_accessToken, _refreshToken, profile) {
        return {
            firstname: `${profile.username}#${profile.discriminator}`,
            lastname: "Discord",
            email: profile.email,
            password: chance.string({ length: 10 }),
            discord: {
                token: _refreshToken,
                username: `${profile.username}#${profile.discriminator}`,
                id: profile.id,
            }
        };
    }
};
DiscordOauthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService,
        axios_1.HttpService])
], DiscordOauthStrategy);
exports.DiscordOauthStrategy = DiscordOauthStrategy;
//# sourceMappingURL=discord-oauth.strategy.js.map