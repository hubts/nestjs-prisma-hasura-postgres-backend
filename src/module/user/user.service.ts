import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { Bcrypt } from "@shared/util";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, name, age } = createUserDto;

        const existingUser = await this.userRepo.findOneBy({ email });
        if (existingUser) {
            throw new BadRequestException("User email duplicated");
        }

        const newUser = this.userRepo.create({
            email,
            password: Bcrypt.hash(password),
            name,
            age,
        });

        let savedUser: User;
        try {
            savedUser = await this.userRepo.save(newUser);
        } catch (error) {
            throw new InternalServerErrorException(`SaveError: ${error}`);
        }

        return savedUser;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const { name, age } = updateUserDto;

        const existingUser = await this.findOneById(id);
        existingUser.name = name;
        existingUser.age = age;

        try {
            await this.userRepo.update(id, existingUser);
        } catch (error) {
            throw new InternalServerErrorException(`UpdateError: ${error}`);
        }

        const updatedUser = await this.findOneById(id);
        return updatedUser;
    }

    async findOneById(id: string): Promise<User> {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepo.find();
    }

    async delete(id: string): Promise<User> {
        const existingUser = await this.findOneById(id);

        try {
            await this.userRepo.delete(id);
        } catch (error) {
            throw new InternalServerErrorException(`DeleteError: ${error}`);
        }

        return existingUser;
    }
}
