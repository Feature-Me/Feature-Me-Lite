import React from "react";
import { useNavigate } from "react-router";
import { MdChevronLeft } from "react-icons/md";

import style from "./floatHeader.scss";

interface headerProps {
    backFunc?: Function
    title: string
}

const FloatHeader: React.FC<headerProps> = (props) => {

    const navigate = useNavigate();

    function backFunc() {
        if (props.backFunc) props.backFunc();
        else navigate(-1);
    }

    return (
        <header {...props} className={style.header}>
            <div className={style.iconWrapper} onClick={backFunc}>
                <MdChevronLeft className={style.icon} />
            </div>
            <h2>{props.title}</h2>
        </header>
    )
}

export default FloatHeader;