//define mongoose schema for recipes

const mongoose = require('mongoose');


const recipesSchema = new mongoose.Schema({
    Titele :  { type: String, required: true },
    Instraction : { type: String, required: true},
    Ingridents : [{ type: String,required:true}],
    Preparetion : { type: String},
    Comments : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

})



const Recipe = mongoose.model('Recipe', recipesSchema);
module.exports = Recipe;