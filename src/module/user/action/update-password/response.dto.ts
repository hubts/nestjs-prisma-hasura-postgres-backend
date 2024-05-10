import { SuccessRes } from "src/common/dto/success.res";
import { SUCCESS_MESSAGE } from "src/shared/response/success-message";

export class UpdatePasswordResponseDto extends SuccessRes<undefined> {
    message = SUCCESS_MESSAGE.USER.UPDATE_PASSWORD;
}
