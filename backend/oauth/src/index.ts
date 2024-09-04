import { Elysia } from "elysia";
import { controllers } from "./controllers";

const app = new Elysia();

app.use(controllers).listen(Bun.env.PORT || 8080);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
