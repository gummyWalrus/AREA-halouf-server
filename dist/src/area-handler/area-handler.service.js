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
exports.AreaHandlerService = void 0;
const common_1 = require("@nestjs/common");
const area_service_1 = require("../../src/area/area.service");
const action_service_1 = require("../../src/action/action.service");
const twitter_service_1 = require("../../src/twitter/twitter.service");
const service_service_1 = require("../../src/service/service.service");
const mail_service_1 = require("../../src/mail/mail.service");
const calendar_service_1 = require("../calendar/calendar.service");
const youtube_service_1 = require("../youtube/youtube.service");
const sms_service_1 = require("../sms/sms.service");
const telegram_service_1 = require("../telegram/telegram.service");
const discord_service_1 = require("../../src/discord/discord.service");
let AreaHandlerService = class AreaHandlerService {
    constructor(areaService, actionService, serviceService, twitterService, gmailService, calendarService, youtubeService, smsService, telegramService, discordService) {
        this.areaService = areaService;
        this.actionService = actionService;
        this.serviceService = serviceService;
        this.twitterService = twitterService;
        this.gmailService = gmailService;
        this.calendarService = calendarService;
        this.youtubeService = youtubeService;
        this.smsService = smsService;
        this.telegramService = telegramService;
        this.discordService = discordService;
        this.svcReactFunc = [
            {
                name: "Twitter",
                svcName: "twitterService"
            },
            {
                name: "Gmail",
                svcName: "gmailService"
            },
            {
                name: "Reddit",
                svcName: "redditService"
            },
            {
                name: "Calendar",
                svcName: "calendarService"
            },
            {
                name: "Youtube",
                svcName: "youtubeService"
            },
            {
                name: "SMS",
                svcName: "smsService"
            },
            {
                name: "Telegram",
                svcName: "telegramService"
            },
            {
                name: "Discord",
                svcName: "discordService"
            }
        ];
        this.actionsCallbacks = [
            {
                name: "Github Push",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.pusher &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github Star",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.starred_at && body.action === 'created' &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github Unstar",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if ((body.starred_at === null || body.starred_at) && body.action === "deleted" &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github Fork",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.forkee &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github CreateBranch",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.ref_type === 'branch' &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github CreateTag",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.ref_type === 'tag' &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github OpenIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'opened' && body.issue &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github CloseIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'closed' && body.issue &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github EditIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'edited' && body.issue &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github DeleteIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'deleted' && (body.issue || body.issue === null) &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github AssignIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'assigned' && body.issue &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github UnassignIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'unassigned' && body.issue &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github PinIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'pinned' && body.issue &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github UnpinIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'unpinned' && body.issue &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github LockIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'locked' && body.issue &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github UnlockIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'unlocked' && body.issue &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Github ReopenIssue",
                func: this.reactToGithubActions,
                check: function (area, body) {
                    if (body.action === 'reopened' && body.issue &&
                        `${area.action.data.owner}/${area.action.data.repository}` === body.repository.full_name) {
                        return true;
                    }
                    return false;
                }
            }
        ];
    }
    async reactToGithubActions(area, _this) {
        for (const service of _this.svcReactFunc) {
            if ((await _this.serviceService.findOneQuick(area.reaction.id.service)).name === service.name) {
                return _this[service.svcName].react(area);
            }
        }
    }
    handleGithubAction(body) {
        this.areaService.findAll().then(async (areas) => {
            for (const area of areas) {
                for (const action of this.actionsCallbacks) {
                    if (area.action.id.name == action.name) {
                        if (action.check(area, body))
                            action.func(area, this);
                        else
                            continue;
                    }
                }
            }
        });
    }
};
AreaHandlerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => area_service_1.AreaService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => service_service_1.ServiceService))),
    __metadata("design:paramtypes", [area_service_1.AreaService,
        action_service_1.ActionService,
        service_service_1.ServiceService,
        twitter_service_1.TwitterService,
        mail_service_1.MailService,
        calendar_service_1.CalendarService,
        youtube_service_1.YoutubeService,
        sms_service_1.SmsService,
        telegram_service_1.TelegramService,
        discord_service_1.DiscordService])
], AreaHandlerService);
exports.AreaHandlerService = AreaHandlerService;
//# sourceMappingURL=area-handler.service.js.map