import { UserService } from '../../src/user/user.service';
import { JwtService } from "@nestjs/jwt";
import { ServiceService } from '../../src/service/service.service';
import { User } from '../../src/user/schemas/user.schema';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly serviceService;
    constructor(userService: UserService, jwtService: JwtService, serviceService: ServiceService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: User): Promise<{
        token: string;
    }>;
    isServiceLoggedIn(user: any, service: any): boolean;
    loggedInServices(user: any): Promise<any[]>;
}
