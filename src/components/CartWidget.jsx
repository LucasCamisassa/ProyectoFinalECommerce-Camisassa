import React from "react";
import carritoCompra from "../img/carritoCompra.png"
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; 

function CarritoCompra () {



    return(
        <Link className="btn-carrito-style" to='/cart' >
        <div >
            <button className="btn-carrito-style"><img className="class-img-cartWidget" src={carritoCompra} alt="logo-carrito" /></button>
        </div>
        </Link>
    )
}

export default CarritoCompra