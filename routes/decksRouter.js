const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();

const {
    schemas,
    requestParam,
    requestBody,
} = require("../helperControllers/helperControllers");
const DeckController = require("../controllers/deckController");

router
    .route("/") // localhost:3000/decks
    .get(DeckController.index)
    .post(requestBody(schemas.DecksBody), DeckController.newDecks);
router
    .route("/:deckID")
    .get(requestParam(schemas.IDSchemas, "deckID"), DeckController.getDeck)
    .put(
        requestParam(schemas.IDSchemas, "deckID"),
        requestBody(schemas.DecksBody),
        DeckController.replaceDeck
    )
    .patch(
        requestParam(schemas.IDSchemas, "deckID"),
        requestBody(schemas.DecksOptionsBody),
        DeckController.updateDeck
    )
    .delete(
        requestParam(schemas.IDSchemas, "deckID"),
        DeckController.deleteDeck
    );

// router.route('/:userID/decks')
//     .get(requestParam(schemas.usernameID,'userID'),UserController.getUserDeck)
//     .post(requestParam(schemas.usernameID,'userID'),requestBody(schemas.UserDeckBody),UserController.newUserDeck)

module.exports = router;
