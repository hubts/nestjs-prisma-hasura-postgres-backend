import { Controller, Get, Logger, OnModuleInit } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
    TypeOrmHealthIndicator,
    HealthIndicatorResult,
} from "@nestjs/terminus";

@ApiTags("HealthCheck")
@Controller("health")
export class HealthCheckController implements OnModuleInit {
    private readonly logger = new Logger("Healthy");

    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private database: TypeOrmHealthIndicator
    ) {}

    async onModuleInit() {
        const checkResult = await this.check();
        switch (checkResult.status) {
            case "ok": {
                const details = checkResult.details as HealthIndicatorResult;
                const log = `🔔 Nice! ${JSON.stringify(details)}`;
                this.logger.log(log);
                break;
            }
            case "shutting_down":
            case "error": {
                const details = checkResult.details as HealthIndicatorResult;
                const errors = checkResult.error as HealthIndicatorResult;
                const log = `🚫 OMG! ${JSON.stringify(
                    details
                )}: ${JSON.stringify(errors)}`;
                this.logger.error(log);
                break;
            }
        }
    }

    @Get()
    @HealthCheck()
    @ApiOperation({
        summary: "Check health of other infrastructures.",
    })
    async check() {
        return await this.health.check([
            () => this.http.pingCheck("http", "https://google.com"),
            () => this.database.pingCheck("database", { timeout: 30000 }),
        ]);
    }
}
