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
    MemoryHealthIndicator,
    PrismaHealthIndicator,
} from "@nestjs/terminus";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

@ApiTags("HealthCheck")
@Controller("health")
export class HealthCheckController implements OnApplicationBootstrap {
    private readonly logger = new Logger("Healthy🔋");
    private readonly httpTestLink = "https://google.com";

    constructor(
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly memory: MemoryHealthIndicator,
        private readonly prisma: PrismaHealthIndicator,
        private readonly prismaService: PrismaService
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
        summary: "Knocking to Check request headers and server setting.",
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
                this.http.pingCheck("http", this.httpTestLink, {
                    timeout: 3000,
                }),
            () => this.prisma.pingCheck("prisma", this.prismaService),
            () => this.memory.checkHeap("heap-memory", 2 * 1024 * 1024 * 1024), // 2 GB
        ]);
    }
}
