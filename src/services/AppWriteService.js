import conf from "../settings/conf";
import { Client, Account, ID, Storage, Databases, Query, Avatars } from "appwrite";
import { processImage } from "../utils/imageUtils";

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
                // Get user preferences including avatar
                try {
                    const prefs = await this.account.getPrefs();
                    return { ...currentUser, prefs };
                } catch (error) {
                    return currentUser;
                }
            }
        } catch (error) {
            return null;
        }
        return null;
    }

    async updateUserPrefs(prefs) {
        try {
            return await this.account.updatePrefs(prefs);
        } catch (error) {
            throw error;
        }
    }

    async updatePhone(phone, password) {
        try {
            return await this.account.updatePhone(phone, password);
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    async createPost({ title, content, featured_image, user_id, author_name, author_avatar_id }) {
        try {
            let imageId = null;
            if (featured_image) {
                // Process the image before upload
                const processedImage = await processImage(featured_image, 300);
                const uploadedFile = await this.storage.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    processedImage
                );
                imageId = uploadedFile.$id;
            }
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featured_image: imageId,
                    user_id,
                    author_name,
                    author_avatar_id
                }
            );

            return post;
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    async getArticle(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.error("Error getting article:", error);
            throw error;
        }
    }

    async updateArticle(id, { title, content, featured_image, user_id, author_name, author_avatar_id }) {
        try {
            let imageId = null;

            // First get the current article to check its image
            const currentArticle = await this.getArticle(id);
            const currentImageId = currentArticle.featured_image;

            if (featured_image && typeof featured_image !== 'string') {
                // Process and upload new image
                const processedImage = await processImage(featured_image, 300);
                const uploadedFile = await this.storage.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    processedImage
                );
                imageId = uploadedFile.$id;

                // Delete the previous image if it exists
                if (currentImageId) {
                    try {
                        await this.storage.deleteFile(conf.appwriteBucketId, currentImageId);
                    } catch (error) {
                        console.warn("Failed to delete previous image:", error);
                    }
                }
            } else {
                imageId = featured_image; // Keep existing image ID
            }

            const post = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    content,
                    featured_image: imageId,
                    user_id,
                    author_name,
                    author_avatar_id
                }
            );

            return post;
        } catch (error) {
            throw error;
        }
    }

    async getArticles(queries = [Query.equal("status", "active")]) {
        try {
            const finalQueries = [
                ...queries,
                Query.limit(10),
                Query.orderDesc("$createdAt")
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

    async getArticle(id) {
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

    // This method work on paid plan
    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    getFileView(fileId) {
        if (!fileId) return null;
        return this.storage.getFileView(conf.appwriteBucketId, fileId);
    }

    // Generate avatar (from initials or email)
    getAvatar(emailOrName) {
        try {
            const avatars = new Avatars(this.client);
            return avatars.getInitials(emailOrName).href;
        } catch (error) {
            return null;
        }
    }

    // Update user's name
    async updateName(name) {
        try {
            return await this.account.updateName(name);
        } catch (error) {
            throw error;
        }
    }

    // Upload avatar and store in user prefs
    async updateAvatar(file) {
        try {
            const prefs = await this.account.getPrefs();
            const previousAvatarId = prefs.avatarId;

            const uploaded = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );

            await this.account.updatePrefs({
                avatarId: uploaded.$id
            });

            if (previousAvatarId) {
                try {
                    await this.storage.deleteFile(conf.appwriteBucketId, previousAvatarId);
                    console.log("Old avatar deleted successfully");
                } catch (err) {
                    console.warn("Failed to delete previous avatar:", err);
                }
            }

            return uploaded;
        } catch (error) {
            throw error;
        }
    }


}

const appWriteService = new AppWriteService();
export default appWriteService;