import { cors } from "@elysiajs/cors";
import Elysia from "elysia";
import { health } from "./health";

export const controllers = new Elysia({ prefix: "/api" })
	.onAfterHandle(({ request, set }) => {
		// Only process CORS requests
		if (request.method !== "OPTIONS") return;

		const allowHeader = set.headers["Access-Control-Allow-Headers"];
		if (allowHeader === "*") {
			set.headers["Access-Control-Allow-Headers"] =
				request.headers.get("Access-Control-Request-Headers") ?? "";
		}
	})
	.use(
		cors({
			methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
		}),
	)
	.use(health);
