export function requireRole(...rolesPermitidos) {
    return (req, res, next) => {
        const rol = req.user?.rol;
        if(!rol || !rolesPermitidos.includes(rol)){
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    }
}