const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');
const User = mongoose.model('users');

// Function to retrieve the authenticated user
const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User.findOne({ email: req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                } else if (err) {
                    return res.status(500).json(err);
                }
                callback(req, res, user);
            });
    } else {
        return res.status(400).json({ message: "User is not authenticated" });
    }
};

const tripsList = async (req, res) => {
    const q = await Model.find({}).exec();

    if (!q) {
        return res.status(404).json({ message: "No trips found" });
    } else {
        return res.status(200).json(q);
    }
};

const tripsFindByCode = async (req, res) => {
    const q = await Model.find({ code: req.params.tripCode }).exec();

    if (!q) {
        return res.status(404).json({ message: "Trip not found" });
    } else {
        return res.status(200).json(q);
    }
};

const tripsAddTrip = async (req, res) => {
    getUser(req, res, () => {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        newTrip.save((err, trip) => {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(201).json(trip);
            }
        });
    });
};

const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, () => {
        Model.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        ).exec((err, trip) => {
            if (!trip) {
                return res.status(404).json({ message: "Trip not found with code " + req.params.tripCode });
            } else if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(trip);
        });
    });
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};