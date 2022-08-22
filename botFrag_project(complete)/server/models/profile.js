import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    bio: String,
    status: String,
    selectedFile: String,
    owner : String,
})

var Profile = mongoose.model('Profile', profileSchema);

export default Profile;