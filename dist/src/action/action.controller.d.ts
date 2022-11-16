import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
export declare class ActionController {
    private readonly service;
    constructor(service: ActionService);
    getAll(): Promise<import("./schemas/action.schema").Action[]>;
    getOne(id: string): Promise<import("./schemas/action.schema").Action>;
    putAction(id: string, updateActionDto: UpdateActionDto): Promise<import("./schemas/action.schema").Action>;
    createAction(createActionDto: CreateActionDto): Promise<import("./schemas/action.schema").Action>;
    deleteAll(): Promise<{
        msg: string;
    }>;
    delete(id: string): Promise<import("./schemas/action.schema").Action>;
}
