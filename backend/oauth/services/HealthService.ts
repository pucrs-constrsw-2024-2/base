import { HealthResponseI } from "../models/health/HealthI";

export class HealthService {
  getHealth(): HealthResponseI {
    return {
      status: "UP",
      message: "Service is up and running",
      timestamp: new Date().toISOString(),
    };
  }
}
