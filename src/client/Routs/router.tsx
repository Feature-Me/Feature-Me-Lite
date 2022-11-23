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
            <Route path="/play/*" element={<></>} />
        </Routes>
    )
}

export default PageRouter;