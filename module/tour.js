const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({

    // data: [{ type: Schema.Types.ObjectId, ref: 'DesignProducts' }],
    Bill_Entry_date: {
        type: Date,
        default: Date.now,
    },
    Old_sequence_number: {
        type: Number,
        required: true,
    },

    Project_name: {
        type: String,
        required: true,
    },

    Customer_Name: {
        type: String,
        require: true,
    },
    Project_location: {
        type: String,
        require: true,
    },
    Consumer_name: {
        type: String,
        require: true
    },
    Work_Order_number: {
        type: Number,
        require: true,
       
    },
    Start_date: {
        type: Date,
        default: Date.now,

    },
    End_date: {
        type: Date,
        default: Date.now,

    }


},
)

const Form = new mongoose.model("Form", employeeSchema);

module.exports = Form;