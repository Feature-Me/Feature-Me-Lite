import React from "react";
import { animations, motion, useAnimation } from "framer-motion";

import version from "Config/versions.json";

import style from "./title.scss";

import clickSound from "Assets/Sounds/click.mp3";
import { Howl } from "howler";
import { useNavigate } from "react-router";
import sleep from "Utils/sleep/sleep";

const Title: React.FC = () => {
    const navigate = useNavigate();

    const animationController =  useAnimation();

    const audio = new Howl({
        src: clickSound,
        volume: 0.5,
        loop: false,
        autoplay: false,
    });

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

    const exit = {
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }

    async function clickTitle() {
        audio.play();
        animationController.start(exit)
        await sleep(1000);
        navigate("/load");

    }

    React.useEffect(()=>{
        animationController.start(animaiton);
        return()=>{
            audio.unload();
        }
    },[])

    return (
        <motion.div className={style.title} initial={init} animate={animationController} onClick={clickTitle} exit={exit}>
            <div></div>
            <div className={style.titleText}>
                <h1>Feature Me</h1>
                <p>Click to begin</p>
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