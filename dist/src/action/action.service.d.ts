import { Model } from 'mongoose';
import { ServiceService } from '../../src/service/service.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Action, ActionDocument } from './schemas/action.schema';
export declare class ActionService {
    private actionModel;
    private serviceService;
    constructor(actionModel: Model<ActionDocument>, serviceService: ServiceService);
    create(createActionDto: CreateActionDto): Promise<Action>;
    update(id: string, updateActionDto: UpdateActionDto): Promise<Action>;
    delete(id: string): Promise<Action>;
    deleteAll(): Promise<{
        msg: string;
    }>;
    findOne(id: string): Promise<Action>;
    findAll(): Promise<Action[]>;
}
