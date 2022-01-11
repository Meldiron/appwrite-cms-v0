import { ConfigType } from "~/store/config";
import { Client, Database, Storage, Models } from "node-appwrite";

// @ts-ignore Because middleware sets this and noone ever loads data before middleware fills it
let config: ConfigType = null;
// @ts-ignore Because middleware sets this and noone ever loads data before middleware fills it
let appwrite: Client = null;

export const AppwriteService = {
    getAppwrite() {
        return appwrite;
    },

    _db() {
        return new Database(this.getAppwrite());
    },
    _file() {
        return new Storage(this.getAppwrite());
    },

    init(newConfig: ConfigType) {
        config = newConfig;

        if (!config.appwrite.endpoint || !config.appwrite.projectId) {
            alert("Endpoint or ProjectID not found! Please add Appwrite configuration into your config.json. AppwriteCMS will not work properly!")
            return;
        }

        appwrite = new Client();
        appwrite
            .setEndpoint(config.appwrite.endpoint)
            .setProject(config.appwrite.projectId)
            .setKey(localStorage.getItem("API_KEY") || "INVALID_KEY");
    },

    async createDocument(collectionId: string, dataObject: any): Promise<boolean> {
        try {
            // TODO: Allow cusotm ID, allow custon read&write permissions
            await this._db().createDocument(collectionId, "unique()", dataObject, [], [])

            return true;
        } catch (err: any) {
            alert(err.message);
            return false
        }
    },


    async updateDocument(collectionId: string, documentId: string, dataObject: any): Promise<boolean> {
        try {
            // TODO: allow custon read&write permissions
            await this._db().updateDocument(collectionId, documentId, dataObject, [], [])

            return true;
        } catch (err: any) {
            alert(err.message);
            return false
        }
    },

    async login(apiKey: string): Promise<boolean> {
        try {
            appwrite.setKey(apiKey);
            localStorage.setItem("API_KEY", apiKey);
            await this.isLogged(true);
            return true;
        } catch (err: any) {
            alert(err.message);
            return false;
        }
    },

    async logout(): Promise<boolean> {
        try {
            appwrite.setKey("INVALID_KEY");
            localStorage.setItem("API_KEY", "INVALID_KEY");
            return true;
        } catch (err: any) {
            alert(err.message);
            return false;
        }
    },

    async isLogged(throwError = false): Promise<boolean> {
        try {
            await this._db().listCollections();
            return true;
        }
        catch (err: any) {
            if (throwError) {
                alert(err.message);
            }
            return false;
        }
    },

    async getDocument(collectionId: string, documentId: string): Promise<any & Models.Document> {
        return await this._db().getDocument(collectionId, documentId);
    },

    previewFile(fileId: string): URL {
        // TODO: URL
        return new URL("http://google.com/");
        // return this._file().getFilePreview(fileId, 500, undefined, "center", undefined, undefined, undefined, undefined, undefined, undefined, undefined, "webp")
    }
}