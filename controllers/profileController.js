const db = require("../models");

// Defining methods for the jobsContoller
module.exports = {
  findAll: function (req, res) {
    db.Profile.find()
      .then(profiles => res.json(profiles))
      .catch(err => res.status(400).json('Errors: ' + err));
  },
  findById: function (req, res) {
    db.Profile
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const doubleCheckPW = req.body.password;

    const newProfile = new Profile({ username });

    db.newProfile.save()
      .then(() => res.json('Profile added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  },
  update: function (req, res) {
    db.Profile
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Profile
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
