import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ManyUsersDto, OneUserDto } from "./user.dto";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({
        summary: "Get all users without any options",
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Users are found",
        type: ManyUsersDto,
    })
    async getAllUsers(): Promise<ManyUsersDto> {
        return {
            users: await this.userService.findAll(),
        };
    }

    @ApiOperation({
        summary: "Get a user by ID",
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "User found",
        type: OneUserDto,
    })
    @Get(":id")
    async getUserById(@Param("id") id: string): Promise<OneUserDto> {
        return {
            user: await this.userService.findOneById(id),
        };
    }

    @ApiOperation({
        summary: "Create a new user",
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "User created",
        type: OneUserDto,
    })
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<OneUserDto> {
        return {
            user: await this.userService.create(createUserDto),
        };
    }

    @ApiOperation({
        summary: "Update the existing user",
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "User updated",
        type: OneUserDto,
    })
    @Patch(":id")
    async updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<OneUserDto> {
        return {
            user: await this.userService.update(id, updateUserDto),
        };
    }

    @ApiOperation({
        summary: "Delete the existing user",
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "User deleted",
        type: OneUserDto,
    })
    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<OneUserDto> {
        return {
            user: await this.userService.delete(id),
        };
    }
}
