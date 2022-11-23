import React from "react";

import version from "Config/versions.json";

import style from "./title.scss";

const Title: React.FC = () => {
    return (
        <div className={style.title}>
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
        </div>
    )
}

export default Title