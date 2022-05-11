const AdminEvent = require("../models/AdminEventModel");

exports.adminCreateEvent = (req, res, next) => {
  const { admin, eventType, eventDetails } = req.body;

  if (!admin) {
    return res.send({
      success: false,
      message: "Error: Admin name cannot be blank",
    });
  }

  if (!eventType) {
    return res.send({
      success: false,
      message: "Error: Event type cannot be blank",
    });
  }

  if (!eventDetails) {
    return res.send({
      success: false,
      message: "Error: Event detail cannot be blank",
    });
  }

  // save the new user
  const event = new AdminEvent();
  event.admin = admin;
  event.eventType = eventType;
  event.eventDetails = eventDetails;

  event.save((err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Admin event creation attempted, server error",
      });
    }
    return res.send({
      success: true,
      message: "Admin event created",
    });
  });
};

exports.adminGetEvents = async (req, res) => {
  AdminEvent.find({}, function (err, events) {
    var eventMap = {};

    events.forEach(function (event) {
      eventMap[
        (event.admin, event.eventType, event.eventDetails, event.timeCreated)
      ] = event;
    });

    res.send(eventMap);
  });
};
