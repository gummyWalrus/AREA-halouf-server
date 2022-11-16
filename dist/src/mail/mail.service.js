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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require('nodemailer');
const MailComposer = require('nodemailer/lib/mail-composer');
const googleapis_1 = require("googleapis");
const area_schema_1 = require("../../src/area/schemas/area.schema");
const user_service_1 = require("../../src/user/user.service");
let MailService = class MailService {
    constructor(Config, user) {
        this.Config = Config;
        this.user = user;
    }
    async encodeMessage(message) {
        return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    ;
    async react(area) {
        console.log('in react gmail');
        if (area.reaction.id.name === "Gmail Mail") {
            return this.create(area);
        }
        else
            return null;
    }
    remove(id) {
        return `This action removes a #${id} mail`;
    }
    async create(area) {
        const user = await this.user.findOne(area.owner.toString());
        const oAuth2Client = new googleapis_1.google.auth.OAuth2(this.Config.get('OAUTH_GOOGLE_ID'), this.Config.get('OAUTH_GOOGLE_SECRET'), this.Config.get('OAUTH_GOOGLE_REDIRECT_URI'));
        oAuth2Client.setCredentials({ refresh_token: user.google.token });
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: user.google.email,
                clientId: this.Config.get('OAUTH_GOOGLE_ID'),
                clientSecret: this.Config.get('OAUTH_GOOGLE_SECRET'),
                refreshToken: user.google.token,
                accessToken: accessToken.token
            }
        });
        const mailOptions = {
            from: 'Halouf Mail 📧 <' + user.google.email + '>',
            to: area.reaction.data.email.toString(),
            subject: area.reaction.data.objet,
            text: area.reaction.data.message,
            html: '<p>' + area.reaction.data.message + '</p>'
        };
        return await transport.sendMail(mailOptions);
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], MailService.prototype, "create", null);
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map