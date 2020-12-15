const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

const defectSchema = new mongoose.Schema({
    number :{
        type : Number
    },
    reportedBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Member',
        required: true
    },
    priority:{
        type : Number,
        required: true
    },
    assignedTo :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Member',
        required: true
    },
    state :{
        type : String,
        required : true
    },
    points:{
        type : String
    },
    environment :{
        type : String,
        required:true
    },
    product:{
        type:String
    },
    shortDescription:{
        type:String
    },
    description:{
        type:String
    },
    member :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Member'
    }
})

defectSchema.plugin(autoIncrement,{inc_field : "number",start_seq : 1000})
module.exports = mongoose.model('Defect',defectSchema)