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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../../src/user/user.service");
const local_auth_guard_1 = require("./local/local-auth.guard");
const google_auth_guard_1 = require("./google/google-auth.guard");
const github_auth_guard_1 = require("./github/github-auth.guard");
const discord_auth_guard_1 = require("./discord/discord-auth.guard");
const jwt_auth_guard_1 = require("./jwt/jwt-auth.guard");
const mytwitter_oauth_strategy_1 = require("./twitter/mytwitter-oauth.strategy");
const jwt = require("jsonwebtoken");
const discord_strategy_1 = require("./discord/discord-strategy");
let AuthController = class AuthController {
    constructor(authService, userService, config, mytwitter, discordStrategy) {
        this.authService = authService;
        this.userService = userService;
        this.config = config;
        this.mytwitter = mytwitter;
        this.discordStrategy = discordStrategy;
    }
    redirectAfterSignIn(req, token) {
        if (req.headers.platform === "web")
            return { url: `${this.config.get('FRONT_URL')}/#redirect?token=${token.token}` };
        else if (req.headers.platform === 'mobile')
            return { url: 'area-halouf://redirect' + `?token=${token.token}` };
    }
    async login(req) {
        const token = await this.authService.login(req.user);
        return Object.assign(Object.assign({}, token), req.user);
    }
    async google(req) {
        if (req.query.token) {
            let payload = jwt.decode(req.query.token);
            this.userService.update(payload.sub.toString(), { google: { token: "fetching" } });
            return { url: "/auth/google/authorize" };
        }
        else
            return { url: "/auth/google/authorize" };
    }
    async redirectToAuthGoogle(req) {
    }
    async googleRedirect(req, res) {
        const existingUser = await this.userService.all().then(async (users) => {
            for (const user of users) {
                if (user.google && user.google.token === "fetching") {
                    return this.authService.login(await this.userService.update(user._id, { google: req.user.google }));
                }
            }
            return null;
        });
        if (existingUser != null)
            res.redirect(this.redirectAfterSignIn(req, existingUser).url);
        else {
            const loggingUser = await this.userService.findByGoogleEmail(req.user.google.email).then(async (users) => {
                if (users.length > 0) {
                    return this.authService.login(await this.userService.update(users[0]._id, { google: req.user.google }));
                }
                else
                    return null;
            });
            if (loggingUser != null)
                res.redirect(this.redirectAfterSignIn(req, loggingUser).url);
            else {
                res.redirect(this.redirectAfterSignIn(req, await this.authService.login(await this.userService.create(req.user))).url);
            }
        }
    }
    async redirectToAuthGithub(req) {
    }
    async github(req) {
        if (req.query.token) {
            let payload = jwt.decode(req.query.token);
            this.userService.update(payload.sub.toString(), { github: { token: "fetching" } });
            return { url: "/auth/github/authorize" };
        }
        else
            return { url: "/auth/github/authorize" };
    }
    async githubRedirect(req, res) {
        const existingUser = await this.userService.all().then(async (users) => {
            for (const user of users) {
                if (user.github && user.github.token === "fetching") {
                    return this.authService.login(await this.userService.update(user._id, { github: req.user.github }));
                }
            }
            return null;
        });
        if (existingUser != null)
            res.redirect(this.redirectAfterSignIn(req, existingUser).url);
        else {
            const loggingUser = await this.userService.findByGithubUsername(req.user.github.username).then(async (users) => {
                if (users.length > 0) {
                    return this.authService.login(await this.userService.update(users[0]._id, { github: req.user.github }));
                }
                else
                    return null;
            });
            if (loggingUser != null)
                res.redirect(this.redirectAfterSignIn(req, loggingUser).url);
            else {
                res.redirect(this.redirectAfterSignIn(req, await this.authService.login(await this.userService.create(req.user))).url);
            }
        }
    }
    async redirectToAuthDiscord(res) {
    }
    async discord(req) {
        if (req.query.token) {
            let payload = jwt.decode(req.query.token);
            this.userService.update(payload.sub.toString(), { discord: { token: "fetching" } });
            return { url: "/auth/discord/authorize" };
        }
        else
            return { url: "/auth/discord/authorize" };
    }
    async discordHead() {
        return { "msg": "gimme Head" };
    }
    async discordRedirect(req, res) {
        const loggingUser = await this.userService.findByDiscordUsername(req.user.discord.username).then(async (users) => {
            if (users.length > 0) {
                return await this.authService.login(await this.userService.update(users[0]._id, { discord: req.user.discord }));
            }
            else
                return null;
        });
        if (loggingUser != null) {
            res.redirect(this.redirectAfterSignIn(req, loggingUser).url);
        }
        else {
            const existingUser = await this.userService.all().then(async (users) => {
                for (const user of users) {
                    if (user.discord && user.discord.token === "fetching") {
                        return await this.authService.login(await this.userService.update(user._id, { discord: req.user.discord }));
                    }
                }
                return null;
            });
            if (existingUser != null) {
                res.redirect(this.redirectAfterSignIn(req, existingUser).url);
            }
            else {
                res.redirect(this.redirectAfterSignIn(req, await this.authService.login(await this.userService.create(req.user))).url);
            }
        }
    }
    async twitter(req, res) {
        const redirect = await this.mytwitter.redirect(req);
        res.redirect(redirect.url);
    }
    async twitterRedirect(req, res) {
        const twitter_token = await this.mytwitter.handleRedirect(req);
        return await this.userService.findByEmail(req.query.state).then(async (users) => {
            if (users.length > 0) {
                const loginUser = await this.authService.login(await this.userService.update(users[0]._id, { twitter: { token: twitter_token.token } }));
                res.redirect(this.redirectAfterSignIn(req, loginUser).url);
            }
            else
                throw new common_1.NotFoundException();
        });
    }
    loggedInServices(req) {
        return this.authService.loggedInServices(req.user);
    }
};
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "redirectAfterSignIn", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.default),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "google", null);
__decorate([
    (0, common_1.Get)('google/authorize'),
    (0, common_1.UseGuards)(google_auth_guard_1.default),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "redirectToAuthGoogle", null);
__decorate([
    (0, common_1.Get)('google/redirect'),
    (0, common_1.UseGuards)(google_auth_guard_1.default),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleRedirect", null);
__decorate([
    (0, common_1.Get)('github/authorize'),
    (0, common_1.UseGuards)(github_auth_guard_1.default),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "redirectToAuthGithub", null);
__decorate([
    (0, common_1.Get)('github'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "github", null);
__decorate([
    (0, common_1.Get)('github/redirect'),
    (0, common_1.UseGuards)(github_auth_guard_1.default),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "githubRedirect", null);
__decorate([
    (0, common_1.Get)('discord/authorize'),
    (0, common_1.UseGuards)(discord_auth_guard_1.default),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "redirectToAuthDiscord", null);
__decorate([
    (0, common_1.Get)('discord'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "discord", null);
__decorate([
    (0, common_1.Head)('discord/redirect'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "discordHead", null);
__decorate([
    (0, common_1.Get)('discord/redirect'),
    (0, common_1.UseGuards)(discord_auth_guard_1.default),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "discordRedirect", null);
__decorate([
    (0, common_1.Get)('twitter'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "twitter", null);
__decorate([
    (0, common_1.Get)('twitter/redirect'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "twitterRedirect", null);
__decorate([
    (0, common_1.Get)('services'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loggedInServices", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        config_1.ConfigService,
        mytwitter_oauth_strategy_1.MyTwitterOauthStrategy,
        discord_strategy_1.DiscordStrategy])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map