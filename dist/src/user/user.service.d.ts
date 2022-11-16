import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AreaService } from '../../src/area/area.service';
export declare class UserService {
    private readonly userModel;
    private areaService;
    constructor(userModel: Model<UserDocument>, areaService: AreaService);
    all(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<User>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User[]>;
    addArea(id: string, area_id: string): Promise<User>;
    removeArea(id: string, area_id: string): Promise<User>;
    findByGoogleEmail(email: string): Promise<User[]>;
    findByGithubUsername(username: string): Promise<User[]>;
    findByDiscordUsername(username: string): Promise<User[]>;
}
