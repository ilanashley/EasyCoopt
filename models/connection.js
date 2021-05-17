var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

let DBPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://admin:${DBPassword}@cluster0.8ipot.mongodb.net/easycoopt?retryWrites=true&w=majority`,
   options,        
   function(err) {
    if(err){
    console.log(err);
     } else {
     console.log('____________BDD OK_________________')
     }
   }
)

module.exports = mongoose;