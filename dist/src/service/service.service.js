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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const service_schema_1 = require("./schemas/service.schema");
const mongoose_2 = require("mongoose");
const action_service_1 = require("../../src/action/action.service");
const reaction_service_1 = require("../../src/reaction/reaction.service");
const auth_service_1 = require("../../src/auth/auth.service");
const discord_service_1 = require("../../src/discord/discord.service");
const nologinServices = ['SMS', 'Telegram'];
function findAuthServicebyName(serv) {
    if ((serv.service.name === this.name && serv.loggedIn === true)
        || nologinServices.find((service) => {
            return this.name === service;
        }, serv))
        return true;
    else
        return false;
}
function findServicebyName(serv) {
    if (serv.name === this.name)
        return true;
    else
        return false;
}
let ServiceService = class ServiceService {
    constructor(serviceModel, actionService, reactionService, authService, discord) {
        this.serviceModel = serviceModel;
        this.actionService = actionService;
        this.reactionService = reactionService;
        this.authService = authService;
        this.discord = discord;
    }
    async create(createServiceDto) {
        return new this.serviceModel(createServiceDto).save();
    }
    async update(id, updateServiceDto) {
        return await this.serviceModel.findByIdAndUpdate(id, updateServiceDto).exec();
    }
    async delete(id) {
        let service = await this.serviceModel.findById(id);
        for (const action of service.actions)
            this.actionService.delete(action.toString());
        for (const reaction of service.reactions)
            this.reactionService.delete(reaction.toString());
        return service.delete();
    }
    async deleteAll() {
        let services = await this.findAll();
        for (const service of services)
            await this.delete(service._id);
        return { "msg": "all services deleted" };
    }
    async findOneQuick(id) {
        const service = await this.serviceModel.findById(id).populate('actions').populate('reactions').exec();
        return service;
    }
    async findOne(id, user_id) {
        const service = await this.serviceModel.findById(id).populate('actions').populate('reactions').exec();
        for (const reaction of service.reactions) {
            if (reaction.name === "Discord ChannelMsg") {
                reaction.dataScheme.channel.choices = await this.discord.getChannels(user_id);
            }
        }
        return service;
    }
    async findAll() {
        return await this.serviceModel.find().populate('actions').populate('reactions').exec();
    }
    async addAction(id, action_id) {
        return await this.serviceModel.findByIdAndUpdate(id, { $addToSet: { actions: action_id } }, { new: true }).exec();
    }
    async removeAction(id, action_id) {
        return await this.serviceModel.findByIdAndUpdate(id, { $pull: { actions: action_id } }).exec();
    }
    async addReaction(id, reaction_id) {
        return this.serviceModel.findByIdAndUpdate(id, { $addToSet: { reactions: reaction_id } }, { new: true }).exec();
    }
    async removeReaction(id, reaction_id) {
        return this.serviceModel.findByIdAndUpdate(id, { $pull: { reactions: reaction_id } }).exec();
    }
    async findActionServices(req) {
        let services = await this.findAll();
        const authedServices = await this.authService.loggedInServices(req.user);
        let actionsServices = [];
        for (let serv of services) {
            if (serv.actions.length > 0)
                actionsServices.push(serv);
        }
        for (let service of actionsServices) {
            const index = authedServices.findIndex(findAuthServicebyName, service);
            if (index < 0) {
                actionsServices.splice(actionsServices.findIndex(findServicebyName, service), 1);
            }
        }
        return actionsServices;
    }
    async findReactionServices(req) {
        let services = await this.findAll();
        const authedServices = await this.authService.loggedInServices(req.user);
        let reactionsServices = [];
        for (let serv of services) {
            if (serv.reactions.length > 0)
                reactionsServices.push(serv);
        }
        let resultServices = [];
        for (let service of reactionsServices) {
            const index = authedServices.findIndex(findAuthServicebyName, service);
            if (index >= 0) {
                resultServices.push(service);
            }
        }
        return resultServices;
    }
};
ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(service_schema_1.Service.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => action_service_1.ActionService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => reaction_service_1.ReactionService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => discord_service_1.DiscordService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        action_service_1.ActionService,
        reaction_service_1.ReactionService,
        auth_service_1.AuthService,
        discord_service_1.DiscordService])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map