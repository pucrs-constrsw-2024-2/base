import { Elysia } from "elysia";
import { controllers } from "./controllers";
import { SetupServiceLocator } from "./setup";

const app = new Elysia();

const setup = SetupServiceLocator.getInstance();
const swagger = await setup.useSwagger();

app
	.use(controllers)
	.use(swagger)
	.listen(Bun.env.PORT || 8080);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
