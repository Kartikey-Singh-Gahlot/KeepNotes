const router = require('express').Router();
const {signUp, signIn,signOut, checkAuth} = require('../Controllers/AuthControllers');
const {showNotes, findNote, editNote, addNote, deleteNote} = require('../Controllers/UtilityControllers');
const {signupDataChecker, signinDataChecker, signStatusChecker} = require('../Middlewares/AuthMiddlewares.js')



router.post("/auth/signup", signStatusChecker, signupDataChecker, signUp );
router.post("/auth/signin", signStatusChecker , signinDataChecker, signIn );
router.post("/auth/signout",signOut);
router.get("/auth/userValidity",checkAuth);


router.get("/notes", showNotes);
router.post("/notes", addNote);
router.get("/notes/:id",findNote);
router.patch("/notes/:id",editNote);
router.delete("/notes/:id",deleteNote);


module.exports = router;