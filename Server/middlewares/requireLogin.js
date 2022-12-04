const jwt = require("jsonwebtoken")
const User = require("../models/userModels")
const mongoose = require('mongoose')
const asyncHandler = require("express-async-handler");

// const requireLogin = (req, res, next) => {

//     const { authorization } = req.headers;
//     if (!authorization) {
//         return res.status.send({ Error: "you must be logged in" });
//     }
//     const token = authorization.replace("Bearer ", "")
//     jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
//         if (err) {
//             return res.status(401).json({ Error: "you must be logged in" });
//         }

//         const { _id } = data;
//         User.findById(_id).then(userData => {
//             req.user = userData
//         }).catch(err => {
//             console.log(err);
//         })

//         next();
//     })
// }
const requireLogin = asyncHandler(async(req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
})


module.exports = requireLogin;