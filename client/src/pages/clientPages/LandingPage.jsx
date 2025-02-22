import React, { useState } from "react";
import { FaChalkboardTeacher, FaUsers, FaCommentDots } from "react-icons/fa";
import TutorImage from "../../assets/tutor.webp";
import AuthModal from "../../components/AuthModal/LoginSignupModal"; // Import the modal component

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("login"); // "login" or "signup"

    const openModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* Navbar */}
            <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed w-full z-50">
                <h1 className="text-2xl font-bold text-blue-600">LearnLink</h1>
                <div className="space-x-4">
                    <button onClick={() => openModal("login")} className="text-blue-600 font-medium hover:underline">Login</button>
                    <button onClick={() => openModal("signup")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className="h-screen flex items-center justify-center text-center px-6 relative bg-cover bg-center"
                style={{ backgroundImage: `url(${TutorImage})` }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Content Wrapper - Ensure Centering */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Empowering Learning, Connecting Tutors & Parents
                    </h2>
                    <p className="text-lg text-gray-300 mt-4 max-w-2xl">
                        Find the perfect tutor for your child or offer your expertise as a tutor.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={() => openModal("signup")}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section className="py-16 px-6 bg-white">
                <h3 className="text-3xl font-bold text-center mb-10">Why Choose LearnLink?</h3>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                        <FaChalkboardTeacher className="text-blue-600 text-5xl" />
                        <h4 className="text-xl font-semibold mt-4">Expert Tutors</h4>
                        <p className="text-gray-600 mt-2">Highly qualified and experienced tutors to guide your child.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                        <FaUsers className="text-blue-600 text-5xl" />
                        <h4 className="text-xl font-semibold mt-4">Personalized Learning</h4>
                        <p className="text-gray-600 mt-2">Customized teaching styles and methods for effective learning.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                        <FaCommentDots className="text-blue-600 text-5xl" />
                        <h4 className="text-xl font-semibold mt-4">Seamless Communication</h4>
                        <p className="text-gray-600 mt-2">Easy parent-tutor interaction for the best learning experience.</p>
                    </div>
                </div>
            </section>

            {/* Join Our Community Section */}
            <section className="py-16 bg-blue-600 text-white text-center">
                <h3 className="text-3xl font-bold">Join Our Growing Community</h3>
                <p className="text-lg mt-4 max-w-2xl mx-auto">Become part of a network that is transforming education and making learning accessible to everyone.</p>
                <button onClick={() => openModal("signup")} className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-200">
                    Join Now
                </button>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 text-center py-6">
                <p>&copy; {new Date().getFullYear()} LearnLink. All rights reserved.</p>
            </footer>

            {/* Auth Modal */}
            {isModalOpen && (
                <AuthModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isSignup={modalType === "signup"}
                />
            )}
        </div>
    );
};

export default LandingPage;
