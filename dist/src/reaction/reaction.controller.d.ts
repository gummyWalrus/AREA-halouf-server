import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
export declare class ReactionController {
    private readonly service;
    constructor(service: ReactionService);
    getAll(): Promise<import("./schemas/reaction.schema").Reaction[]>;
    getOne(id: string): Promise<import("./schemas/reaction.schema").Reaction>;
    putReaction(id: string, updateReactionDto: UpdateReactionDto): Promise<import("./schemas/reaction.schema").Reaction>;
    createReaction(createReactionDto: CreateReactionDto): Promise<import("./schemas/reaction.schema").Reaction>;
    deleteAll(): Promise<{
        msg: string;
    }>;
    delete(id: string): Promise<import("./schemas/reaction.schema").Reaction>;
}
