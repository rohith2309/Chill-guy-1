import { useEffect, useRef, useState } from "react"
///import TextBox from "./TextBox"
import chillg from './assets/chillguyv1.png'
//import { Button } from "@/components/ui/button"




function ViewField(){

const canvasRef=useRef(null)

const [text,setText]=useState("");
const [size,setSize]=useState(24);



const[gcolor1,setcolor1]=useState('#ff0000');
const[gcolor2,setcolor2]=useState('#0000ff');

const[tcolor,setTcolor]=useState('#fffff');



// Position and dragging states
const [position, setPosition] = useState({ x: 100, y: 100 });
const [isDragging, setIsDragging] = useState(false);
const [offset, setOffset] = useState({ x: 0, y: 0 });

const handleChangeFontColor=(tcolor)=>{
    setTcolor(tcolor)
}

const handleColorChange=(color,index)=>{

    if(index===0)
        setcolor1(color)
        
    else 
        setcolor2(color);

}


const OnSetText=(e)=>{
        setText(e.target.value)
    }

const OnsetSize=(e)=>{
    setSize(e.target.value)
}    

/*const handleWidth=(e)=>{
    setWidth(e.target.value);
}
const handleHeight=(e)=>{
    setHeight(e.target.value);
}*/


useEffect(()=>{

    const img=new Image()
    img.src=chillg

    const canvas=canvasRef.current
    const context=canvas.getContext('2d')

    const gradient=context.createLinearGradient(0,0,0,canvas.height)
    gradient.addColorStop(0,gcolor1)
    
    gradient.addColorStop(1,gcolor2);
    
    
    context.fillStyle=gradient
    context.fillRect(0,0,canvas.width,canvas.height)

    img.onload = ()=>{
       
        context.drawImage(img,position.x,position.y,65,110)
        
    }
    

    context.font=`${size}px Arial`
    context.fillStyle = tcolor;
    context.fillText(text,100,100)

},[text,size,gcolor1,gcolor2,tcolor,position])

const downloadImg=()=>{
    const ctx=canvasRef.current
    const img=ctx.toDataURL('image/png')
    const link=document.createElement('a')
    link.href=img
    link.download="chillguy.png"
    link.click()
}

 // Mouse down handler for dragging
 const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setOffset({ x: x - position.x, y: y - position.y });
    setIsDragging(true);
  };

  // Mouse move handler for dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({
      x: x - offset.x,
      y: y - offset.y
    });
  };

  // Mouse up handler to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

return(<>
    <div>
           <h1>MAKE YOUR OWN CHILL GUY DP</h1>

            <div>
                <canvas  ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                width={180} height={180}/>
            </div>
            
            <div>
                <label>Custom Text:</label><br/>
                <input type="text" onChange={OnSetText} value={text}/><br/>
                <label>Set the size</label>
                <input type="range" onChange={OnsetSize} value={size}/><br/>
                <label>Set the text color:</label><br/>
                <input type ="color" onChange={(e)=>handleChangeFontColor(e.target.value)} value={tcolor}/><br/>
                {/* <label>Set the width of the image:</label><br/>
                <input type="number" onChange={handleWidth} value={width}/>
                <label>Set the height of the image:</label><br/>
                <input type="number" onChange={handleHeight} value={height}/> */}


            </div>
            
           

            <div>
                <input type="color" onChange={(e)=>handleColorChange(e.target.value,0)}  value={gcolor1} />
                <label >C1</label>
            </div>

            <div>
                <input type="color" onChange={(e)=>handleColorChange(e.target.value,1)} value={gcolor2} />
                <label >C2</label>
            </div>

            <div>
              <button  onClick={downloadImg}>Download</button>
              

            </div>

    </div>
    </>
)


}
export default ViewField