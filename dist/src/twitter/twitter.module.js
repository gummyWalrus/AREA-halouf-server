"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterModule = void 0;
const common_1 = require("@nestjs/common");
const twitter_service_1 = require("./twitter.service");
const twitter_controller_1 = require("./twitter.controller");
const auth_module_1 = require("../../src/auth/auth.module");
const user_module_1 = require("../../src/user/user.module");
let TwitterModule = class TwitterModule {
};
TwitterModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, (0, common_1.forwardRef)(() => user_module_1.UserModule)],
        controllers: [twitter_controller_1.TwitterController],
        providers: [twitter_service_1.TwitterService],
        exports: [twitter_service_1.TwitterService]
    })
], TwitterModule);
exports.TwitterModule = TwitterModule;
//# sourceMappingURL=twitter.module.js.map