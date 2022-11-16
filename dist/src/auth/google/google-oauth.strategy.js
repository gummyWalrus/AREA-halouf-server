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
exports.GoogleOauthStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../../../src/user/user.service");
const Chance = require("chance");
const chance = new Chance();
let GoogleOauthStrategy = class GoogleOauthStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(configService, userService) {
        super({
            clientID: configService.get('OAUTH_GOOGLE_ID'),
            clientSecret: configService.get('OAUTH_GOOGLE_SECRET'),
            callbackURL: configService.get('OAUTH_GOOGLE_REDIRECT_URL'),
            scope: ['email', 'profile', 'https://mail.google.com/', 'openid',
                'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events',
                'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.upload'],
            access_type: 'offline'
        });
        this.userService = userService;
    }
    async validate(_accessToken, _refreshToken, profile) {
        const { id, name, emails } = profile;
        return {
            firstname: name.givenName || "Google",
            lastname: name.familyName || name.givenName || "Google",
            email: emails[0].value,
            password: chance.string({ length: 10 }),
            google: {
                token: _refreshToken,
                username: `${name.givenName} ${name.familyName}`,
                email: emails[0].value
            }
        };
    }
};
GoogleOauthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService])
], GoogleOauthStrategy);
exports.GoogleOauthStrategy = GoogleOauthStrategy;
//# sourceMappingURL=google-oauth.strategy.js.map