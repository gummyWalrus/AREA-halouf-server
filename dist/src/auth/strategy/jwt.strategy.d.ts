import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private config;
    private user;
    constructor(config: ConfigService, user: UserService);
    validate(payload: any): Promise<import("../../user/schemas/user.schema").User>;
}
export {};
