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
exports.AreaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const area_schema_1 = require("./schemas/area.schema");
const user_service_1 = require("../../src/user/user.service");
const reaction_service_1 = require("../../src/reaction/reaction.service");
const action_service_1 = require("../../src/action/action.service");
const github_service_1 = require("../../src/github/github.service");
let AreaService = class AreaService {
    constructor(areaModel, userService, actionService, reactionService, githubService) {
        this.areaModel = areaModel;
        this.userService = userService;
        this.actionService = actionService;
        this.reactionService = reactionService;
        this.githubService = githubService;
    }
    async create(uid, createAreaDto) {
        const newArea = await new this.areaModel(Object.assign(Object.assign({}, createAreaDto), { "owner": uid })).save();
        this.userService.addArea(uid, newArea._id);
        this.actionService.findOne(createAreaDto.action.id).then((action) => {
            if (action.service.name === "Github") {
                this.githubService.addWebhook(newArea);
            }
        });
        return newArea;
    }
    async update(id, updateAreaDto) {
        return await this.areaModel.findByIdAndUpdate(id, updateAreaDto).exec();
    }
    async delete(id) {
        const area = await this.areaModel.findByIdAndDelete(id).exec();
        this.userService.removeArea(area.owner.toString(), area._id);
        return area;
    }
    async findOne(id) {
        return await this.areaModel.findById(id).populate('action.id').populate('reaction.id').exec();
    }
    async findAll() {
        return await this.areaModel.find().populate('action.id').populate('reaction.id').exec();
    }
};
AreaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(area_schema_1.Area.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => github_service_1.GithubService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        action_service_1.ActionService,
        reaction_service_1.ReactionService,
        github_service_1.GithubService])
], AreaService);
exports.AreaService = AreaService;
//# sourceMappingURL=area.service.js.map