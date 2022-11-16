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
exports.YoutubeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
const area_schema_1 = require("../area/schemas/area.schema");
const googleapis_1 = require("googleapis");
const fs = require("fs");
let YoutubeService = class YoutubeService {
    constructor(Config, user) {
        this.Config = Config;
        this.user = user;
        this.oAuth2Client = new googleapis_1.google.auth.OAuth2(this.Config.get('OAUTH_GOOGLE_ID'), this.Config.get('OAUTH_GOOGLE_SECRET'), this.Config.get('OAUTH_GOOGLE_REDIRECT_URI'));
        this.array_video = [
            "BestCryEver.mp4",
            "GOT'EEEEMM!!!!!.mp4",
            "video.mp4",
            "Yeahboy.mp4",
            "GalaxyBrain.mp4",
            "Weliketoparty.mp4",
            "Alotofdamage.mp4",
            "AAAAUUUGHHHH.mp4",
            "AREYOUGONNAFINISHTHATCROISSANT.mp4",
            "Duckspinningtotokyodrift.mp4",
            "funkytownlowquality.mp4",
            "LilGlobglogabgalab.mp4",
            "MiiChannel.mp4",
            "PÚAPIPI.mp4"
        ];
    }
    parameters(area) {
        return {
            part: 'snippet,status',
            resource: this.video(area),
            media: this.media(),
        };
    }
    media() {
        return {
            mimeType: 'video/*',
            body: fs.createReadStream("video/" + this.array_video[Math.floor(Math.random() * this.array_video.length)])
        };
    }
    ;
    video(area) {
        return {
            snippet: {
                title: area.reaction.data.title,
                description: area.reaction.data.description,
            },
            status: {
                privacyStatus: area.reaction.data.privacyStatus ? 'private' : 'public'
            }
        };
    }
    async react(area) {
        console.log('in react youtube');
        if (area.reaction.id.name === "Youtube Upload Video") {
            return this.upload(area);
        }
        else
            return null;
    }
    async upload(area) {
        const user = await this.user.findOne(area.owner.toString());
        this.oAuth2Client.setCredentials({ refresh_token: user.google.token });
        const youtube = googleapis_1.google.youtube({ version: 'v3', auth: this.oAuth2Client });
        youtube.videos.insert({
            part: 'snippet,status',
            resource: this.video(area),
            media: this.media(),
        }, (err, data) => {
            if (err)
                return console.log("The API returned an error: ", err);
            console.log("The video was uploaded. data: ", data);
        });
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], YoutubeService.prototype, "upload", null);
YoutubeService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService])
], YoutubeService);
exports.YoutubeService = YoutubeService;
//# sourceMappingURL=youtube.service.js.map