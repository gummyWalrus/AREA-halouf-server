"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_strategy_1 = require("./local/local.strategy");
const jwt_strategy_1 = require("./jwt/jwt.strategy");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const auth_controller_1 = require("./auth.controller");
const user_module_1 = require("../../src/user/user.module");
const google_oauth_strategy_1 = require("./google/google-oauth.strategy");
const github_oauth_strategy_1 = require("./github/github-oauth.strategy");
const axios_1 = require("@nestjs/axios");
const mytwitter_oauth_strategy_1 = require("./twitter/mytwitter-oauth.strategy");
const service_module_1 = require("../../src/service/service.module");
const discord_strategy_1 = require("./discord/discord-strategy");
const discord_oauth_strategy_1 = require("./discord/discord-oauth.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            passport_1.PassportModule,
            (0, common_1.forwardRef)(() => service_module_1.ServiceModule),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '60s' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            google_oauth_strategy_1.GoogleOauthStrategy,
            github_oauth_strategy_1.GithubOauthStrategy,
            mytwitter_oauth_strategy_1.MyTwitterOauthStrategy,
            discord_oauth_strategy_1.DiscordOauthStrategy,
            discord_strategy_1.DiscordStrategy,
        ],
        exports: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            mytwitter_oauth_strategy_1.MyTwitterOauthStrategy,
            discord_strategy_1.DiscordStrategy,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map