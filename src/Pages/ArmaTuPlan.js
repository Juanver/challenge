import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Header from '../Components/Header';

import iconLlanta from '../images/second-screen/icon-llanta.svg';
import iconChoque from '../images/second-screen/icon-choque.svg';
import iconAtropello from '../images/second-screen/icon-atropello.svg';
import person from '../images/second-screen/person.svg';
import chevrot from '../images/second-screen/chevrot.svg';

import '../styles/components/second.scss';


const ArmaTuPlan = () => {

    const [consult, setConsult] = useState(true);
    const [result, setResult] = useState({});
    var [quantity, setQuantity] = useState(14300);
    var [mount, setMount] = useState(20);
    const [mount16k, setMount16k] = useState(true);
    const [mountrobo, setMountrobo] = useState(true);
    const [mountatropello, setMountatropello] = useState(true);

    const clickNothing = (e) =>{
        e.preventDefault()
    }

    // Parámetros que comunica la vista anterior con la vista actual
    const {id} = useParams ();
    const {tag} = useParams ();

    // useEffect y consulta a la API de acorde al ID, para que muestre nos otros datos en esta vista.
    useEffect(() => {
        handleMountRobo();
        const consultApi = async() => {
          if(consult){
            const url = `https://jsonplaceholder.typicode.com/users/${id}`;
            const response = await fetch(url);
            const result = await response.json();
            setResult(result);
          }
        }
            
        consultApi();
    }, [consult])

    // método que incrementa el valor de la SUMA ASEGURADA
    const increment = () =>{
        
        quantity = quantity + 100;
        if(quantity > 16000){
            setMount16k(false)
        }else{
            setMount16k(true)
        }
        if(quantity <= 16500){
            setQuantity(quantity)
        }else{
            quantity = 16500
            setQuantity(quantity)
        }
    }
    // método que disminuye el valor de la SUMA ASEGURADA
    const decrement = () =>{
        quantity = quantity - 100;
        if(quantity > 16000){
            setMount16k(false)
        }else{
            setMount16k(true)
        }
        if(quantity >= 12500){
            setQuantity(quantity)
        }else{
            quantity = 12500
            setQuantity(quantity)
        }

    }

    // evento para la coberturas de robo de llantas
    const handleMountRobo = () =>{
        setMountrobo(!mountrobo)
        
        if(mountrobo){
            mount = mount + 15
        }else{
            mount = mount - 15
        }
        setMount(mount)
    } 

    // evento para la coberturas de choques y/o pasarte la luz roja
    const handleMountChoque = () =>{
        setMount16k(!mount16k)
        
        if(mount16k){
            mount = mount + 20
        }else{
            mount = mount - 20
        }
        setMount(mount)
    }

    const handleMountAtropello = () =>{
        setMountatropello(!mountatropello)
        
        if(mountatropello){
            mount = mount + 50
        }else{
            mount = mount - 50
        }
        setMount(mount)
    }

    // evento mandar como true la consulta
    const handleClick = () =>{
        setConsult(true);
    }
    
    return ( 
        <Fragment>
            <Header/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3 bg-gray">
                        <div className="index">
                            <div className="index__item">
                                <span>1</span>
                                <p>Datos</p>
                            </div>
                            <div className="index__item">
                                <span>2</span>
                                <p>Arma tu plan</p>
                            </div>
                        </div>
                        <div className="index-mobile">
                            <div className="index-mobile__item">
                                <Link to="/"><img src={chevrot} /></Link>
                                <p>Paso 2 de 2</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-9 custom-padding">
                        <div className="information">
                            <div className="information__back">
                                <Link to="/">VOLVER</Link>
                            </div>
                            <div className="information__name">
                                <h1>¡Hola, <span>{result.name}!</span></h1>
                                <p>Conoce las coberturas para tu plan</p>
                            </div>
                            
                            <div className="information__container">
                                <div className="information__container-right">
                                    <div className="information__name-mobile">
                                        <h1>Mira las coberturas</h1>
                                        <p>Conoce las coberturas para tu plan</p>
                                    </div>
                                    <div className="information__container-right__car">
                                        <div>
                                            <p>Placa: {tag}</p>
                                            <h3>Wolkswagen 2019 Golf</h3>   
                                        </div>
                                        <img src={person} alt="persona rimac"/>
                                    </div>
                                    <div className="information__container-right__calc">
                                        <div className="information__container-right__calc-sum">
                                            <p>Indica la suma asegurada</p>
                                            <div>
                                                <p>MIN $12,500</p>
                                                <p>MAX $16,500</p>
                                            </div>
                                        </div>
                                        <div className="quantity">
                                            <button type="button" onClick={decrement}  className="quantity__button">-</button>
                                            <input type="number" className="quantity__input" onChange={setQuantity} value={quantity}/>
                                            <button type="button" onClick={increment}  className="quantity__button">+</button>
                                        </div>
                                    </div>
                                    <div className="information__container-right__add">
                                        <div className="information__container-right__add-title">
                                            <h3>Agrega o quita coberturas</h3>
                                        </div>
                                        <div className="information__container-right__add-tab">
                                            <ul className="nav nav-tabs">
                                                <li className="nav-item">
                                                    <a className="nav-link active" aria-current="page" onClick={clickNothing}>PROTEGE A TU AUTO</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link disabled">PROTEGE A LOS QUE TE RODEAN</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link disabled">MEJORA TU PLAN</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="information__container-right__add-items">
                                            <img src={iconLlanta} />
                                            <div>
                                                <h3>Llanta robada</h3>
                                                { mountrobo ? <button type="button" onClick={handleMountRobo}>+ Agregar</button> : <button type="button" onClick={handleMountRobo}>- Quitar</button>}
                                                <p>He salido de casa a las cuatro menos cinco para ir a la academia de ingles de mi pueblo (Sant Cugat, al lado de Barcelona) con mi bici, na llego a la academia que está en el centro del pueblo en una plaza medio-grande y dejo donde siempre la bici atada con una pitón a un sitio de esos de poner las bicis y mucho más</p>
                                            </div>
                                        </div>
                                        <div className="information__container-right__add-items">
                                            <img src={iconChoque} />
                                            <div>
                                                <h3>Choque y/o pasarte la luz roja </h3>
                                                { mount16k ? <button type="button" onClick={handleMountChoque}>+ Agregar</button> : <button type="button" onClick={handleMountChoque}>- Quitar</button>}
                                            </div>
                                        </div>
                                        <div className="information__container-right__add-items">
                                            <img src={iconAtropello} />
                                            <div>
                                                <h3>Atropello en la vía Evitamiento </h3>
                                                { mountatropello? <button type="button" onClick={handleMountAtropello}>+ Agregar</button> : <button type="button" onClick={handleMountAtropello}>- Quitar</button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="information__mount">
                                    <div className="information__mount-exact">
                                        <p>MONTO</p>
                                        <h3>$ {mount}</h3>
                                        <p>mensuales</p>
                                    </div>
                                    <div className="information__mount-price">
                                        <h3>El precio incluye:</h3>
                                        <p>Llanta de respuesto</p>
                                        <p>Analisis de motor</p>
                                        <p>Aros gratis</p>
                                    </div>
                                    <Link to={`/gracias/${id}`}><button className="btn btn-primary" onClick={handleClick}>LO QUIERO</button></Link>
                                </div>
                                <div className="information__mount-mobile">
                                    <div className="information__mount-mobile__exact">
                                        <h3>$ {parseFloat(mount).toFixed(2)}</h3>
                                        <p>mensuales</p>
                                    </div>
                                    <Link to={`/gracias/${id}`}><button className="btn btn-primary" onClick={handleClick}>LO QUIERO</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <h1>Arma tu plan</h1> 
            <pre>
                {JSON.stringify(user, null, 3)}
            </pre> */}
        </Fragment>
    );
}
 
export default ArmaTuPlan;