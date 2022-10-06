const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : false
    },
    start : {
        type : Date,
        required : true
    },
    end : {
        type : Date,
        required : true
    },
    priority : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
})

const Task = new mongoose.model("Task",taskSchema);

module.exports = Task