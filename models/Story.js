const mongoose = require ('mongoose')

const StorySchema = new mongoose.Schema({
    tilte: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Story', StorySchema)