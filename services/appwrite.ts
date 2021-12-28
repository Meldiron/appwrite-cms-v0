import { ConfigType } from "~/store/config";
import { Appwrite } from "appwrite";

// @ts-ignore Because middleware sets this and noone ever loads data before middleware fills it
let config: ConfigType = null;
// @ts-ignore Because middleware sets this and noone ever loads data before middleware fills it
let appwrite: Appwrite = null;

export const AppwriteService = {
    init(newConfig: ConfigType) {
        config = newConfig;

        appwrite = new Appwrite();

        appwrite
            .setEndpoint(config.appwrite.endpoint)
            .setProject(config.appwrite.projectId);
    },

    async login(email: string, password: string): Promise<boolean> {
        try {
            await appwrite.account.createSession(email, password);
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
            return true;
        }
        catch (err: any) {
            return false;
        }
    }
}