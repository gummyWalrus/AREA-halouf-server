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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const service_service_1 = require("./service/service.service");
let AppService = class AppService {
    constructor(service) {
        this.service = service;
    }
    getHello() {
        return 'Hello World!';
    }
    async getAboutJson(host) {
        let json = {
            client: {
                host: host.substring(7)
            },
            server: {
                current_time: new Date().getTime(),
                services: []
            }
        };
        return await this.service.findAll().then((services) => {
            for (const service of services) {
                let jsonService = {
                    name: service.name,
                    actions: [],
                    reactions: []
                };
                for (const action of service.actions) {
                    jsonService.actions.push({
                        name: action.name,
                        description: action.description
                    });
                }
                for (const reaction of service.reactions) {
                    jsonService.reactions.push({
                        name: reaction.name,
                        description: reaction.description
                    });
                }
                json.server.services.push(jsonService);
            }
            return json;
        });
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map