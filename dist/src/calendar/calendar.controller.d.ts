import { CalendarService } from './calendar.service';
import { Area } from "../area/schemas/area.schema";
export declare class CalendarController {
    private readonly calendarService;
    constructor(calendarService: CalendarService);
    create(area: Area): Promise<void>;
}
