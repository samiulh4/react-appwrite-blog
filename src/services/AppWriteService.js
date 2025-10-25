import conf from "../settings/conf";
import { Client, Account, ID } from "appwrite";

export class AppWriteService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const currentUser = await this.account.get();
            console.log("Appwrite service :: getCurrentUser :: currentUser", currentUser);
            if (currentUser) {
                if (!currentUser.emailVerification && !currentUser.phoneVerification) {
                    //throw new Error("Email or phone not verified. Please contact the admin.");
                    await this.logout();
                    return null;
                }
                return currentUser;
            }
        } catch (error) {
            //throw error;
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const appWriteService = new AppWriteService();
export default appWriteService;