import { Container } from "react-bootstrap";
import { useContext, useState } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import warning from "../img/warning.png"

 
const initialValue= {
    name: "",
    lastname: "",
    phone: "",
    email:"",
}

 export const Cart = () => {
    const [buyer, setBuyer] = useState(initialValue);

    const {reset, removeItem, items} = useContext(ItemsContext);

    const total = items.reduce((acc, act) => acc + act.price* act.quantity, 0)

    const handleChange = (ev) => {
        setBuyer((prev) => {
            return {...prev, [ev.target.name]: ev.target.value}
        })
    };

    const handleOrder = () => {
        const order = {
            buyer,
            items,
            total,
        };
    
    const database = getFirestore();
    const orderCollection = collection (database, "orders")

    addDoc(orderCollection, order).then(({id}) => {
        if(id) {
            alert("Su orden:" + id + "ha sido completada!");
            reset();
            setBuyer(initialValue)
        }
    });

    }

    if (!items.length){
        return <div className="containerNothing">
            <div className="styleAlert d-flex">
              <img className="styleAlert" src={warning} alt="alerta-nada" />  
            </div>

        <div>
            <h2 className="styleNothing">NO HAY NADA ACA</h2>
        </div>
        <Link to="/" className="styleLinkButton">
            <button className="styleGoBackButton buttonAdd">Volver a la pagina principal</button>
        </Link>
        </div>
    } 
    
    return (
    <Container>
        {items?.map(i => {
            return ( <div className="cartProduct" key={i.id}>
            <h1 className="classProduct" >Producto: {i.title} {i.model}</h1>
            <h2 className="classPrice" >Precio: ${i.price}</h2>
            <h3 className="classQuantity" >Cantidad de producto:{" "}{i.quantity}</h3>
            <img className="classImageCart" src={i.imageId} alt="imagen-producto"/>
            <span className="classRemoveButton" onClick={() => removeItem(i.id)}>X</span>
            </div>)
        })}
        <h4 className="classTotal" >Total: ${total}</h4>
        <div className="containerButtonReset">
            <button className="classReset" onClick={reset}>Vaciar</button>
        </div>
        <hr />
        {!!items.length && (
            <form className="styleForm">
                <div>
                    <h2 className="styleDatos">Ingresa tus datos</h2>
                </div>
                <div>
                    <label className="styleLabel" >Nombre</label>
                    <input className="styleInput" value={buyer.name} onChange={handleChange} name="name"/>
                </div>
                <div>
                    <label className="styleLabel">Apellido</label>
                    <input className="styleInput" value={buyer.lastname} onChange={handleChange} name="lastname"/>
                </div>
                <div>
                    <label className="styleLabel" >Telefono</label>
                    <input className="styleInput" value={buyer.phone} onChange={handleChange} name="phone"/>
                </div>
                <div>
                    <label className="styleLabel">Email</label>
                    <input className="styleInput" value={buyer.email} onChange={handleChange} name="email"/>
                </div>
                <button className="stylePurchase" type="button" onClick={handleOrder}>
                    Comprar
                </button>
            </form>
        )}
    </Container>
 )};