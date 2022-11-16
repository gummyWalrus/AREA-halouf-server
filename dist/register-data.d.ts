declare const axios: any;
declare class Service {
    constructor(name: string, logo: string);
    name: string;
    logo: string;
}
declare class Action {
    constructor(name: string, description: string, service: string, dataScheme: object);
    name: string;
    description: string;
    service: string;
    dataScheme: object;
}
declare class Reaction {
    constructor(name: string, description: string, service: string, dataScheme: object);
    name: string;
    description: string;
    service: string;
    dataScheme: object;
}
declare const url = "http://localhost:8080/";
declare const admin_token = "B8HUTQAESO5W9CMVTRYJ";
declare function registerService(data: Service): Promise<any>;
declare function registerAction(data: Action): Promise<any>;
declare function registerReaction(data: Reaction): Promise<any>;
declare function servTwitter(): Promise<void>;
declare function servGmail(): Promise<void>;
declare function servCalendar(): Promise<void>;
declare function servYoutube(): Promise<void>;
declare function servSMS(): Promise<void>;
declare function servTelegram(): Promise<void>;
declare function servDiscord(): Promise<void>;
declare function servGithub(): Promise<void>;
