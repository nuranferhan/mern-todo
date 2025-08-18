const mongoose = require("mongoose"); 
const listSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    user:[
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],

    isCompleted: {
        type: Boolean,
        default: false,
    },

    order: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true}
);
 
module.exports = mongoose.model("List", listSchema);