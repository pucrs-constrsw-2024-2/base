import { HealthService } from "../../services/HealthService";
import { Get, Route, Tags } from "tsoa";

@Route("health")
@Tags("Health")
export class HealthController {
  constructor(private healthService: HealthService) {
    this.getHealth = this.getHealth.bind(this);
  }

  /**
   * Retorna o status atual da aplicação.
   * 
   * @returns Health
   */
  @Get()
  async getHealth() {
    const health = await this.healthService.getHealth();
    return health;
  }
}
