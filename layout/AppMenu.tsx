/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Sobre Mí', icon: 'pi pi-fw pi-eye', to: '#sobre-mi', badge: 'NEW' },
                { label: 'Habilidades', icon: 'pi pi-fw pi-eye', to: '#habilidades', badge: 'NEW' },
                { label: 'Ejercicios en Clase', icon: 'pi pi-fw pi-eye', to: '#ejercicios', badge: 'NEW' }
            ]
        }

    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}


            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
