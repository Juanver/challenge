import React, {useState, useEffect} from 'react';
import LogoRimac from './images/first-scren/logo-rimac.png'
import ImageTracking from './images/first-scren/image-tracking.svg';
import IconPhone from './images/first-scren/icon-phone.svg';
import { useHistory } from 'react-router-dom';
// import Chevrot from './images/first-scren/chevrot.svg';

const Home = () => {
  // States
  const [data, setData] = useState({
    document: 'DNI',
    documentNumber: '',
    cellphone: '',
    tag: '',
    termsConditions: false
  });
  const [consult, setConsult] = useState(false);
  const [result, setResult] = useState({});
  const [ error, updateError ] = useState(false);

  const [ numberBool, setNumberBool] = useState(false);
  const [ cellphoneBool, setCellphoneBool] = useState(false);
  const [ tagBool, setTagBool] = useState(false)

  const formMessage = {
    documentNumber: 'Número de documento es requerido',
    cellphone: 'Número de celular es requerido',
    tag: 'Número de placa es requerido'
  }

  // ejecucion y validación de la data mientras se van llenando los campos
  const updateData = (e) =>{
    
    if(e.target.name === "documentNumber"){
      if(e.target.value.trim() === ''){
        setNumberBool(true)
      } else{
        setNumberBool(false)
      }
    }else if(e.target.name === "cellphone"){
      if(e.target.value.trim() === ''){
        setCellphoneBool(true)
      }else{
        setCellphoneBool(false)
      }
    } else if (e.target.name === "tag"){
      if(e.target.value.trim() === ''){
        setTagBool(true)
      }else{
        setTagBool(false)
      }
    }

    if(e.target.name==="termsConditions"){
      setData({
        ...data,
        termsConditions : !termsConditions
      })
    } else{
      setData({
        ...data,
        [e.target.name]: e.target.value
      })
    }
  }
  
  // Extraer valores
  const { document, documentNumber, cellphone, tag, termsConditions } = data;

  // Submit
  let history = useHistory();
  const submitData = (e) =>{
    e.preventDefault();
    //  Validación general
    if(document.trim() === '' || documentNumber.trim() === '' || cellphone.trim() === '' || tag.trim() === '' || termsConditions === false){
      updateError(true);
      return;
    }
    console.log(result);
    updateError(false);
    setConsult(true);
    history.push(`./arma-tu-plan/${data.documentNumber}/${data.tag}`);
  }

  // useEffect y consulta a la API de acorde al ID, en este caso de acorde al número de documento.
  // el número de documento solo puede tomar valores del 1 al 10 porque se tiene de referencia el id de la API.
  useEffect(() => {
    const consultApi = async() => {
      if(consult){
        const url = `https://jsonplaceholder.typicode.com/users/${documentNumber}`;
        const response = await fetch(url);
        const result = await response.json();
        setResult(result);
        setData({
          document: '',
          documentNumber: '',
          cellphone: '',
          tag: '',
          termsConditions: false
        })
      }
    }

    consultApi();
  }, [consult])

  return (
    <div className="container-fluid">
      <div className="row custom_height">
        <div className="col-12 col-md-4 tracking">
          <div className="tracking__content">
            <div className="container-logo mt-3">
              <div><img src={LogoRimac} alt="Logo Rimac"/></div>
              <span><img src={IconPhone} alt="Icono telefono"/> <a href="#">Llámanos</a></span>
            </div>
            <div className="tracking__content-flex">
              <div className="container-person mt-5">
                <img src={ImageTracking} alt="Seguros vehicular tracking"/>        
              </div>
              <div className="container-info mt-3">
                <p>¡NUEVO!</p>
                <h1>Seguro <span>Vehicular Tracking</span></h1>
                <p>Cuéntanos dónde le harás seguimiento a tu seguro</p>
              </div>
            </div>
            <div className="footer">
              <p>© 2021 RIMAC Seguros y Reaseguros.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div className=" contact-top">
            <p>¿Tienes alguna duda? <span><img src={IconPhone} alt="Icono telefono"/> (01) 411 6001</span></p>
          </div>
          <div className="main-form">
            <h2>Déjanos tus datos</h2>
            <form onSubmit={submitData}>
              <div className="main-form__custom">
                <select className="form-select" id="document" name="document" onChange={updateData} value={document}>
                  <option value="DNI">DNI</option>
                  <option value="Other">Otros</option>
                </select>
                <input 
                  id="documentNumber" 
                  name="documentNumber" 
                  type="text" 
                  className="form-control mb-3" 
                  placeholder="Nro. de doc"
                  onChange={updateData}
                  value={documentNumber}
                />
                { numberBool ? <p>{formMessage.documentNumber}</p> : null}
              </div>
              <input 
                id="cellphone" 
                name="cellphone" 
                type="text" 
                className="form-control mb-3" 
                placeholder="Celular"
                onChange={updateData}
                value={cellphone}
              />
              { cellphoneBool ? <p>{formMessage.cellphone}</p> : null}
              <input 
                id="tag" 
                name="tag" 
                type="text" 
                className="form-control mb-3" 
                placeholder="Placa"
                onChange={updateData}
                value={tag}
              />
              { tagBool ? <p>{formMessage.tag}</p> : null}
              <div className="form-check mb-5">
                <input 
                  id="termsConditions" 
                  name="termsConditions" 
                  type="checkbox" 
                  className="form-check-input" 
                  onChange={updateData}
                  checked={termsConditions}
                />
                <label className="form-check-label" htmlFor="termsConditions">
                  Acepto la <a href="#">Política de Protección de Datos Personales</a> y los <a href="#">Términos y Condiciones.</a>
                </label>
              </div>
              { error ? <p className="main-form__message">Todos los campos son requeridos</p> : null}
              <button type="submit" className="btn btn-primary">COTÍZALO</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;