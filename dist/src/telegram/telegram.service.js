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
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
const area_schema_1 = require("../area/schemas/area.schema");
const axios_1 = require("@nestjs/axios");
const axios_2 = require("axios");
let TelegramService = class TelegramService {
    constructor(Config, http, user) {
        this.Config = Config;
        this.http = http;
        this.user = user;
        this.reactions = [
            {
                name: 'Send SMS',
                func: 'sendSMS',
            },
            {
                name: 'Send Animation',
                func: 'sendAnimation',
            },
            {
                name: 'Send Photo',
                func: 'sendPhoto',
            },
            {
                name: 'Send Document',
                func: 'sendDocument',
            },
            {
                name: 'Send Video',
                func: 'sendVideo',
            },
            {
                name: 'Set Chat Photo',
                func: 'setChatPhoto',
            },
            {
                name: 'Set Chat Title',
                func: 'setChatTitle',
            },
            {
                name: 'Set Chat Description',
                func: 'setChatDescription',
            },
            {
                name: 'Set Chat Sticker Set',
                func: 'setChatStickerSet',
            }
        ];
    }
    async react(area) {
        console.log('in react telegram');
        for (const reaction of this.reactions) {
            if (reaction.name === area.reaction.id.name) {
                return this[reaction.func](area);
            }
        }
        return null;
    }
    async sendSMS(area) {
        return axios_2.default.post('https://api.telegram.org/bot' + this.Config.get('TELEGRAM_BOT_TOKEN')
            + '/sendMessage?chat_id=' + area.reaction.data.groupeId + "&text=" + area.reaction.data.message).catch(err => console.log(err));
    }
    async sendAnimation(area) {
        return axios_2.default.post('https://api.telegram.org/bot' + this.Config.get('TELEGRAM_BOT_TOKEN')
            + '/sendAnimation?chat_id=' + area.reaction.data.groupeId + "&animation=" + area.reaction.data.animation).catch(err => console.log(err));
    }
    async sendPhoto(area) {
        return axios_2.default.post('https://api.telegram.org/bot' + this.Config.get('TELEGRAM_BOT_TOKEN')
            + '/sendPhoto?chat_id=' + area.reaction.data.groupeId + "&photo=" + area.reaction.data.photo).catch(err => console.log(err));
    }
    async sendDocument(area) {
        return axios_2.default.post('https://api.telegram.org/bot' + this.Config.get('TELEGRAM_BOT_TOKEN')
            + '/sendDocument?chat_id=' + area.reaction.data.groupeId + "&document=" + area.reaction.data.document).catch(err => console.log(err));
    }
    async sendVideo(area) {
        return axios_2.default.post('https://api.telegram.org/bot' + this.Config.get('TELEGRAM_BOT_TOKEN')
            + '/sendVideo?chat_id=' + area.reaction.data.groupeId + "&video=" + area.reaction.data.video).catch(err => console.log(err));
    }
    async setChatPhoto(area) {
        return axios_2.default.post('https://api.telegram.org/bot' + this.Config.get('TELEGRAM_BOT_TOKEN')
            + '/setChatPhoto?chat_id=' + area.reaction.data.groupeId + "&photo=" + area.reaction.data.photo).catch(err => console.log(err));
    }
    async setChatTitle(area) {
        return axios_2.default.post('https://api.telegram.org/bot' + this.Config.get('TELEGRAM_BOT_TOKEN')
            + '/setChatTitle?chat_id=' + area.reaction.data.groupeId + "&title=" + area.reaction.data.title).catch(err => console.log(err));
    }
    async setChatDescription(area) {
        return axios_2.default.post('https://api.telegram.org/bot' + this.Config.get('TELEGRAM_BOT_TOKEN')
            + '/setChatDescription?chat_id=' + area.reaction.data.groupeId + "&description=" + area.reaction.data.description).catch(err => console.log(err));
    }
    async setChatStickerSet(area) {
        return axios_2.default.post('https://api.telegram.org/bot' + this.Config.get('TELEGRAM_BOT_TOKEN')
            + '/setChatStickerSet?chat_id=' + area.reaction.data.groupeId + "&sticker_set_name=" + area.reaction.data.stickerSetName).catch(err => console.log(err));
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], TelegramService.prototype, "sendSMS", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], TelegramService.prototype, "sendAnimation", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], TelegramService.prototype, "sendPhoto", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], TelegramService.prototype, "sendDocument", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], TelegramService.prototype, "sendVideo", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], TelegramService.prototype, "setChatPhoto", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], TelegramService.prototype, "setChatTitle", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], TelegramService.prototype, "setChatDescription", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], TelegramService.prototype, "setChatStickerSet", null);
TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService,
        user_service_1.UserService])
], TelegramService);
exports.TelegramService = TelegramService;
//# sourceMappingURL=telegram.service.js.map