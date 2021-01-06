const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const dob = Date.parse(req.body.dob);
  const bio = req.body.bio;

  const newUser = new User({
    firstname,
    lastname,
    email,
    dob,
    bio,
  });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((User) => {
      User.firstname = req.body.firstname;
      User.lastname = req.body.lastname;
      User.email = req.body.email;
      User.dob = Date.parse(req.body.dob);
      User.bio = req.body.bio;
      User.save()
        .then(() => res.json("user updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
