import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../src/auth/auth.service';
export declare class UserController {
    private readonly service;
    private readonly config;
    private readonly authService;
    constructor(service: UserService, config: ConfigService, authService: AuthService);
    get(req: any, res: any): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<{
        token: string;
        user: import("./schemas/user.schema").User;
    } | {
        msg: string;
    }>;
    update(req: any, updateUserDto: UpdateUserDto): Promise<import("./schemas/user.schema").User | {
        msg: string;
    }>;
    delete(req: any): Promise<import("./schemas/user.schema").User>;
}
