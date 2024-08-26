const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Obter o token do header
    const token = req.header('x-auth-token');

    // Verificar se o token não existe
    if (!token) {
        return res.status(401).json({ msg: 'Sem token, autorização negada' });
    }

    try {
        // Verificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adicionar o usuário ao req
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token inválido' });
    }
};
