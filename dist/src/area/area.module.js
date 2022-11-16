"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const area_schema_1 = require("./schemas/area.schema");
const area_controller_1 = require("./area.controller");
const area_service_1 = require("./area.service");
const user_module_1 = require("../../src/user/user.module");
const action_module_1 = require("../../src/action/action.module");
const reaction_module_1 = require("../../src/reaction/reaction.module");
const github_module_1 = require("../../src/github/github.module");
let AreaModule = class AreaModule {
};
AreaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: area_schema_1.Area.name, schema: area_schema_1.AreaSchema }]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            action_module_1.ActionModule,
            reaction_module_1.ReactionModule,
            (0, common_1.forwardRef)(() => github_module_1.GithubModule)
        ],
        controllers: [area_controller_1.AreaController],
        providers: [area_service_1.AreaService],
        exports: [area_service_1.AreaService]
    })
], AreaModule);
exports.AreaModule = AreaModule;
//# sourceMappingURL=area.module.js.map