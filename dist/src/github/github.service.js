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
exports.GithubService = void 0;
const common_1 = require("@nestjs/common");
const { Octokit } = require('octokit');
const action_service_1 = require("../../src/action/action.service");
const config_1 = require("@nestjs/config");
const area_service_1 = require("../../src/area/area.service");
const user_service_1 = require("../../src/user/user.service");
const area_handler_service_1 = require("../../src/area-handler/area-handler.service");
require('dotenv').config();
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
let GithubService = class GithubService {
    constructor(config, areaService, userService, handlerService, actionService) {
        this.config = config;
        this.areaService = areaService;
        this.userService = userService;
        this.handlerService = handlerService;
        this.actionService = actionService;
    }
    getHello() {
        return 'Hello Github!';
    }
    async listOrgs() {
        try {
            const resp = await octokit.request('GET /user/orgs');
            return (resp);
        }
        catch (error) {
            return (error);
        }
    }
    async listAllRepo() {
        try {
            const resp = await octokit.request('GET /user/repos');
            const repos = [];
            resp.data.forEach((repo) => {
                repos.push({
                    id: repo.id,
                    name: repo.name,
                    full_name: repo.full_name,
                    url: repo.url,
                    description: repo.description,
                    created_at: repo.created_at,
                    updated_at: repo.updated_at,
                });
            });
            return repos;
        }
        catch (error) {
            return (error);
        }
    }
    async createRepo(body) {
        try {
            const resp = await octokit.request('POST ' + '/user/repos', body);
            return (resp);
        }
        catch (error) {
            return (error);
        }
    }
    async updateRepo(body) {
        try {
            const path = '/repos/' + body.owner + '/' + body.repo;
            const resp = await octokit.request('PATCH ' + path, body);
            return (resp);
        }
        catch (error) {
            return (error);
        }
    }
    async deleteRepo(body) {
        try {
            const path = '/repos/' + body.owner + '/' + body.repo;
            const resp = await octokit.request('DELETE ' + path, body);
            return (resp);
        }
        catch (error) {
            return (error);
        }
    }
    async createRepoFromOrg(body) {
        try {
            const path = '/orgs/' + body.org + '/repos';
            const resp = await octokit.request('POST ' + path, body);
            return (resp.status, resp.data);
        }
        catch (error) {
            return (error);
        }
    }
    async updateRepoFromOrg(body) {
        try {
            const path = '/repos/' + body.org + '/' + body.repo;
            const resp = await octokit.request('PATCH ' + path, body);
            return (resp);
        }
        catch (error) {
            return (error);
        }
    }
    async deleteRepoFromOrg(body) {
        try {
            const path = '/repos/' + body.org + '/' + body.name;
            const resp = await octokit.request('DELETE ' + path);
            return (resp);
        }
        catch (error) {
            return (error);
        }
    }
    async webhook(req) {
        this.handlerService.handleGithubAction(req.body);
        return req.body;
    }
    checkHooksUrl(hooks, url) {
        for (const hook of hooks) {
            if (hook.config.url === url)
                return false;
        }
        return true;
    }
    getHookId(hooks, url) {
        for (const hook of hooks) {
            if (hook.config.url == url)
                return hook.id;
        }
        return -1;
    }
    async addWebhook(area) {
        const user = (await this.userService.findOne(area.owner));
        const action = area.action;
        const octokit_user = new Octokit({
            auth: user.github.token,
        });
        octokit_user.request(`GET /repos/${action.data.owner}/${action.data.repository}/hooks`).then(async (res) => {
            const hooks = res.data;
            if (res.statusCode === 404)
                return { "msg": "Repository not found", "statusCode": 404 };
            else if (hooks.length === 0 || this.checkHooksUrl(hooks, this.config.get('GITHUB_WEBHOOK_URL'))) {
                switch ((await this.actionService.findOne(area.action.id)).name) {
                    case "Github Push":
                        this.createWebhook(area, octokit_user, "push");
                        break;
                    case "Github Star":
                        this.createWebhook(area, octokit_user, "star");
                        break;
                    case "Github Unstar":
                        this.createWebhook(area, octokit_user, "star");
                        break;
                    case "Github Fork":
                        this.createWebhook(area, octokit_user, "fork");
                        break;
                    case "Github CreateBranch":
                        this.createWebhook(area, octokit_user, "create");
                        break;
                    case "Github CreateTag":
                        this.createWebhook(area, octokit_user, "create");
                        break;
                    case "Github OpenIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    case "Github CloseIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    case "Github EditIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    case "Github DeleteIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    case "Github AssignIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    case "Github UnassignIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    case "Github PinIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    case "Github UnpinIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    case "Github LockIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    case "Github UnlockIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    case "Github ReopenIssue":
                        this.createWebhook(area, octokit_user, "issues");
                        break;
                    default:
                        break;
                }
            }
            else {
                switch ((await this.actionService.findOne(area.action.id)).name) {
                    case "Github Push":
                        this.putWebhook(area, octokit_user, "push", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github Star":
                        this.putWebhook(area, octokit_user, "star", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github Unstar":
                        this.putWebhook(area, octokit_user, "star", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github Fork":
                        this.putWebhook(area, octokit_user, "fork", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github CreateBranch":
                        this.putWebhook(area, octokit_user, "create", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github CreateTag":
                        this.putWebhook(area, octokit_user, "create", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github OpenIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github CloseIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github EditIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github DeleteIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github AssignIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github UnassignIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github PinIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github UnpinIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github LockIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github UnlockIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    case "Github ReopenIssue":
                        this.putWebhook(area, octokit_user, "issues", this.getHookId(hooks, this.config.get('GITHUB_WEBHOOK_URL')));
                        break;
                    default:
                        break;
                }
            }
        }).catch((err) => {
            console.log(err);
            return { "msg": "repository not found" };
        });
    }
    async createWebhook(area, octokit_user, event) {
        let action = area.action;
        await octokit_user.request(`POST /repos/${action.data.owner}/${action.data.repository}/hooks`, {
            owner: action.data.owner,
            repo: action.data.repository,
            name: action.name,
            active: true,
            events: [
                event
            ],
            config: {
                url: this.config.get('GITHUB_WEBHOOK_URL'),
                content_type: 'json',
                insecure_ssl: '1'
            }
        });
    }
    async putWebhook(area, octokit_user, event, hook_id) {
        let action = area.action;
        const gitres = await octokit_user.request(`PATCH /repos/${action.data.owner}/${action.data.repository}/hooks/${hook_id}`, {
            owner: action.data.owner,
            repo: action.data.repository,
            name: action.name,
            active: true,
            add_events: [
                event
            ],
            config: {
                url: this.config.get('GITHUB_WEBHOOK_URL'),
                content_type: 'json',
                insecure_ssl: '1'
            }
        });
    }
};
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubService.prototype, "createRepo", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubService.prototype, "updateRepo", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubService.prototype, "deleteRepo", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubService.prototype, "createRepoFromOrg", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubService.prototype, "updateRepoFromOrg", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubService.prototype, "deleteRepoFromOrg", null);
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubService.prototype, "webhook", null);
GithubService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => area_service_1.AreaService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [config_1.ConfigService,
        area_service_1.AreaService,
        user_service_1.UserService,
        area_handler_service_1.AreaHandlerService,
        action_service_1.ActionService])
], GithubService);
exports.GithubService = GithubService;
//# sourceMappingURL=github.service.js.map