const Tutor = require('../models/Tutor');
const User = require('../models/User');

// CREATE OR UPDATE TUTOR PROFILE
const createOrUpdateTutorProfile = async (req, res) => {
    try {
        const userId = req.user; // Authenticated user
        const { qualifications, subjects, grades, experience, languages, gender, teachingMethodology, availability, certifications } = req.body;

        let tutor = await Tutor.findOne({ userId });

        if (tutor) {
            // Update existing tutor profile
            tutor = await Tutor.findOneAndUpdate(
                { userId },
                { $set: { qualifications, subjects, grades, experience, languages, gender, teachingMethodology, availability, certifications } },
                { new: true, runValidators: true }
            );
            return res.status(200).json({ success: true, message: "Tutor profile updated successfully", tutor });
        } else {
            // Create new tutor profile
            const newTutor = new Tutor({
                userId,
                qualifications,
                subjects,
                grades,
                experience,
                languages,
                gender,
                teachingMethodology,
                availability,
                certifications
            });
            await newTutor.save();
            return res.status(201).json({ success: true, message: "Tutor profile created successfully", tutor: newTutor });
        }
    } catch (error) {
        console.error("Error creating/updating tutor profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET A SINGLE TUTOR PROFILE
const getTutorProfile = async (req, res) => {
    try {
        const { tutorId } = req.params; // This is actually the userId

        // Find the tutor using userId instead of _id
        const tutor = await Tutor.findOne({ userId: tutorId })
            .populate('userId', 'username email profilePhoto phone address pincode')

        if (!tutor) return res.status(404).json({ message: "Tutor not found" });

        res.status(200).json({ success: true, tutor });
    } catch (error) {
        console.error("Error fetching tutor profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// GET ALL TUTORS (FILTER BY SUBJECT, GRADE, LANGUAGE)
const getAllTutors = async (req, res) => {
    try {
        const { subject, grade, language } = req.query;
        let filters = {};

        if (subject) filters.subjects = subject;
        if (grade) filters.grades = grade;
        if (language) filters.languages = language;

        const tutors = await Tutor.find(filters).populate('userId', 'username email');

        res.status(200).json({ success: true, tutors });
    } catch (error) {
        console.error("Error fetching tutors:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE TUTOR PROFILE
const deleteTutorProfile = async (req, res) => {
    try {
        const userId = req.user;
        const tutor = await Tutor.findOneAndDelete({ userId });

        if (!tutor) return res.status(404).json({ message: "Tutor profile not found" });

        res.status(200).json({ success: true, message: "Tutor profile deleted successfully" });
    } catch (error) {
        console.error("Error deleting tutor profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createOrUpdateTutorProfile, getTutorProfile, getAllTutors, deleteTutorProfile };
