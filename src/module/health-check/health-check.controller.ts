import { Controller, Get, Logger, OnModuleInit, Req } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
    TypeOrmHealthIndicator,
    MemoryHealthIndicator,
} from "@nestjs/terminus";

@ApiTags("HealthCheck")
@Controller("health")
export class HealthCheckController implements OnModuleInit {
    private readonly logger = new Logger("Healthy🔋");

    constructor(
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly database: TypeOrmHealthIndicator,
        private readonly memory: MemoryHealthIndicator
    ) {}

    async onModuleInit() {
        const checkResult = await this.checkConnections();
        const overview = checkResult.status === "ok" ? "✅" : "🚫";
        const details = Object.keys(checkResult.details).map(
            key =>
                `${key} ( ${
                    checkResult.details[key].status === "up" ? "✅" : `🚫`
                } )`
        );
        this.logger.verbose(`Result ( ${overview} ) => ${details.join(", ")}`);
        if (checkResult.error && Object.keys(checkResult.error).length !== 0) {
            this.logger.error(`Error: ${JSON.stringify(checkResult.error)}`);
        }
    }

    @Get()
    @ApiOperation({
        summary: "Knocking to Check request headers and server settings",
    })
    knock(@Req() req: Request) {
        return {
            message: `[${new Date().toISOString()}] Who's there?`,
            headers: req.headers,
        };
    }

    @Get("connections")
    @HealthCheck()
    @ApiOperation({
        summary: "Check health of other infrastructures.",
    })
    async checkConnections() {
        return await this.health.check([
            () => this.http.pingCheck("http", "https://google.com"),
            () => this.database.pingCheck("database", { timeout: 5000 }),
            () => this.memory.checkHeap("heap-memory", 2 * 1024 * 1024 * 1024), // 2 GB
        ]);
    }
}
