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
exports.ReactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const service_service_1 = require("../../src/service/service.service");
const reaction_schema_1 = require("./schemas/reaction.schema");
let ReactionService = class ReactionService {
    constructor(reactionModel, serviceService) {
        this.reactionModel = reactionModel;
        this.serviceService = serviceService;
    }
    async create(createReactionDto) {
        const newReaction = await new this.reactionModel(createReactionDto).save();
        this.serviceService.addReaction(newReaction.service.toString(), newReaction._id);
        return newReaction;
    }
    async update(id, updateReactionDto) {
        return await this.reactionModel.findByIdAndUpdate(id, updateReactionDto).exec();
    }
    async delete(id) {
        const reaction = await this.reactionModel.findByIdAndDelete(id).exec();
        this.serviceService.removeReaction(reaction.service.toString(), reaction._id);
        return reaction;
    }
    async findOne(id) {
        return await this.reactionModel.findById(id).populate('service').exec();
    }
    async findAll() {
        return await this.reactionModel.find().populate('service').exec();
    }
    async deleteAll() {
        const reactions = await this.findAll();
        for (const reaction of reactions) {
            this.delete(reaction._id);
        }
        return { "msg": "All reactions deleted" };
    }
};
ReactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reaction_schema_1.Reaction.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => service_service_1.ServiceService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        service_service_1.ServiceService])
], ReactionService);
exports.ReactionService = ReactionService;
//# sourceMappingURL=reaction.service.js.map