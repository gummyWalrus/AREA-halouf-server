import { ServiceService } from './service/service.service';
export declare class AppService {
    private readonly service;
    constructor(service: ServiceService);
    getHello(): string;
    getAboutJson(host: string): Promise<object>;
}
