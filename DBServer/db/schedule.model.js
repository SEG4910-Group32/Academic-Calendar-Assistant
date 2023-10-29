const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    // Define properties for the Schedule entity
    title: {
        type: String,
        required: "Title is required"
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        required: "Start date is required"
    },
    endDate: {
        type: Date,
        required: "End date is required"
    },
    // Add other properties as needed
});

mongoose.model("Schedule", scheduleSchema);