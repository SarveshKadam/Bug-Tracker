const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

const memberSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    mobilePhone:{
        type : Number
    },
    workPhone:{
        type : Number
    },
    location:{
        type: String,
        required : true
    },
    position:{
        type : String,
        required: true
    },
    createdAt:{
        type: Date,
        required : true,
        default : Date.now
    },
    memberID:{
        type: Number
    }
})

memberSchema.plugin(autoIncrement,{inc_field : "memberID",start_seq : 1000})

module.exports = mongoose.model('Member',memberSchema)