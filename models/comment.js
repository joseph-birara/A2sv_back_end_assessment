//Add Comment: Users can add comments to recipes with the following fields:
// Content
// Date
// Author



const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    content: { type:String, required: true },
    Author :{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    Recipe : { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }

})


const comment = mongoose.model('Comment', Comment);
module.exports = comment;


