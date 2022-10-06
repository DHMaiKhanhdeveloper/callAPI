const UsersModel = require("../models/UserModel");
const DeckSModel = require("../models/DeckModel");

const index = async (req, res, next) => {
    const decks = await DeckSModel.find({});
    return res.status(200).json({ decks });
};

//  requestBody(schemas.DecksBody),
const newDecks = async (req, res, next) => {
    const owner_User = await UsersModel.findById(req.body.owner);
    console.log("req.body.owner", req.body.owner);
    console.log( 'req.value.reqBody.owner', req.value.reqBody.owner);
    const deck = req.value.reqBody; // tương đương req.body
    // console.log( 'req.value.reqBody', req.value.reqBody);
    delete deck.owner;

    deck.owner = owner_User._id;
    const newDeck = new DeckSModel(deck);
    await newDeck.save();

    owner_User.decks.push(deck.owner);
    await owner_User.save();

    return res.status(201).json({ userDeck: newDeck });
};
const getDeck = async (req, res, next) => {
    const { deckID } = req.value.params_id;
    const decks = await DeckSModel.findById(deckID);
    return res.status(200).json({ decks });
};
const updateDeck = async (req, res, next) => {
    const { deckID } = req.value.params_id;
    const deckBody = req.value.reqBody;
    const decks = await DeckSModel.findByIdAndUpdate(deckID, deckBody);
    return res.status(200).json({ deck: decks });
};
const replaceDeck = async (req, res, next) => {
    const { deckID } = req.value.params_id;
    const deckBody = req.value.reqBody;
    const decks = await DeckSModel.findByIdAndUpdate(deckID, deckBody);
    return res.status(200).json({ deck: decks });
};
const deleteDeck = async (req, res, next) => {
    const { deckID } = req.value.params_id;
    console.log("req.value.params_id", req.value.params_id);
    const deck = await DeckSModel.findById(deckID);

    const owner_deck = deck.owner;
    const owner_User = await UsersModel.findById(owner_deck);
    await deck.remove(); // không có save

    owner_User.decks.pull(deck);
    await owner_User.save();
    return res.status(200).json({ success: true });
};

//  const getUser = async (req, res, next) => {

//          const {userID} = req.params
//          const user = await UsersModel.findById(userID)
//          return res.status(200).json({user})

//  }

//  const replaceUser = async (req, res, next) => {

//      const {userID} = req.params
//      const  newUser = req.body
//      const user = await UsersModel.findByIdAndUpdate(userID,newUser)
//      return res.status(200).json({users: user })

//  }

//  const updateUser = async (req, res, next) => {

//      const {userID} = req.params
//      const  newUser = req.body
//      const user = await UsersModel.findByIdAndUpdate(userID,newUser)
//      return res.status(200).json({users: user })

//  }

//  const getUserDeck = async (req, res, next) => {

//      const {userID} = req.params
//      const user = await UsersModel.findById(userID).populate("decks")
//      return res.status(200).json({decks: user.decks })

//  }

//  const newUserDeck = async (req, res, next) => {

//      const {userID} = req.params
//      const  newDeck = new DeckSModel(req.body)
//      await newDeck.save()
//      const user = await UsersModel.findById(userID)
//      newDeck.owner = user

//      // const  newUser = new UsersModel(req.body)
//      user.decks.push(newDeck._id) //user.decks.push(newDeck)
//      await user.save()
//      return res.status(200).json({newDecks: newDeck })

//  }

module.exports = {
    index,
    newDecks,
    getDeck,
    replaceDeck,
    updateDeck,
    deleteDeck,
};
