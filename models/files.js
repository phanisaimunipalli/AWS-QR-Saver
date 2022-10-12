
const mongoose=require('mongoose');


const UserSchema=new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileDesc: {
        type: String,
        required: true
    },
    uploadTime: {
        type: String,
        required: true
    },
    modifiedDate: {
        type: Date, 
        default: Date.now
    }


});


const files=mongoose.model('files',UserSchema);


module.exports = files;
