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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const config_1 = require("@nestjs/config");
const jwt_auth_guard_1 = require("../../src/auth/jwt/jwt-auth.guard");
const auth_service_1 = require("../../src/auth/auth.service");
let UserController = class UserController {
    constructor(service, config, authService) {
        this.service = service;
        this.config = config;
        this.authService = authService;
    }
    async get(req, res) {
        const user = await this.service.findOne(req.user.userId);
        if (!user)
            res.status(404).send();
        else
            res.json(user);
    }
    async create(createUserDto) {
        return this.service.findByEmail(createUserDto.email).then((user) => {
            if (user.length === 0) {
                return this.service.create(createUserDto).then(async (user) => {
                    const jwt = await this.authService.login(user);
                    return Object.assign({ user: user }, jwt);
                }).catch((error) => {
                    console.error(error);
                    return { "msg": "Could not create new user" };
                });
            }
            else {
                return { "msg": "email already in use" };
            }
        });
    }
    async update(req, updateUserDto) {
        if (updateUserDto.email) {
            return this.service.findByEmail(updateUserDto.email).then((user) => {
                if (user.length === 0) {
                    return this.service.update(req.user.userId, updateUserDto).then((user) => {
                        return user;
                    }).catch((error) => {
                        console.error(error);
                        return { "msg": "Could not update user" };
                    });
                }
                else {
                    return { "msg": "email already in use" };
                }
            });
        }
        else {
            return this.service.update(req.user.userId, updateUserDto).then((user) => {
                return user;
            }).catch((error) => {
                console.error(error);
                return { "msg": "Could not update user" };
            });
        }
    }
    async delete(req) {
        return this.service.delete(req.user.userId);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService,
        auth_service_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map