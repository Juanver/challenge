import React from 'react';
import { Link } from 'react-router-dom';

import LogoRimac from '../images/first-scren/logo-rimac.png'
import IconPhone from '../images/first-scren/icon-phone.svg';

import '../styles/components/header.scss';

const Header = () => {
    return ( 
        <header>
            <div className="container-header">
                <div className="container-header__flex">
                    <Link to="/">
                        <img src={LogoRimac} alt="logo Rimac"/>
                    </Link>
                    <div>
                        <div className="contact">
                            <p>¿Tienes alguna duda?
                                <span><img src={IconPhone} alt="icono telefono"/> (01) 411 6001</span>
                            </p>
                        </div>
                        <div className="contact-mobile">
                            <span><img src={IconPhone} alt="icono telefono"/> Llámanos</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
     );
}
 
export default Header;