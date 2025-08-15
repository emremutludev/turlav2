import React from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, useNavigate } from "react-router-dom";

let navigator = null;
export const setNavigator = (nav) => {
    navigator = nav;
};
export const navigate = (to) => {
    if (navigator) {
        navigator(to);
    }
};
const NavigationSetter = ({ children }) => {
    const navigate = useNavigate();
    React.useEffect(() => {
        setNavigator(navigate);
    }, [navigate]);
    return children;
};

axios.interceptors.request.use(
    async (config) => {
        config.withCredentials = true;
        config.baseURL = import.meta.env.VITE_API_URL;
        // config.headers.lang = localStorage.getItem("lang");
        // const authToken = localStorage.getItem("authToken");
        // config.headers["Authorization"] = `Bearer ${authToken}`;
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error?.response) {
            toast.error("Sunucuya ulaşılamıyor");
        }

        return;
    }
);

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ToastContainer />
        <NavigationSetter>
            <App />
        </NavigationSetter>
    </BrowserRouter>
);
