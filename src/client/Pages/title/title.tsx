import React from "react";

import version from "Config/versions.json";

import style from "./title.scss";
import { motion } from "framer-motion";
import { opacity } from "html2canvas/dist/types/css/property-descriptors/opacity";

const Title: React.FC = () => {

    const init = {
        opacity:0,
        y:50
    }
    const animaiton = {
        opacity:1,
        y:0,
        transition:{
            duration:0.2
        }
    }

    return (
        <motion.div className={style.title} initial={init} animate={animaiton}>
            <div className={style.titleText}>
                <h1>Feature Me</h1>
                <p>Click to start</p>
            </div>
            <div className={style.footer}>
                <p>
                    Feature Me Lite {version.version} - {version.build} <br />
                    Mksk and Rae The Feature Me Project
                    ©{new Date().getFullYear()} Feature Me All rights reserved.
                </p>
            </div>
        </motion.div>
    )
}

export default Title