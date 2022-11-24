import React from "react";

import style from "./background.scss"

import backgroundImage from "Assets/Images/tidal wreck-AO.png";
import GlitchImage from "Components/glitchImage/glitchImage";

const Background: React.FC<{ onload?: Function }> = (props) => {

    return (
        <GlitchImage src={backgroundImage} className={style.backgroundimg} />
    )
}

export default Background;
