"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubModule = void 0;
const common_1 = require("@nestjs/common");
const github_controller_1 = require("./github.controller");
const github_service_1 = require("./github.service");
const area_module_1 = require("../../src/area/area.module");
const twitter_module_1 = require("../../src/twitter/twitter.module");
const user_module_1 = require("../../src/user/user.module");
const service_module_1 = require("../../src/service/service.module");
const area_handler_module_1 = require("../area-handler/area-handler.module");
const action_module_1 = require("../../src/action/action.module");
let GithubModule = class GithubModule {
};
GithubModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => area_module_1.AreaModule),
            twitter_module_1.TwitterModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            service_module_1.ServiceModule,
            area_handler_module_1.AreaHandlerModule,
            action_module_1.ActionModule
        ],
        controllers: [github_controller_1.GithubController],
        providers: [github_service_1.GithubService],
        exports: [github_service_1.GithubService]
    })
], GithubModule);
exports.GithubModule = GithubModule;
//# sourceMappingURL=github.module.js.map