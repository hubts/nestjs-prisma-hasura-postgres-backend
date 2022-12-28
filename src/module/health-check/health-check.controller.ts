import { Controller, Get, Logger, OnModuleInit } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
    TypeOrmHealthIndicator,
} from "@nestjs/terminus";

@ApiTags("HealthCheck")
@Controller("health")
export class HealthCheckController implements OnModuleInit {
    private readonly logger = new Logger("📢 HealthCheck");

    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private database: TypeOrmHealthIndicator
    ) {}

    async onModuleInit() {
        const checkResult = await this.check();
        if (checkResult.status === "ok") {
            Object.keys(checkResult.info).map(key =>
                console.log(`${key}: ${JSON.stringify(checkResult.info[key])}`)
            );
        } else {
            Object.keys(checkResult.error).map(key =>
                console.log(`${key}: ${JSON.stringify(checkResult.error[key])}`)
            );
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
            () => this.database.pingCheck("database", { timeout: 1500 }),
        ]);
    }
}
