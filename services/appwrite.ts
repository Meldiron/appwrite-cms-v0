import { ConfigType } from "~/store/config";
import { Appwrite, Models } from "meldiron-console-appwrite";

// @ts-ignore Because middleware sets this and noone ever loads data before middleware fills it
let config: ConfigType = null;
// @ts-ignore Because middleware sets this and noone ever loads data before middleware fills it
let appwrite: Appwrite = null;

export const AppwriteService = {
    getAppwrite() {
        return appwrite;
    },

    init(newConfig: ConfigType) {
        config = newConfig;

        if (!config.appwrite.endpoint || !config.appwrite.projectId) {
            alert("Endpoint or ProjectID not found! Please add Appwrite configuration into your config.json. AppwriteCMS will not work properly!")
            return;
        }

        appwrite = new Appwrite();

        appwrite
            .setEndpoint(config.appwrite.endpoint)
            .setProject("console")
    },

    async createDocument(collectionId: string, dataObject: any): Promise<boolean> {
        try {
            // TODO: Allow cusotm ID, allow custon read&write permissions
            await appwrite.database.createDocument(collectionId, "unique()", dataObject, [], [])

            return true;
        } catch (err: any) {
            alert(err.message);
            return false
        }
    },


    async updateDocument(collectionId: string, documentId: string, dataObject: any): Promise<boolean> {
        try {
            // TODO: allow custon read&write permissions
            await appwrite.database.updateDocument(collectionId, documentId, dataObject, [], [])

            return true;
        } catch (err: any) {
            alert(err.message);
            return false
        }
    },

    async login(email: string, password: string): Promise<boolean> {
        try {
            await appwrite.account.createSession(email, password);
            await this.isLogged();
            return true;
        } catch (err: any) {
            alert(err.message);
            return false;
        }
    },

    async logout(): Promise<boolean> {
        try {
            await appwrite.account.deleteSession("current");

            return true;
        } catch (err: any) {
            alert(err.message);
            return false;
        }
    },

    async isLogged(): Promise<boolean> {
        try {
            await appwrite.account.get();
            appwrite.setProject(config.appwrite.projectId).setMode("admin")
            return true;
        }
        catch (err: any) {
            appwrite.setProject("console").setMode("");
            return false;
        }
    },

    async getDocument(collectionId: string, documentId: string): Promise<any & Models.Document> {
        return await appwrite.database.getDocument(collectionId, documentId);
    },

    previewFile(fileId: string): URL {
        return appwrite.storage.getFilePreview(fileId, 500, undefined, "center", undefined, undefined, undefined, undefined, undefined, undefined, undefined, "webp")
    }
}