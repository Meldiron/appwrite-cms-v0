import { Middleware } from "@nuxt/types";
import { AppwriteService } from "../services/appwrite";

const middleware: Middleware = async ({ redirect }) => {
    const isLoggedIn = await AppwriteService.isLogged();

    if (isLoggedIn) {
        // OK
    } else {
        return redirect("/login");
    }
}

export default middleware;