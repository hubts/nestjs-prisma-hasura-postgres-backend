import {
    Controller,
    Get,
    Logger,
    OnApplicationBootstrap,
    Req,
} from "@nestjs/common";
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
export class HealthCheckController implements OnApplicationBootstrap {
    private readonly logger = new Logger("Healthy🔋");

    constructor(
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly database: TypeOrmHealthIndicator,
        private readonly memory: MemoryHealthIndicator
    ) {}

    async onApplicationBootstrap() {
        const status = await this.getStatus();
        const overview = status.overview ? "✅" : "🚫";
        const details = Object.keys(status.details).map(
            key => `${key} ( ${status.details[key] ? "✅" : `🚫`} )`
        );
        this.logger.log(`Result ( ${overview} ) => ${details.join(", ")}`);
    }

    async getStatus(): Promise<{
        overview: boolean;
        details: {
            [key: string]: boolean;
        };
    }> {
        const checkResult = await this.checkConnections();
        const details: {
            [key: string]: boolean;
        } = {};
        Object.keys(checkResult.details).map(key => {
            details[key] = checkResult.details[key].status === "up";
        });
        return {
            overview: checkResult.status === "ok",
            details,
        };
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
            () =>
                this.http.pingCheck("http", "https://google.com", {
                    timeout: 3000,
                }),
            () => this.database.pingCheck("database", { timeout: 3000 }),
            () => this.memory.checkHeap("heap-memory", 2 * 1024 * 1024 * 1024), // 2 GB
        ]);
    }
}
