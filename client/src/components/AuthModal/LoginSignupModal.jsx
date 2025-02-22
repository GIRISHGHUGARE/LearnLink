import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading, setError } from "../../redux/features/auth/authSlice";
import client from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthModal = ({ isOpen, onClose, isSignup }) => {
    const modalRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [role, setRole] = useState("parent");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleSubmit = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            if (!username || !password || (isSignup && !email)) {
                toast.error("Please fill in all fields.");
                return;
            }

            let response;
            if (isSignup) {
                response = await client.post("/auth/register", { username, email, password, role });
                localStorage.setItem("authToken", response.data.token);
                navigate("/otp-screen");
            } else {
                response = await client.post("/auth/login", { username, password });
                localStorage.setItem("authToken", response.data.token);
                navigate(role === 'parent' ? "/parentdashboard" : "/tutordashboard");
            }
            dispatch(login(response.data.user));
            toast.success(isSignup ? "Registration successful!" : "Login successful!");
            onClose();
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Action failed"));
            toast.error("Action failed! " + (error.response?.data?.message || ""));
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={modalRef} className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8 relative">
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        className={`px-4 py-2 font-semibold ${role === "parent" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} rounded-lg`}
                        onClick={() => setRole("parent")}
                    >
                        {isSignup ? "Parent" : "Login as Parent"}
                    </button>
                    <button
                        className={`px-4 py-2 font-semibold ${role === "tutor" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} rounded-lg`}
                        onClick={() => setRole("tutor")}
                    >
                        {isSignup ? "Tutor" : "Login as Tutor"}
                    </button>
                </div>
                {isSignup && (
                    <div>
                        <label className="text-gray-700">Email</label>
                        <input type="email" className="w-full px-4 py-2 border rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                )}
                <div>
                    <label className="text-gray-700">Username</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label className="text-gray-700">Password</label>
                    <input type="password" className="w-full px-4 py-2 border rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mt-6">
                    <button onClick={handleSubmit} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg">
                        {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
