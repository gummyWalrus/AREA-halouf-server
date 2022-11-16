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
exports.MyTwitterOauthStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Chance = require("chance");
const twitter_api_sdk_1 = require("twitter-api-sdk");
const twitter_api_sdk_2 = require("twitter-api-sdk");
const chance = new Chance();
let MyTwitterOauthStrategy = class MyTwitterOauthStrategy {
    constructor(configService) {
        this.configService = configService;
        this.authClient = new twitter_api_sdk_1.auth.OAuth2User({
            client_id: this.configService.get('OAUTH_TWITTER_CLIENT_ID'),
            client_secret: this.configService.get('OAUTH_TWITTER_CLIENT_SECRET'),
            callback: this.configService.get('OAUTH_TWITTER_REDIRECT_URL'),
            scopes: ["tweet.read", "users.read", "offline.access", "tweet.write"],
        });
    }
    async redirect(req) {
        return { url: this.authClient.generateAuthURL({
                state: req.user["email"],
                code_challenge_method: "s256"
            }) };
    }
    async handleRedirect(req) {
        return await this.authClient.requestAccessToken(req.query.code)
            .then((tokens) => {
            let client = new twitter_api_sdk_2.Client(this.authClient);
            return client.users.findMyUser().then((user) => {
                return { username: user.data.username, token: tokens.token.refresh_token };
            });
        }).catch((err) => { console.error(err); return null; });
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyTwitterOauthStrategy.prototype, "redirect", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyTwitterOauthStrategy.prototype, "handleRedirect", null);
MyTwitterOauthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MyTwitterOauthStrategy);
exports.MyTwitterOauthStrategy = MyTwitterOauthStrategy;
//# sourceMappingURL=mytwitter-oauth.strategy.js.map