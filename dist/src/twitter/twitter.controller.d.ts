import { TwitterService } from './twitter.service';
import { CreateTwitterDto } from './dto/create-twitter.dto';
export declare class TwitterController {
    private readonly twitterService;
    constructor(twitterService: TwitterService);
    create(createTwitterDto: CreateTwitterDto): Promise<{
        message: string;
        status: number;
    }>;
    remove(id: string): Promise<any>;
}
