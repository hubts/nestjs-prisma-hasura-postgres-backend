import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto, UsersDto } from "./user.dto";
import { CreateUserDto, UpdateUserDto } from "./dto";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<UsersDto> {
        return {
            users: await this.userService.findAll(),
        };
    }

    @Get(":id")
    async getUserById(@Param("id") id: string): Promise<UserDto> {
        return {
            user: await this.userService.findOneById(id),
        };
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        return {
            user: await this.userService.create(createUserDto),
        };
    }

    @Patch(":id")
    async updateUser(
        @Param("id") id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UserDto> {
        return {
            user: await this.userService.update(id, updateUserDto),
        };
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<UserDto> {
        return {
            user: await this.userService.delete(id),
        };
    }
}
