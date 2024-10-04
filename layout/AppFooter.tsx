/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
             <div className="social-icons">
    <a
      href="https://www.linkedin.com/in/maria-paula-salazar-fresneda-00716021b"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-linkedin"></i>
    </a>
    <a
      href="https://www.instagram.com/maryfresneda?igsh=MXAwcW9paWRtY245Mg%3D%3D&utm_source=qr"
      target="_blank"
      rel="noopener noreferrer"
      className="instagram"
    >
      <i className="fab fa-instagram"></i>
    </a>
    <a
      href="https://www.facebook.com/mariapaula.fresneda/"
      target="_blank"
      rel="noopener noreferrer"
      className="facebook"
    >
      <i className="fab fa-facebook"></i>
    </a>
  </div>
            
        </div>
    );
};

export default AppFooter;
