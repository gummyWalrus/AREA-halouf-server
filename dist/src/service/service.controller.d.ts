import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServiceController {
    private readonly service;
    constructor(service: ServiceService);
    getServicesWithActions(req: any): Promise<import("./schemas/service.schema").Service[]>;
    getServicesWithReactions(req: any): Promise<import("./schemas/service.schema").Service[]>;
    getService(req: any, id: string): Promise<import("./schemas/service.schema").Service>;
    getAll(): Promise<import("./schemas/service.schema").Service[]>;
    putService(id: string, updateServiceDto: UpdateServiceDto): Promise<import("./schemas/service.schema").Service>;
    deleteAll(): Promise<{
        msg: string;
    }>;
    deleteService(id: string): Promise<import("./schemas/service.schema").Service>;
    createService(createServiceDto: CreateServiceDto): Promise<import("./schemas/service.schema").Service>;
}
