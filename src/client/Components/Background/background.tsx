import React from "react";

import style from "./background.scss"

import backgroundImage from "Assets/Images/tidal wreck-AO.png";

const Background: React.FC<{ onload?: Function }> = (props) => {

    return (
        <div className={style.backgroundvanvas}>
            <img src={backgroundImage} className={style.backgroundimg} />
        </div>
    )
}

export default Background;
