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


    const [productsS, setProductsS] = useState<Demo.Product[]>([]);
    const [productsP, setProductsP] = useState<Demo.Product[]>([]);



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
        ProductService.getProductsSmall().then((data) => setProductsS(data));

        ProductService.getProducts2().then((data2) => {
            console.log("Products P:", data2); // Verificar datos obtenidos
            setProductsP(data2);
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
                    <h6 className="mt-0 mb-3">{product.price}</h6>
                    <span className={`product-badge status-${product.inventoryStatus?.toLowerCase()}`}>{product.inventoryStatus}</span>
                    <div className="car-buttons mt-5">

                        <Button type="button" className="mr-2" rounded icon="pi pi-search" onClick={() => setDisplayBasic(true)}></Button>

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
    const priceBodyTemplate = (data: Demo.Product) => formatCurrency(data.price ?? 0);
    const confirmationDialogFooter = (
        <>
            <Button type="button" label="No" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Yes" icon="pi pi-check" onClick={() => setDisplayConfirmation(false)} text autoFocus />
        </>
    );



    return (


        <div className="grid">
             <section id="sobre-mi"/>

                        <Dialog header="Dialog" visible={displayBasic} style={{ width: '30vw' }} modal footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                            <p>
                               Mensaje emergente de prueba.
                            </p>
                        </Dialog>


             <div className="flex p-fluid "  style={{textAlign: "center"}}>
             <div className="col-12">
             <header>
      <h1>Mi Portafolio Personal</h1>
    </header>


    <div className="card">

      <section id="habilidades"/>
        <img src="../demo/images/avatar/profile.jpg" alt="perfil" />
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
                    <Carousel value={productsS} numVisible={3} numScroll={3} responsiveOptions={carouselResponsiveOptions} itemTemplate={carouselItemTemplate}></Carousel>
                    <h5>Debilidades</h5>
                    <Carousel value={productsP} numVisible={3} numScroll={3} responsiveOptions={carouselResponsiveOptions} itemTemplate={carouselItemTemplate}></Carousel>
                </div>

            </div>


        </div>
      <main>
          <div className="container"/>

              <div className="card">
                  <figure>
                      <img src="recursos/perfil.jpg" alt=""/>
                  </figure>
                  <div className="contenido">
                    <h3>Fortalezas</h3>
                    <ul>
                      <li><strong>Experto en QA, Diseño Gráfico, Animación y Modelado:</strong></li>
                      <p className="habilidades">Poseo un conocimiento profundo en áreas clave de la Ingeniería Multimedia, destacándome en aseguramiento de calidad (QA), diseño gráfico, animación y modelado. Estas competencias técnicas me permiten abordar proyectos desde múltiples enfoques, asegurando tanto la funcionalidad como la estética en cada entrega.</p>

                      <li><strong>Liderazgo y Trabajo en Equipo:</strong></li>
                      <p className="habilidades">Me distingo por mi capacidad para liderar y trabajar en equipo. Soy un profesional que sabe coordinar esfuerzos, motivar a sus compañeros y garantizar que los proyectos se completen de manera efectiva. Mi habilidad para colaborar lo convierte en un miembro valioso en cualquier equipo.</p>

                      <li><strong>Perfeccionismo:</strong></li>
                      <p className="habilidades">Con una atención al detalle excepcional, siempre busco entregar trabajos de alta calidad. Este perfeccionismo asegura que mis proyectos cumplan consistentemente con altos estándares, beneficiando tanto a mi equipo como a los clientes.</p>

                      <li><strong>Creatividad y Pasión por el Arte:</strong></li>
                      <p className="habilidades">Tengo un fuerte interés en los videojuegos, el dibujo y la pintura, lo que refleja una vena creativa robusta. Esta creatividad es una ventaja en cualquier proyecto que requiera un enfoque innovador y artístico.</p>
                    </ul>
                      <a href="index.html">Leer más</a>
                  </div>
              </div>

              <div className="card">
                  <figure>
                      <img src="img/Films.jpg" alt=""/>
                  </figure>
                  <div className="contenido">
                    <h3>Debilidades:</h3>
                    <ul>
                      <li><strong>Manejo de Bases de Datos:</strong></li>
                      <p className="habilidades">En el pasado, experimenté dificultades al trabajar con bases de datos. Este desafío me ha generado cierta inseguridad en tareas similares, lo que indica un área en la que podría enfocarme para desarrollar mayor confianza y habil</p>
                    <li><strong>Programación:</strong></li>
                    <p className="habilidades">A pesar de mi amplio conocimiento en otras áreas, la programación es un aspecto en el que siento que necesito mejorar. Esta limitación podría afectar mi capacidad para abordar ciertos proyectos de manera autónoma o para realizar tareas que requieran una integración técnica más profunda.
                    </p>

                    <li><strong>Comunicación y Paciencia:</strong></li>
                    <p className="habilidades">Aunque soy una líder competente y una excelente trabajadora en equipo, reconozco que necesito mejorar en la comunicación y en la paciencia. Fortalecer estas habilidades blandas me permitiría manejar mejor los conflictos, dar y recibir retroalimentación constructiva, y mantener un ambiente de trabajo más positivo.
                    </p>

                    <li><strong>Manejo del Estrés:</strong></li>
                    <p className="habilidades">El manejo del estrés es un desafío para mí, y reconozco que puedo sentirme abrumada bajo presión. Esta dificultad puede afectar mi productividad y bienestar, especialmente en situaciones que implican plazos ajustados o una carga de trabajo considerable.
                    </p>
                  </ul>
                      <a href="index.html">Leer más</a>
                  </div>
              </div>
            </main>
  </div>


      <section id="ejercicios">
        <h2>Ejercicios pasados en clase</h2>
        <ul>
          <li><a href="https://github.com/MariaSalazar1/clase_1.git">Ejercicio 1</a></li>
          <li><a href="https://github.com/MariaSalazar1/clase_2.git">Ejercicio 2</a></li>
          <li><a href="https://github.com/MariaSalazar1/clase_3.git">Ejercicio 3</a></li>
          <li><a href="https://docs.google.com/document/d/1GhxLlFXQvF0eRphdOhFPXYZr2Ji63i-0z40E-35rXY4/edit?usp=sharing">Ejercicio 4</a></li>
        </ul>
      </section>

      <section id="ejercicios">
        <h2>Ejercicios corte 2</h2>
        <ul>
          <li><a href="https://github.com/MariaSalazar1/CLASE-8-DEMPL-2.git">Ejercicio 1</a></li>
          <li><a href="https://github.com/MariaSalazar1/cards-corte2.git">Ejercicio 2</a></li>
        </ul>
      </section>
        </div>  
    );
    
};

export default Dashboard;
