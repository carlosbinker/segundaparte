import jwt from "jsonwebtoken";
import "dotenv/config";
const secret_key = process.env.JWT_SECRET_KEY;
// Middleware para verificar el token JWT 
export const auth = (req, res, next) => {
// console.log(req.headers); // Examino los headers
// next()};
    
  const token = req.headers["authorization"]?.split(" ")[1];
  // console.log(req.headers);
  // console.log(token)
  if (!token)
  { return res.status(401).json({ message: "Unauthorized user" }) };
  jwt.verify(token, secret_key, (err, decoded) => {
    if (err)
    { return res.status(403).json({ message: "Unauthorized user" }) };
    // Si no hay error, con next() le indico que continúe el programa
    // console.log(decoded);
    req.userId = decoded.id; // Creo una nueva propiedad en el objeto request llamada userId
    // console.log(req);
    next();
  });
};
