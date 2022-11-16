import { Service, ServiceDocument } from './schemas/service.schema';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ActionService } from '../../src/action/action.service';
import { ReactionService } from '../../src/reaction/reaction.service';
import { AuthService } from '../../src/auth/auth.service';
import { DiscordService } from '../../src/discord/discord.service';
export declare class ServiceService {
    private serviceModel;
    private actionService;
    private reactionService;
    private authService;
    private discord;
    constructor(serviceModel: Model<ServiceDocument>, actionService: ActionService, reactionService: ReactionService, authService: AuthService, discord: DiscordService);
    create(createServiceDto: CreateServiceDto): Promise<Service>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service>;
    delete(id: string): Promise<Service>;
    deleteAll(): Promise<{
        msg: string;
    }>;
    findOneQuick(id: string): Promise<Service>;
    findOne(id: string, user_id: string): Promise<Service>;
    findAll(): Promise<Service[]>;
    addAction(id: string, action_id: string): Promise<Service>;
    removeAction(id: string, action_id: string): Promise<Service>;
    addReaction(id: string, reaction_id: string): Promise<Service>;
    removeReaction(id: string, reaction_id: string): Promise<Service>;
    findActionServices(req: any): Promise<Service[]>;
    findReactionServices(req: any): Promise<Service[]>;
}
