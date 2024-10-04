/* eslint-disable @next/next/no-img-element */
'use client';

import { Carousel } from 'primereact/carousel';
import { Galleria } from 'primereact/galleria';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '@/types';
import { ChartData, ChartOptions } from 'chart.js';
import { Dialog } from 'primereact/dialog';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Toast } from 'primereact/toast';
import { confirmPopup } from 'primereact/confirmpopup';

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
const Dashboard = () => {

    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);


    const [fortalezas, setFortalezas] = useState<Demo.Product[]>([]);
    const [debilidades, setDebilidades] = useState<Demo.Product[]>([]);



    const carouselResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        ProductService.getFortalezas().then((data) => setFortalezas(data));

        ProductService.getDebilidades().then((data2) => {
            console.log("Products P:", data2); // Verificar datos obtenidos
            setDebilidades(data2);
        });

    }, []);

    const carouselItemTemplate = (product: Demo.Product) => {
        return (
            <div className="border-1 surface-border border-round m-1 text-center py-5">
                <div className="mb-3">
                    <img src={`/demo/images/product/${product.image}`} alt={product.name} className="w-6 shadow-2" />
                </div>
                <div>
                    
                    <h4 className="p-mb-1">{product.name}</h4>
                    <p className='p-5' style={{textAlign:'justify'}}>{product.description}</p>
                    
                    <div className="car-buttons mt-5">

                      

                    </div>
                </div>
            </div>
        );
    };
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleTop, setVisibleTop] = useState(false);
    const [visibleBottom, setVisibleBottom] = useState(false);
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [products, setProducts] = useState<Demo.Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Demo.Product | null>(null);
    const op = useRef<OverlayPanel>(null);
    const op2 = useRef<OverlayPanel>(null);
    const toast = useRef<Toast>(null);

    const accept = () => {
        toast.current?.show({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
            life: 3000
        });
    };

    const reject = () => {
        toast.current?.show({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000
        });
    };

    const confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };
    const toggle = (event: ButtonEvent) => {
        op.current?.toggle(event);
    };

    const toggleDataTable = (event: ButtonEvent) => {
        op2.current?.toggle(event);
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const basicDialogFooter = <Button type="button" label="OK" onClick={() => setDisplayBasic(false)} icon="pi pi-check" outlined />;
    const imageBodyTemplate = (data: Demo.Product) => (
        <img
            src={`/demo/images/product/${data.image}`}
            alt={data.image}
            className="product-image"
            width="60"
            style={{
                boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
            }}
        />
    );
  



    return (


        <div className="grid">
             <section id="sobre-mi"/>

                        


             <div className="flex p-fluid "  style={{textAlign: "center"}}>
             <div className="col-12">
             <header>
      <h1>Mi Portafolio Personal</h1>
    </header>


    <div className="card">

      <section id="habilidades"/>
      <img src="../demo/images/avatar/profile.webp" alt="perfil" style={{ maxWidth: '45%', height: '240px' }} />

        <h2>Sobre Mí</h2>
        <p>
          Soy estudiante de octavo semestre de ingeniería multimedia,
          actualmente trabajo en el Registro Único Nacional de Tránsito (Runt) y
          anteriormente colaboré en Aranda Software. A mis 22 años, he
          desarrollado habilidades sólidas en trabajo en equipo y gestión de
          proyectos, lo que me permite contribuir efectivamente en entornos
          colaborativos y tecnológicos.
        </p>
      </div>
            </div>

            </div>






    <div id="Tarjeta" className="Tarjetas">



      <div className="flex p-fluid">
            <div className="col-12">

                <div className="card">
                <h2 id="likeme" className="color_acento">Habilidades</h2>
                    <h5>Fortalezas</h5>
                    <Carousel value={fortalezas} numVisible={3} numScroll={3} responsiveOptions={carouselResponsiveOptions} itemTemplate={carouselItemTemplate}></Carousel>
                    <h5>Debilidades</h5>
                    <Carousel value={debilidades} numVisible={3} numScroll={3} responsiveOptions={carouselResponsiveOptions} itemTemplate={carouselItemTemplate}></Carousel>
                </div>

            </div>


        </div>
      <main>
          <div className="container"/>

          <div className="card">
      <div className="contenido">
        <h3>Actividades</h3>

        <section id="ejercicios">
          <h2>Ejercicios pasados en clase</h2>
          <ul>
            <li>
              <a 
                href="https://github.com/MariaSalazar1/clase_1.git" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ejercicio 1
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/MariaSalazar1/clase_2.git" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ejercicio 2
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/MariaSalazar1/clase_3.git" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ejercicio 3
              </a>
            </li>
            <li>
              <a 
                href="https://docs.google.com/document/d/1GhxLlFXQvF0eRphdOhFPXYZr2Ji63i-0z40E-35rXY4/edit?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ejercicio 4
              </a>
            </li>
          </ul>
        </section>

        <section id="ejercicios">
          <h2>Ejercicios corte 2</h2>
          <ul>
            <li>
              <a 
                href="https://github.com/MariaSalazar1/CLASE-8-DEMPL-2.git" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ejercicio 1
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/MariaSalazar1/cards-corte2.git" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ejercicio 2
              </a>
            </li>
          </ul>
        </section>

        <a 
          href="https://stackblitzstarters6wj8br-ccg4--8080--134daa3c.local-credentialless.webcontainer.io" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Ir al portafolio anterior
        </a>
      </div>
    </div>

              
            </main>
  </div>


      
        </div>  
    );
    
};

export default Dashboard;
