import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { DataSource, Repository } from "typeorm";
import request from "supertest";

import { AppModule } from "src/app.module";
import { UserRole } from "src/shared/enum";
import { Random } from "src/shared/util";
import { IUser } from "src/shared/entity";
import { UserEntity } from "src/entity";
import { UserRoute, UserRouteName } from "src/module/user/interface/user.route";
import {
    CreateUserInputDto,
    FindUserOneDto,
    UserIdDto,
} from "src/module/user/interface/dto";

describe("Anonymous can join as a new user", () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let userRepo: Repository<UserEntity>;

    /**
     * Define test routes (from controllers)
     */
    const JOIN_USER = `/${UserRouteName}${UserRoute.JoinUser}`;
    const GET_USER_ONE_BY_EMAIL = `/${UserRouteName}${UserRoute.GetUserOneByEmail}`;

    /**
     * TEST DATA
     */
    const testUsers: IUser[] = [
        {
            id: Random.uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            email: Random.email(),
            nickname: Random.nickname(),
            password: Random.string(12),
            role: UserRole.USER,
        },
    ];

    /**
     * Test module settings
     */
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        dataSource = module.get<DataSource>(DataSource);
        userRepo = dataSource.getRepository(UserEntity);
        await app.init();
    });

    /**
     * Cleaning after test
     */
    afterAll(async () => {
        await Promise.all(
            testUsers.map(async user => {
                await userRepo.delete({
                    email: user.email,
                });
            })
        );
        await app.close();
    });

    /**
     * TEST
     */

    it("should join as a user", async () => {
        const user = testUsers[0];
        const body: CreateUserInputDto = {
            email: user.email,
            nickname: user.nickname,
            password: user.password,
        };

        jest.spyOn(userRepo, "findOne").mockResolvedValueOnce(null);
        jest.spyOn(userRepo, "create").mockReturnValueOnce(user);

        const response: UserIdDto = (
            await request(app.getHttpServer()).post(JOIN_USER).send(body)
        ).body;

        expect(response).toBeDefined();
        expect(response.user.id).toEqual(user.id);
    });

    it("should get the user", async () => {
        const user = testUsers[0];
        const url = GET_USER_ONE_BY_EMAIL.replace(":email", user.email);

        const response: FindUserOneDto = (
            await request(app.getHttpServer()).get(url)
        ).body;

        expect(response).toBeDefined();
        expect(response.user.email).toEqual(user.email);
        expect(response.user.nickname).toEqual(user.nickname);
    });
});
