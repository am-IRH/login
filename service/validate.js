const Yup = require("yup");

const yupSchema = Yup.object().shape({
    name: Yup.string().required().min(6).max(100),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(100),
    "confirm-password": Yup.string().required().oneOf([Yup.ref("password"), null])
});

module.exports = yupSchema;