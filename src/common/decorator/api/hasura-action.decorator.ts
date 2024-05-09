/* eslint-disable @typescript-eslint/ban-types */
import {
    ApiOkResponse,
    ApiOperation,
    ApiResponseMetadata,
} from "@nestjs/swagger";
import { JwtRolesAuth } from "../auth/jwt-roles-auth.decorator";
import { Post } from "@nestjs/common";
import { IActionRoute } from "src/shared/interface/action-route.type";
import { Transactional } from "typeorm-transactional";

export const HasuraAction = (input: {
    method: IActionRoute<any>["subPath"][0];
    successType?: ApiResponseMetadata["type"];
    transactional?: boolean;
}): MethodDecorator => {
    const { method, successType, transactional } = input;
    return <T>(
        target: Object,
        key: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ) => {
        /**
         * 1. 해당 메소드에 설정된 Route 정보를 기반으로 Post 메소드를 설정.
         * 이곳에서 Post 메소드 데코레이터를 설정하기 때문에, '@nestjs/swagger' 패키지가 성공 방환값으로 200을 자동 생성시킴.
         * 따라서, 200 상태 코드를 성공으로 이용하도록 함. (실제로는 201 상태 코드가 반환됨)
         */
        Post(method.name)(target, key, descriptor);
        if (successType) {
            ApiOkResponse({
                type: successType,
            })(target, key, descriptor);
        }

        // 2. 해당 메소드의 이름을 Actions 이름으로 설정 (설정하지 않는 경우 컨트롤러의 이름이 붙게 됨).
        ApiOperation({
            operationId: key.toString(),
        })(target, key, descriptor);

        // 3. 만약 해당 메소드의 실행 권한이 필요하다면, 권한을 설정.
        if (method.roles.length) {
            JwtRolesAuth(...method.roles)(target, key, descriptor);
        }

        // 4. 만약 해당 메소드의 실행이 트랜잭션 사용을 요구한다면, 트랜잭션을 설정
        if (transactional) {
            Transactional()(target, key, descriptor);
        }

        return descriptor; // 데코레이터의 명시적 사용 이후 반환
    };
};
