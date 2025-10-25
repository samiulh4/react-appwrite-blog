import conf from "../settings/conf";
import { Client, Account, ID, Storage, Databases, Query } from "appwrite";

export class AppWriteService {
    client = new Client();
    account;
    storage;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.storage = new Storage(this.client);
        this.databases = new Databases(this.client);
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

    async createPost({ title, content, featured_image, user_id }) {
        try {
            let imageId = null;
            /*if (featured_image) {
                const uploadedFile = await this.storage.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    featured_image
                );
                imageId = uploadedFile.$id;
            }*/
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featured_image: imageId,
                    user_id
                }
            );

            return post;
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.error("AppWriteService :: getPosts :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const appWriteService = new AppWriteService();
export default appWriteService;