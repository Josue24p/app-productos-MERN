export const validateSchema = (schema) => (req, res, next) => {
    try {
        //para validar el esquema correctamente, continua
        schema.parse(req.body)
        next()
    } catch (error) {
        return res
            .status(400)
            .json(error.errors.map(error => error.message));
    }
}