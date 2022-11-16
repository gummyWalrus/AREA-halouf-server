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
exports.ReactionController = void 0;
const common_1 = require("@nestjs/common");
const reaction_service_1 = require("./reaction.service");
const create_reaction_dto_1 = require("./dto/create-reaction.dto");
const update_reaction_dto_1 = require("./dto/update-reaction.dto");
const jwt_auth_guard_1 = require("../../src/auth/jwt/jwt-auth.guard");
let ReactionController = class ReactionController {
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return await this.service.findAll();
    }
    async getOne(id) {
        return await this.service.findOne(id);
    }
    async putReaction(id, updateReactionDto) {
        return await this.service.update(id, updateReactionDto);
    }
    async createReaction(createReactionDto) {
        return await this.service.create(createReactionDto);
    }
    async deleteAll() {
        return await this.service.deleteAll();
    }
    async delete(id) {
        return await this.service.delete(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reaction_dto_1.UpdateReactionDto]),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "putReaction", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reaction_dto_1.CreateReactionDto]),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "createReaction", null);
__decorate([
    (0, common_1.Delete)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "deleteAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "delete", null);
ReactionController = __decorate([
    (0, common_1.Controller)('reactions'),
    __metadata("design:paramtypes", [reaction_service_1.ReactionService])
], ReactionController);
exports.ReactionController = ReactionController;
//# sourceMappingURL=reaction.controller.js.map