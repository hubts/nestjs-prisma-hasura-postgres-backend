import { ResponseDto } from "src/common/dto/response.dto";
import { SUCCESS_MESSAGE } from "src/shared/response/success-message";

export class UpdatePasswordResponseDto extends ResponseDto<any> {
    message = SUCCESS_MESSAGE.USER.UPDATE_PASSWORD;
    data?: any;
    // TODO: any 대신 undefined 를 할당하면 Swagger response 인식이 안 돼서 실행이 안 되는 오류 있음
}
