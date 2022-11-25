import { AnimatePresence } from "framer-motion";
import GameLoader from "Pages/gameLoader/gameLoader";
import Initializer from "Pages/Initializer/initializer";
import SplashScreen from "Pages/splash/splashScreen";
import Title from "Pages/title/title";
import React from "react";
import { Routes, Route } from "react-router-dom";



const PageRouter: React.FC = () => {
    
    return (
        <AnimatePresence>
            <Routes>
                <Route path="/" element={<Initializer />} />
                <Route path="/title" element={<Title />} />
                <Route path="/splash" element={<SplashScreen />} />
                <Route path="/load" element={<GameLoader />} />
                <Route path="/play/*" element={<></>} />
            </Routes>
        </AnimatePresence>
    )
}

export default PageRouter;