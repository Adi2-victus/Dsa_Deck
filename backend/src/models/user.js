const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase:true,
        immutable: true,
    },
    age:{
        type:Number,
        min:6,
        max:80,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    },
    solvedEasy: {
        type: Number,
        default: 0
    },
    solvedMedium: {
        type: Number,
        default: 0
    },
    solvedHard: {
        type: Number,
        default: 0
    },
    totalSolved: {
        type: Number,
        default: 0
    },
    streakCount: {
        type: Number,
        default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    },
    lastSolvedAt: {
        type: Date,
        default: null
    },
    leaderboardScore: {
        type: Number,
        default: 0
    },
    problemSolved:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'problem',
            unique:true
        }],
    },
    password:{
        type:String,
        required: true
    }
},{
    timestamps:true
});

userSchema.post('findOneAndDelete', async function (userInfo) {
    if (userInfo) {
      await mongoose.model('submission').deleteMany({ userId: userInfo._id });
    }
});


const User = mongoose.model("user",userSchema);

module.exports = User;
