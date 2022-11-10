const Joi = require("joi");

const requestParam = (schema, name) => {
    return (req, res, next) => {
        console.log(req.params[name]);
        const ValidateResult = schema.validate({ idParam: req.params[name] });
        console.log("ValidateResult", ValidateResult);
        console.log("req.params[name]", req.params[name]);

        if (ValidateResult.error) {
            res.status(400).json(ValidateResult.error);
        }
        // if(!req.iduser) {  req.iduser={} }
        // if(!req.iduser['params_id']) { req.iduser.params_id={} }
        // req.iduser.params_id[name] = req.params[name]
        // console.log( '4 req.iduser', req.iduser);

        // console.log( '1 req.value', req.value);
        // if(!req.value) { req.value={} }
        // console.log( '2 req.value', req.value);
        // // console.log( '2.1 req.value[params]', req.value['params']);
        // console.log( '2.2  req.value.params', req.value.params);
        // console.log( '2.3  req.params' , req.params);
        // console.log( '2.4 req.params[name]', req.params[name]);

        // if(!req.value['params_id']) { req.value.params_id={} }
        // console.log( '3 req.value', req.value);
        // console.log( '3.1 req.value.params_id', req.value.params_id);
        // console.log( '3.2  req.params' , req.params);
        // console.log( '3.3 req.params[name]', req.params[name]);
        // // console.log( '3.4 req.value.params[name]', req.value.params[name]);
        // console.log( '3.4 req.value.params_id[name]', req.value.params_id[name]);
        // req.value.params_id[name] = req.params[name]
        // console.log( '4 req.value', req.value);
        // console.log( '4.1 req.params', req.params);
        // console.log( '5 req.value.params_id', req.value.params_id);
        // console.log( '6 req.value.params[name]', req.value.params_id[name]);
        // console.log( '7 req.params[name]', req.params[name]);
        // console.log( '8 ValidateResult', ValidateResult);
        // res.status(200).json("req.value"+ req.value);

        if (!req.value) {
            req.value = {};
        }
        if (!req.value["params_id"]) {
            req.value.params_id = {};
        }
        req.value.params_id[name] = req.params[name];
        next();
    };
};

const requestBody = (schema) => {
    return (req, res, next) => {
        const ValidateResult = schema.validate(req.body);
        console.log("ValidateResult", ValidateResult);

        if (ValidateResult.error) {
            res.status(400).json(ValidateResult.error); // không để res.status(400).json( "ValidateResult.error"+ ValidateResult.error)
        }

        if (!req.value) {
            req.value = {};
        }
        if (!req.value["params_id"]) {
            req.value.params_id = {};
        }
        req.value.reqBody = ValidateResult.value; // kiểm tra
        next(); // ko có hàm này ko chạy lên browser đại diện   res.status(200).json("");
    };
};

const schemas = {
    IDSchemas: Joi.object().keys({
        idParam: Joi.string()
            // .regex(/^[0-9a-fA-F]{24}$/)
            .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
            .required(),
    }),
    usernameBody: Joi.object().keys({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
    }),
    usernameOptionsBody: Joi.object().keys({
        firstName: Joi.string().min(3),
        lastName: Joi.string().min(3),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }),
    }),
    UserDeckBody: Joi.object().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
    }),
    DecksBody: Joi.object().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        owner: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")).required(),
    }),
    DecksOptionsBody: Joi.object().keys({
        name: Joi.string().min(3),
        description: Joi.string().min(3),
        owner: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
    }),

    AuthenticationSignIn: Joi.object().keys({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().required().min(6),
    }),
    AuthenticationSignUp: Joi.object().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().required().min(6),
    }),
};

module.exports = {
    schemas,
    requestParam,
    requestBody,
};
