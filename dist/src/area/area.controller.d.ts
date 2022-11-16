import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
export declare class AreaController {
    private readonly service;
    constructor(service: AreaService);
    getAll(): Promise<import("./schemas/area.schema").Area[]>;
    getOne(id: string): Promise<import("./schemas/area.schema").Area>;
    putArea(id: string, updateAreaDto: UpdateAreaDto): Promise<import("./schemas/area.schema").Area>;
    createArea(createAreaDto: CreateAreaDto, req: any): Promise<import("./schemas/area.schema").Area>;
    delete(id: string): Promise<import("./schemas/area.schema").Area>;
}
