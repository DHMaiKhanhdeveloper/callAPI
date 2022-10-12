const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const {
    schemas,
    requestParam,
    requestBody,
} = require("../helperControllers/helperControllers");
const UserController = require("../controllers/usersController"); // .. đi ra ngoài routes đi vào controllers

// router.route('/users') // localhost:3000/users/users
//     .get((req,res) =>{
//         return res.status(200).json({
//             message: 'Run users successful'
//         })

//     }
// );

router
    .route("/") // localhost:3000/users
    .get(UserController.index)
    .post(requestBody(schemas.usernameBody), UserController.newUser);
// tương đương
// router.route('/') // localhost:3000/users/users
//     .get((req,res) =>{
//         return res.status(200).json({
//             message: 'Run users successful'
//         })

//     }

// );
router
    .route("/:userID")
    .get(requestParam(schemas.IDSchemas, "userID"), UserController.getUser)
    .put(
        requestParam(schemas.IDSchemas, "userID"),
        requestBody(schemas.usernameBody),
        UserController.replaceUser
    )
    .patch(
        requestParam(schemas.IDSchemas, "userID"),
        requestBody(schemas.usernameOptionsBody),
        UserController.updateUser
    );
router
    .route("/secret/secrets")
    .get(
        passport.authenticate("jwt", { session: false }),
        UserController.Secret
    );

router
    .route("/SignUp")
    .post(requestBody(schemas.AuthenticationSignIn), UserController.SignUp);
router
    .route("/SignIn")
    .post(
        requestBody(schemas.AuthenticationSignUp),
        passport.authenticate("local", { session: false }),
        UserController.SignIn
    );

router.post(
    "/auth/google",
    passport.authenticate("google-plus-token", { session: false }),
    UserController.AuthGoogle
); // phải config passport.js

router.post(
    "/auth/facebook/token",
    passport.authenticate("facebook-token", { session: false }),
    UserController.AuthFacebook
);

router
    .route("/:userID/decks")
    .get(requestParam(schemas.IDSchemas, "userID"), UserController.getUserDeck)
    .post(
        requestParam(schemas.IDSchemas, "userID"),
        requestBody(schemas.UserDeckBody),
        UserController.newUserDeck
    );

module.exports = router;
