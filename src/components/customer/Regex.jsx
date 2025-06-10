export const validEmail = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+.([a-zA-Z]){2,3}$'
);

export const validPassword = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
);

export const validName = new RegExp(
    '^([a-zA-Z]){2,}$'
)

export const validPhoneNumber = new RegExp(
    '^([0-9]){10}$'
)