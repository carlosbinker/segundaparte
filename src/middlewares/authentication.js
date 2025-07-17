import jwt from "jsonwebtoken";
import "dotenv/config";
const secret_key = process.env.JWT_SECRET_KEY;
// Middleware para verificar el token JWT 
export const authentication = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];
    // const token = req.headers['X-Auth-Token'].split(" ")[1];
    // console.log(token)
    if (!token)
        return res.sendStatus(401).json({ message: "Unauthorized user" });
    jwt.verify(token, secret_key, (err) => {
        if (err) return res.sendStatus(403);
        // Si no hay error, con next() le indico que continúe el programa
        next();
    });
};
