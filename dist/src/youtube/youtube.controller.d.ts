import { YoutubeService } from './youtube.service';
import { Area } from "../area/schemas/area.schema";
export declare class YoutubeController {
    private readonly youtubeService;
    constructor(youtubeService: YoutubeService);
    upload(area: Area): Promise<void>;
}
