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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const area_service_1 = require("../../src/area/area.service");
const bcrypt = require('bcryptjs');
let UserService = class UserService {
    constructor(userModel, areaService) {
        this.userModel = userModel;
        this.areaService = areaService;
    }
    async all() {
        return this.userModel.find();
    }
    async create(createUserDto) {
        createUserDto.password = bcrypt.hashSync(createUserDto.password);
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    async update(id, updateUserDto) {
        if (updateUserDto.password)
            updateUserDto.password = bcrypt.hashSync(updateUserDto.password);
        return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
    }
    async delete(id) {
        const user = await this.userModel.findById(id).exec();
        for (const area of user.areas)
            this.areaService.delete(area.toString());
        return user.delete();
    }
    async findOne(id) {
        return await this.userModel.findById(id).populate('areas').exec();
    }
    async findByEmail(email) {
        return await this.userModel.find({ "email": email }).exec();
    }
    async addArea(id, area_id) {
        return this.userModel.findByIdAndUpdate(id, { $addToSet: { areas: area_id } }, { new: true }).exec();
    }
    async removeArea(id, area_id) {
        return this.userModel.findByIdAndUpdate(id, { $pull: { areas: area_id } }, { new: true }).exec();
    }
    async findByGoogleEmail(email) {
        return this.userModel.find({ "google.email": email }).exec();
    }
    async findByGithubUsername(username) {
        return this.userModel.find({ "github.username": username }).exec();
    }
    async findByDiscordUsername(username) {
        return this.userModel.find({ "discord.username": username }).exec();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => area_service_1.AreaService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        area_service_1.AreaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map