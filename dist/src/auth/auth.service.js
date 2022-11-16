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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../src/user/user.service");
const jwt_1 = require("@nestjs/jwt");
const service_service_1 = require("../../src/service/service.service");
const bcrypt = require('bcryptjs');
const googleServices = ['Gmail', 'Calendar', 'Youtube'];
const nologinServices = ['SMS', 'Telegram'];
let AuthService = class AuthService {
    constructor(userService, jwtService, serviceService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.serviceService = serviceService;
    }
    async validateUser(username, pass) {
        const users = await this.userService.findByEmail(username);
        console.table(users);
        if (users.length > 0) {
            let user = users[0];
            if (bcrypt.compareSync(pass, user.password))
                return user;
            else
                return 401;
        }
        else
            return 404;
    }
    async login(user) {
        const payload = { email: user.email, sub: user._id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    isServiceLoggedIn(user, service) {
        if (user[service.name.toLowerCase()]
            && user[service.name.toLowerCase()] != undefined
            && user[service.name.toLowerCase()].token
            && user[service.name.toLowerCase()].token != undefined
            && user[service.name.toLowerCase()].token != "fetching") {
            return true;
        }
        else if (googleServices.includes(service.name)
            && user['google']
            && user['google'] != undefined
            && user['google'].token
            && user['google'].token !== undefined
            && user['google'].token !== "fetching") {
            return true;
        }
        else if (nologinServices.includes(service.name)) {
            return true;
        }
        else {
            return false;
        }
    }
    async loggedInServices(user) {
        var result = [];
        var services = await this.serviceService.findAll();
        return await this.userService.findOne(user.userId).then((user) => {
            for (const service of services) {
                if (this.isServiceLoggedIn(user, service)) {
                    if (googleServices.includes(service.name)) {
                        result.push({
                            service: {
                                name: service.name,
                                logo: service.logo,
                                urlName: 'google'
                            },
                            loggedIn: true,
                            pseudo: user['google'].username
                        });
                    }
                    else if (!nologinServices.includes(service.name)) {
                        result.push({
                            service: {
                                name: service.name,
                                logo: service.logo,
                                urlName: service.name.toLowerCase()
                            },
                            loggedIn: true,
                            pseudo: user[service.name.toLowerCase()].username
                        });
                    }
                }
                else {
                    if (googleServices.includes(service.name)) {
                        result.push({
                            service: {
                                name: service.name,
                                logo: service.logo,
                                urlName: 'google'
                            },
                            loggedIn: false,
                            pseudo: undefined
                        });
                    }
                    else if (!nologinServices.includes(service.name)) {
                        result.push({
                            service: {
                                name: service.name,
                                logo: service.logo,
                                urlName: service.name.toLowerCase()
                            },
                            loggedIn: false,
                            pseudo: undefined
                        });
                    }
                }
            }
            return result;
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => service_service_1.ServiceService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        service_service_1.ServiceService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map