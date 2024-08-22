import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


export const ItemCount = ({stock, onAdd}) => {
    
    const [count, setCount] = useState(1);

    const notify = () => toast(
        <Link to='/cart'>
            <button  className="toast-button">Tu producto fue agregado al carrito de compra. Haz clic aqui para ir</button>
        </Link>
        
    );
    
    
    
    const handleIncrease = () => {
        if(count < stock){
            setCount((prev) => prev + 1)
        }
    };
    
    const handleDecrease = () => {
        if(count > 1){
            setCount((prev) => prev - 1)
        }
    };
    
    const handleAdd = () => {
        onAdd(count);
        setCount(1);
    };
    
    return <>
    <div className="containerCount">
    <button className="buttonIncrease" onClick={handleIncrease} >+</button>
    <span className="classCount" >{count}</span>
    <button className="buttonDecrease" onClick={handleDecrease} >-</button>
    </div>
    <div>
     <hr/>
    <button className="buttonAdd" onClick={() => { handleAdd(); notify(); }} >Agregar al carrito</button>
    <ToastContainer />   
    </div>
    </>
    
    
}