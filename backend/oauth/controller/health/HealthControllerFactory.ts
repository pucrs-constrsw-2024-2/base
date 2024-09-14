import { HealthService } from "../../services/HealthService";
import { HealthController } from "./HealthController";

export class HealthControllerFactory {
  static create(): HealthController {
    const healthService = new HealthService();

    return new HealthController(healthService);
  }
}
