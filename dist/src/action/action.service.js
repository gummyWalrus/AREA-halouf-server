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
exports.ActionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const service_service_1 = require("../../src/service/service.service");
const action_schema_1 = require("./schemas/action.schema");
let ActionService = class ActionService {
    constructor(actionModel, serviceService) {
        this.actionModel = actionModel;
        this.serviceService = serviceService;
    }
    async create(createActionDto) {
        const newAction = await new this.actionModel(createActionDto).save();
        this.serviceService.addAction(newAction.service.toString(), newAction._id);
        return newAction;
    }
    async update(id, updateActionDto) {
        return await this.actionModel.findByIdAndUpdate(id, updateActionDto).exec();
    }
    async delete(id) {
        const action = await this.actionModel.findByIdAndDelete(id).exec();
        this.serviceService.removeAction(action.service.toString(), action._id);
        return action;
    }
    async deleteAll() {
        const actions = await this.findAll();
        for (const action of actions) {
            this.delete(action._id);
        }
        return { "msg": "all actions deleted" };
    }
    async findOne(id) {
        return await this.actionModel.findById(id).populate('service').exec();
    }
    async findAll() {
        return await this.actionModel.find().populate('service').exec();
    }
};
ActionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(action_schema_1.Action.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => service_service_1.ServiceService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        service_service_1.ServiceService])
], ActionService);
exports.ActionService = ActionService;
//# sourceMappingURL=action.service.js.map