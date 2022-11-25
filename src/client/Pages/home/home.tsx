import FloatHeader from "Components/floatHeader/floatHeader";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";

import style from "./home.scss";

const Home:React.FC = () =>{

    const navigate  = useNavigate();

    const init = {
        opacity: 0,
        y: 15
    }
    const animaiton = {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2
        }
    }

    return(
        <motion.div className={style.home} initial={init} animate={animaiton}>
            <FloatHeader title="Home" backFunc={()=>navigate("/title")} />

        </motion.div>
    )
}

export default Home