import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(readonly appService: AppService) {}
}
