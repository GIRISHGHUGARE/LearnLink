import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice.jsx";
import { tutorSlice } from "./features/tutor/tutorSlice.jsx";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        tutorProfile: tutorSlice.reducer,
    }
});

export default store;