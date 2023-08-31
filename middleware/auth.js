const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const TOKEN_KEY = "RANDOM_KEY";
const { authHeaderSchema } = require('../helpers/validationSchema')


// function authenticationToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) return res.status(400).json({ message: 'Token is missing or invalid' });



//     jwt.verify(token, TOKEN_KEY, (err, user) => {
//         if (err) {
//             if (err.name === 'TokenExpiredError') {
//                 return res.status(403).json({ message: 'Token has expired' });
//             } else if (err.name === 'JsonWebTokenError') {
//                 return res.status(403).json({ message: 'Invalid token' });
//             } else {
//                 return res.status(400).json({ message: 'Token is missing or invalid' });
//             }
//         }


//         req.user = user;
//         next();
//     });

// }

function deviceAuthenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Authorization header with Bearer token is required' });
    }

    const prefixedToken = `Bearer ${token}`;
    const { error } = authHeaderSchema.validate({ authorization: prefixedToken });

    if (error) {
        return res.status(401).json({ message: error.message });
    }
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token has expired' });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                return res.status(400).json({ message: 'Token is missing or invalid' });
            }
        }

        const entityType = decoded.type;
        const entityUuid = decoded.uuid;

        // Check if the entity type is 'Complain'
        if (entityType !== 'User') {
            return res.status(403).json({ message: 'Invalid entity type' });
        }

        // Attach entity information to the request object
        req.entityType = entityType;
        req.entityUuid = entityUuid;

        next();
    });

}
function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization header with Bearer token is required' });
    }

    const prefixedToken = `Bearer ${token}`;
    const { error } = authHeaderSchema.validate({ authorization: prefixedToken });

    if (error) {
        return res.status(401).json({ message: error.message });
    }



    if (myCache.has("userToken")) {
        if (token == null) return res.sendStatus(401).json({ message: "Please Enter Token" });

        jwt.verify(token, TOKEN_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).json({ message: 'Token has expired' });
                } else if (err.name === 'JsonWebTokenError') {
                    return res.status(403).json({ message: 'Invalid token' });
                } else {
                    return res.status(400).json({ message: 'Token is missing or invalid' });
                }
            }

            const entityType = decoded.type; // Get the entity type from the decoded payload
            const entityUuid = decoded.uuid; // Get the entity UUID from the decoded payload

            // Check if the entity type is 'Complain'
            if (entityType !== 'User') {
                return res.status(403).json({ message: 'Invalid entity type' });
            }


            // Attach entity information to the request object
            req.entityType = entityType;
            req.entityUuid = entityUuid;
            myCache.set("DevicePayLoad", req.entityType, req.entityUuid)


            next();
        });
    }
    if (myCache.has("companyToken")) {
        if (token == null) return res.sendStatus(401).json({ message: "Please Enter Token" });

        jwt.verify(token, TOKEN_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).json({ message: 'Token has expired' });
                } else if (err.name === 'JsonWebTokenError') {
                    return res.status(403).json({ message: 'Invalid token' });
                } else {
                    return res.status(400).json({ message: 'Token is missing or invalid' });
                }
            }

            const entityType = decoded.type; // Get the entity type from the decoded payload
            const entityUuid = decoded.uuid; // Get the entity UUID from the decoded payload

            // Check if the entity type is 'Complain'
            if (entityType !== 'Company') {
                return res.status(403).json({ message: 'Invalid entity type' });
            }


            // Attach entity information to the request object
            req.entityType = entityType;
            req.entityUuid = entityUuid;
            myCache.set("companyPayLoad", req.entityType, req.entityUuid)


            next();
        });
    }

    else {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401).json({ message: "Please Enter Token" });

        jwt.verify(token, TOKEN_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).json({ message: 'Token has expired' });
                } else if (err.name === 'JsonWebTokenError') {
                    return res.status(403).json({ message: 'Invalid token' });
                } else {
                    return res.status(400).json({ message: 'Token is missing or invalid' });
                }
            }

            const entityType = decoded.type;
            const entityUuid = decoded.uuid;

            // Check if the entity type is 'Complain'
            if (entityType !== 'Company') {
                return res.status(403).json({ message: 'Invalid entity type' });
            }

            // Attach entity information to the request object
            req.entityType = entityType;
            req.entityUuid = entityUuid;

            next();
        });
    }
}

// function generateAccessToken(uuid) {
//     return jwt.sign({ uuid: uuid }, TOKEN_KEY, {
//         expiresIn: "1h"
//     });
// }

function generateAccessToken(entityType, entityUuid) {
    return jwt.sign({ type: entityType, uuid: entityUuid }, TOKEN_KEY, {
        expiresIn: "1h"
    });
}

module.exports = {
    authenticationToken,
    generateAccessToken,
    deviceAuthenticationToken
};