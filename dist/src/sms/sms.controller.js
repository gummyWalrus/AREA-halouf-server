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
exports.SmsController = void 0;
const common_1 = require("@nestjs/common");
const sms_service_1 = require("./sms.service");
const area_schema_1 = require("../area/schemas/area.schema");
let SmsController = class SmsController {
    constructor(smsService) {
        this.smsService = smsService;
    }
    create(area) {
        return this.smsService.sendSMS(area);
    }
    check() {
        return this.smsService.check();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_schema_1.Area]),
    __metadata("design:returntype", void 0)
], SmsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SmsController.prototype, "check", null);
SmsController = __decorate([
    (0, common_1.Controller)('sms'),
    __metadata("design:paramtypes", [sms_service_1.SmsService])
], SmsController);
exports.SmsController = SmsController;
//# sourceMappingURL=sms.controller.js.map