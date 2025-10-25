import conf from "../settings/conf";
import { Client, Account, ID } from "appwrite";

export class AppWriteService 
{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount;
        }catch (error) {
            throw error;
        }
    }
}

const appWriteService = new AppWriteService();
export default appWriteService;