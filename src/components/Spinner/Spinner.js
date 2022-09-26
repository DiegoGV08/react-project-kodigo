import React, { Fragment } from "react";
import spinnerImg from '../../assets/img/loading.gif'

let Spinner = ()=>{
    return(
        <Fragment>
            <div>
                <img src={spinnerImg} alt="" className="d-block m-auto" style = {{width:"200px"}}/>
            </div>
        </Fragment>
    )
}

export default Spinner;