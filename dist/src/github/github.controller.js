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
exports.GithubController = void 0;
const common_1 = require("@nestjs/common");
const github_service_1 = require("./github.service");
let GithubController = class GithubController {
    constructor(githubService) {
        this.githubService = githubService;
    }
    getHello() {
        return this.githubService.getHello();
    }
    async listOrgs() {
        return this.githubService.listOrgs();
    }
    async listAllRepo() {
        return this.githubService.listAllRepo();
    }
    async createRepo(body) {
        return this.githubService.createRepo(body);
    }
    async updateRepo(body) {
        return this.githubService.updateRepo(body);
    }
    async deleteRepo(body) {
        return this.githubService.deleteRepo(body);
    }
    async createRepoFromOrg(body) {
        return this.githubService.createRepoFromOrg(body);
    }
    async updateRepoFromOrg(body) {
        return this.githubService.updateRepoFromOrg(body);
    }
    async deleteRepoFromOrg(body) {
        return this.githubService.deleteRepoFromOrg(body);
    }
    async webhook(req) {
        return this.githubService.webhook(req);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], GithubController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('orgs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "listOrgs", null);
__decorate([
    (0, common_1.Get)('repos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "listAllRepo", null);
__decorate([
    (0, common_1.Post)('repos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "createRepo", null);
__decorate([
    (0, common_1.Patch)('repos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "updateRepo", null);
__decorate([
    (0, common_1.Delete)('repos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "deleteRepo", null);
__decorate([
    (0, common_1.Post)('org/repos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "createRepoFromOrg", null);
__decorate([
    (0, common_1.Patch)('org/repos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "updateRepoFromOrg", null);
__decorate([
    (0, common_1.Delete)('org/repos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "deleteRepoFromOrg", null);
__decorate([
    (0, common_1.Post)("webhook"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "webhook", null);
GithubController = __decorate([
    (0, common_1.Controller)('github'),
    __metadata("design:paramtypes", [github_service_1.GithubService])
], GithubController);
exports.GithubController = GithubController;
//# sourceMappingURL=github.controller.js.map