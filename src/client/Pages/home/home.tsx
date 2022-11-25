import FloatHeader from "Components/floatHeader/floatHeader";
import React from "react";
import { useNavigate } from "react-router";

import style from "./home.scss";

const Home:React.FC = () =>{

    const navigate  = useNavigate();

    return(
        <div className={style.home}>
            <FloatHeader title="Home" backFunc={()=>navigate("/title")} />
            
        </div>
    )
}

export default Home