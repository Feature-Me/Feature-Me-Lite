import { AnimatePresence } from "framer-motion";
import GameLoader from "Pages/gameLoader/gameLoader";
import Home from "Pages/home/home";
import Initializer from "Pages/Initializer/initializer";
import SplashScreen from "Pages/splash/splashScreen";
import Title from "Pages/title/title";
import React from "react";
import { Routes, Route } from "react-router-dom";



const PageRouter: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Initializer />} />
            <Route path="/title" element={<Title />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/load" element={<GameLoader />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}

export default PageRouter;