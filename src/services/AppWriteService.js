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
                    await this.logout();
                    return null;
                }
                return currentUser;
            }
        } catch (error) {
            return null;
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

    async createPost({ title, content, featured_image, user_id, author_name }) {
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
                    user_id,
                    author_name
                }
            );

            return post;
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    async getArticles(queries = [Query.equal("status", "active")]) {
        try {
            const finalQueries = [
                ...queries,
                Query.limit(10),
                Query.orderDesc("$updatedAt")
            ];
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                finalQueries
            )
        } catch (error) {
            throw error;
        }
    }

    async getArticle(id){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const appWriteService = new AppWriteService();
export default appWriteService;