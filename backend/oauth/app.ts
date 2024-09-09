import { envs } from "./config/env";
import { AppRoutes } from "./routes/app.routes";
import { Server } from "./server";

const main = async () => {
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
};

(() => {
  main();
})();
