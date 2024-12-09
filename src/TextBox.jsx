import { useState } from "react";

function TextBox(){

    const [text,setText]=useState("")

    const OnSetText=(e)=>{
        setText(e.target.value)
    }

    return(<>
    <div>
    <input type= "text" onChange={OnSetText} value={text} />

    </div>
        
        </>
    )

}

export default TextBox
