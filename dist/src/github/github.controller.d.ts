import { GithubService } from './github.service';
import { IDeleteRepo, IDeleteRepoOrg, INewRepo, INewRepoOrg, IRepo, IUpdateRepo, IUpdateRepoOrg } from './interface/repos.interface';
export declare class GithubController {
    private readonly githubService;
    constructor(githubService: GithubService);
    getHello(): string;
    listOrgs(): Promise<any>;
    listAllRepo(): Promise<IRepo[]>;
    createRepo(body: INewRepo): Promise<any>;
    updateRepo(body: IUpdateRepo): Promise<any>;
    deleteRepo(body: IDeleteRepo): Promise<any>;
    createRepoFromOrg(body: INewRepoOrg): Promise<any>;
    updateRepoFromOrg(body: IUpdateRepoOrg): Promise<any>;
    deleteRepoFromOrg(body: IDeleteRepoOrg): Promise<any>;
    webhook(req: any): Promise<any>;
}
