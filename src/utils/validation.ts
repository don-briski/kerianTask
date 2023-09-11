import Joi from "joi";



export const UserSchema = Joi.object({
    email: Joi.string().email().required(),
  phone: Joi.string().required(),
  pin: Joi.string().min(6).max(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

})

interface Input {
    email: string,
    phone: string
    pin: string
}

export const validateUserCreation = (data: any) => {
    const validationResult = UserSchema.validate(data);
    if (validationResult.error) {
        throw new Error(validationResult.error.details[0].message + "validation error");
    }
    return true;
};


//login validation

export const loginSchema = Joi.object().keys({
     email: Joi.string().required(),
     pin: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
})

export const validateUserLogin = (data:any) => {
    const validationResult = loginSchema.validate(data);
    if (validationResult.error) {
        throw new Error(validationResult.error.details[0].message);
    }
    return true;
};

