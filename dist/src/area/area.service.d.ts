import { Model } from 'mongoose';
import { Area, AreaDocument } from './schemas/area.schema';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { UserService } from '../../src/user/user.service';
import { ReactionService } from '../../src/reaction/reaction.service';
import { ActionService } from '../../src/action/action.service';
import { GithubService } from '../../src/github/github.service';
export declare class AreaService {
    private areaModel;
    private userService;
    private readonly actionService;
    private readonly reactionService;
    private githubService;
    constructor(areaModel: Model<AreaDocument>, userService: UserService, actionService: ActionService, reactionService: ReactionService, githubService: GithubService);
    create(uid: string, createAreaDto: CreateAreaDto): Promise<Area>;
    update(id: string, updateAreaDto: UpdateAreaDto): Promise<Area>;
    delete(id: string): Promise<Area>;
    findOne(id: string): Promise<Area>;
    findAll(): Promise<Area[]>;
}
