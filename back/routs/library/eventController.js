const { response } = require("express");
const mongoose = require("mongoose");
const Events = require("../../models/eventsModel.js");
const Users = require("../../models/userModel.js");

// 4 thing create, get, update, delete

// 1 create

exports.createEvent = async function (req, res) {
  try {
    //getting body
    const body = req.body;
    if (!body)
      return res.status(400).json({ message: "Content cannot be empty!" });

    // cheking user
    if (!req.user) return res.status(401).json({ message: "Unauthorized!" });

    //chesck if book already exists
    // const bookExists = await Events.findOne({ name: body.name });
    // if (bookExists)
    //   return res.status(400).json({ message: "Event already exists!" });

    // creating new book

    console.log(req.user);
    const newEvent = new Events({
      date: body.date,
      name: body.name,
      location: body.location,
      description: body.description,
      author: req.user.name,
      user_id: req.user._id,
      approved: false,
      // image: req.user.image,
    });

    // saving book to DB
    const createdItem = await newEvent.save();
    if (createdItem) return res.status(200).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2 getting by user

exports.getEvents = async function (req, res) {
  try {
    // cheking user
    if (!req.user) return res.status(401).json({ message: "Unauthorized!" });

    //getting books made by user
    const events = await Events.find({});
    if (!events) return res.status(404).json({ message: "No books found!" });

    //return books
    return res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3 updating book

exports.updateEvent = async function (req, res) {
  try {
    // getting body
    const body = req.body;
    if (!body)
      return res.status(400).json({ message: "Content cannot be empty!" });

    const event = await Events.findById(req.params.id);
    if (!event || event.length === 0)
      return res.status(404).json({ message: "No event found with that id!" });

    // checking if user is the owner of the event or the admin
    if (!req.user || req.user.authenticationLevel !== "admin") {
      if (event.user_id.toString() !== req.user._id.toString())
        return res.status(401).json({ message: "Unauthorized!" });
    }

    // updating book
    event.name = body.name;
    event.location = body.location;
    event.description = body.description;
    event.approved = body.approved;
    // event.image = body.image;

    // saving updated book
    const updatedEvent = await event.save();
    if (updatedEvent) return res.status(200).json({ event: updatedEvent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4 deleting book
exports.deleteEvent = async function (req, res) {
  try {
    // cheking user
    if (!req.user) return res.status(401).json({ message: "Unauthorized!" });

    // getting book by id
    const event = await Events.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "No book found with that id!" });

    // checking if user is the owner of the book
    if (req.user.authenticationLevel !== "admin") {
      if (event.user_id.toString() !== req.user._id.toString())
        return res.status(401).json({ message: "Unauthorized!" });
    }

    // deleting book
    const response = await Events.deleteOne({ _id: req.params.id });
    if (response) return res.status(200).json({ message: "Event deleted!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
