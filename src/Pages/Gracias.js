import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Header from '../Components/Header';

import imagePerson from '../images/third-screen/image-person.svg';

import '../styles/components/third.scss'

const Gracias = () => {
    // states
    const [consult, setConsult] = useState(true);
    const [result, setResult] = useState({});

    // Parámetros que comunica la vista anterior con la vista actual
    const {id} = useParams();
    
    // useEffect y consulta a la API de acorde al ID, para que muestre nos otros datos en esta vista.
    useEffect(() => {
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

    return ( 
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="container-image">
                            <img src={imagePerson} alt="persona Rimac"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="text">
                            <h2><span>¡Te damos la bienvenida!</span> 
                            Cuenta con nosotros para proteger tu vehículo</h2>
                            <p>Enviaremos la confirmación de compra de tu Plan Vehícular Tracking a tu correo:
                             {result.email}</p>
                            <div>
                                <button className="btn btn-primary">CÓMO USAR MI SEGURO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
     );
}
 
export default Gracias;