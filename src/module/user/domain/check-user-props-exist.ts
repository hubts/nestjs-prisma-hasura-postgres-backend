export const checkUserPropsExist = (
    users: {
        email: string;
        nickname: string;
        mobile: string | undefined;
    }[],
    where: {
        email: string;
        nickname: string;
        mobile: string;
    }
): {
    exists: boolean;
    firstReason?: "email" | "nickname" | "mobile" | undefined;
} => {
    if (!users.length) {
        return {
            exists: false,
        };
    }

    const { email, nickname, mobile } = where;
    return {
        exists: true,
        firstReason: users.find(user => user.email === email)
            ? "email"
            : users.find(user => user.nickname === nickname)
            ? "nickname"
            : users.find(user => user.mobile === mobile)
            ? "mobile"
            : undefined,
    };
};
