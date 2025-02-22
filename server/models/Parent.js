const mongoose = require("mongoose");
const ParentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    children: [
        {
            name: { type: String, required: true },
            grade: { type: String, required: true },
            school: { type: String }
        }
    ],
    preferences: {
        subjects: [String],
        teachingStyle: String,
        languagePreference: String,
        tutorGender: String
    }
});

module.exports = mongoose.model('Parent', ParentSchema);
