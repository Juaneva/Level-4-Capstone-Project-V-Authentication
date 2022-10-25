const jwt = require('jsonwebtoken');


class VerifyUser {

    // User uses web token to try and login, ensures no tampering
    static verify(req, res) {

        const token = req.headers['authorization'].split(' ')[1]
        try {
            const decoded = jwt.verify(token, 'jwt-cooltech-secret')

            res.send({
                'nickname': decoded.nickname,
                'email': decoded.email,
                'ouDivision': decoded.ouDivision,
                'role': decoded.role,
            })

        } catch (e) {
            res.sendStatus(401)
        }

    }


}

module.exports = VerifyUser;