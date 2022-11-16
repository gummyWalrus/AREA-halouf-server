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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../../../src/user/user.service");
const axios_1 = require("@nestjs/axios");
let DiscordStrategy = class DiscordStrategy {
    constructor(configService, userService, httpService) {
        this.userService = userService;
        this.httpService = httpService;
        this.clientID = configService.get('DISCORD_CLIENT_ID');
        this.clientSecret = configService.get('DISCORD_CLIENT_SECRET');
        this.callbackURL = configService.get('DISCORD_REDIRECT_URL');
        this.scopeSeparator = ' ';
        this.scope = ['identify', 'email', 'guilds'];
    }
    serializeScopes() {
        return encodeURIComponent(this.scope.join(this.scopeSeparator));
    }
    generateAuthURL() {
        return `https://discord.com/oauth2/authorize?client_id=${this.clientID}&response_type=code&scope=${this.serializeScopes()}&redirect_uri=${encodeURIComponent(this.callbackURL)}&prompt=consent&state=state`;
    }
    async refreshAccessToken(user_id) {
        const user = await this.userService.findOne(user_id);
        return await this.httpService.axiosRef.post('https://discord.com/api/oauth2/token', `client_id=${this.clientID}&client_secret=${this.clientSecret}&refresh_token=${user.discord.token}&grant_type=refresh_token`, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then((res) => {
            this.userService.update(user_id, { discord: { token: res.data.refresh_token } });
            return res.data.access_token;
        }).catch(console.error);
    }
    async getProfile(accessToken) {
        return this.httpService.axiosRef.get('https://discord.com/api/users/@me', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then((res) => {
            return res.data;
        }).catch(console.error);
    }
};
DiscordStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService,
        axios_1.HttpService])
], DiscordStrategy);
exports.DiscordStrategy = DiscordStrategy;
//# sourceMappingURL=discord-strategy.js.map