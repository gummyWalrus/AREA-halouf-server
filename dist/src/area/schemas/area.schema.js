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
exports.AreaSchema = exports.Area = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const action_schema_1 = require("../../../src/action/schemas/action.schema");
const reaction_schema_1 = require("../../../src/reaction/schemas/reaction.schema");
const user_schema_1 = require("../../../src/user/schemas/user.schema");
const class_transformer_1 = require("class-transformer");
let Area = class Area extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Area.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Area.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'User' }),
    (0, class_transformer_1.Type)(() => user_schema_1.User),
    __metadata("design:type", user_schema_1.User)
], Area.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        id: { type: mongoose_2.Types.ObjectId, ref: action_schema_1.Action.name },
        data: { type: Object }
    })),
    __metadata("design:type", Object)
], Area.prototype, "action", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        id: { type: mongoose_2.Types.ObjectId, ref: reaction_schema_1.Reaction.name },
        data: { type: Object }
    })),
    __metadata("design:type", Object)
], Area.prototype, "reaction", void 0);
Area = __decorate([
    (0, mongoose_1.Schema)()
], Area);
exports.Area = Area;
exports.AreaSchema = mongoose_1.SchemaFactory.createForClass(Area);
//# sourceMappingURL=area.schema.js.map