import { Request, Response } from "express";
import { HealthService } from "../../services/HealthService";
import { Get, Route } from "tsoa";

@Route("health")
export class HealthController {
  constructor(private healthService: HealthService) {
    this.getHealth = this.getHealth.bind(this);
  }

  @Get()
  async getHealth(req: Request, res: Response) {
    const health = await this.healthService.getHealth();
    res.status(200).json(health);
  }
}
