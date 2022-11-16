"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const reaction_controller_1 = require("./reaction.controller");
const reaction_service_1 = require("./reaction.service");
const reaction_schema_1 = require("./schemas/reaction.schema");
const service_module_1 = require("../../src/service/service.module");
let ReactionModule = class ReactionModule {
};
ReactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: reaction_schema_1.Reaction.name, schema: reaction_schema_1.ReactionSchema }]),
            (0, common_1.forwardRef)(() => service_module_1.ServiceModule)
        ],
        controllers: [reaction_controller_1.ReactionController],
        providers: [reaction_service_1.ReactionService],
        exports: [reaction_service_1.ReactionService]
    })
], ReactionModule);
exports.ReactionModule = ReactionModule;
//# sourceMappingURL=reaction.module.js.map