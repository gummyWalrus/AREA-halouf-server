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
exports.CalendarService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
const area_schema_1 = require("../area/schemas/area.schema");
const googleapis_1 = require("googleapis");
let CalendarService = class CalendarService {
    constructor(Config, user) {
        this.Config = Config;
        this.user = user;
    }
    async react(area) {
        if (area.reaction.id.name === "Calendar Event") {
            return this.create(area);
        }
        else
            return null;
    }
    async create(area) {
        const user = await this.user.findOne(area.owner.toString());
        const oAuth2Client = new googleapis_1.google.auth.OAuth2(this.Config.get('OAUTH_GOOGLE_ID'), this.Config.get('OAUTH_GOOGLE_SECRET'), this.Config.get('OAUTH_GOOGLE_REDIRECT_URI'));
        oAuth2Client.setCredentials({ refresh_token: user.google.token });
        const calendar = googleapis_1.google.calendar({ version: 'v3', auth: oAuth2Client });
        const startDate = new Date(area.reaction.data.startDate);
        const endDate = new Date(area.reaction.data.endDate);
        const event = {
            summary: area.reaction.data.summary,
            location: area.reaction.data.location,
            description: area.reaction.data.description,
            start: {
                dateTime: startDate,
                timeZone: 'Europe/Paris',
            },
            end: {
                dateTime: endDate,
                timeZone: 'Europe/Paris',
            },
            colorId: 1
        };
        calendar.freebusy.query({
            resource: {
                timeMin: startDate,
                timeMax: endDate,
                timeZone: 'Europe/Paris',
                items: [{ id: "primary" }]
            }
        }, (err, res) => {
            if (err)
                return console.error("Free Busy Query Error: ", err);
            const eventArr = res.data.calendars.primary.busy;
            if (eventArr.length === 0) {
                return calendar.events.insert({ calendarId: "primary", resource: event }, err => {
                    if (err)
                        return console.error("Error Creating Calender Event:", err);
                    return console.log("Calendar event successfully created.");
                });
            }
        });
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", Promise)
], CalendarService.prototype, "create", null);
CalendarService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService])
], CalendarService);
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.service.js.map