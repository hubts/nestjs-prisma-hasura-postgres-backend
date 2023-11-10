import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "../service";
import { UserRoute, UserRouteName } from "./user.route";
import {
    CreateUserInputDto,
    FindUserOneDto,
    FindUsersDto,
    UpdateUserInputDto,
    UserIdDto,
} from "./dto";

@Controller(UserRouteName)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(UserRoute.GetUsersAll)
    async getUsersAll(): Promise<FindUsersDto> {
        return await this.userService.getUsersAll();
    }

    @Get(UserRoute.GetUserOneByEmail)
    async getUserOneByEmail(
        @Param("email") email: string
    ): Promise<FindUserOneDto> {
        return await this.userService.getUserOneByEmail(email);
    }

    @Post(UserRoute.JoinUser)
    async joinUser(@Body() body: CreateUserInputDto): Promise<UserIdDto> {
        return await this.userService.createUser(body);
    }

    @Post(UserRoute.UpdateUser)
    async updateUser(
        @Param("id") id: string,
        @Body() body: UpdateUserInputDto
    ): Promise<UserIdDto> {
        return await this.userService.updateUser(id, body);
    }

    @Post(UserRoute.DeleteUser)
    async deleteUser(@Param("id") id: string): Promise<void> {
        await this.userService.deleteUser(id);
    }
}
