import swagger from "@elysiajs/swagger";
import Elysia from "elysia";

export class SetupServiceLocator {
	private static instance: SetupServiceLocator;

	private constructor() {}

	public static getInstance(): SetupServiceLocator {
		if (!SetupServiceLocator.instance) {
			SetupServiceLocator.instance = new SetupServiceLocator();
		}

		return SetupServiceLocator.instance;
	}

	public async useSwagger(): Promise<Elysia> {
		return new Elysia().use(swagger);
	}
}
