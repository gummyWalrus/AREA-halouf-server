import { Model } from 'mongoose';
import { ServiceService } from '../../src/service/service.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { Reaction, ReactionDocument } from './schemas/reaction.schema';
export declare class ReactionService {
    private reactionModel;
    private serviceService;
    constructor(reactionModel: Model<ReactionDocument>, serviceService: ServiceService);
    create(createReactionDto: CreateReactionDto): Promise<Reaction>;
    update(id: string, updateReactionDto: UpdateReactionDto): Promise<Reaction>;
    delete(id: string): Promise<Reaction>;
    findOne(id: string): Promise<Reaction>;
    findAll(): Promise<Reaction[]>;
    deleteAll(): Promise<{
        msg: string;
    }>;
}
