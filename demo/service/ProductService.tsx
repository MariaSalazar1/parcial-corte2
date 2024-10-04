import { Demo } from '@/types';

export const ProductService = {
    getFortalezas() {
        return fetch('/demo/data/fortalezas.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProducts() {
        return fetch('/demo/data/products.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProductsWithOrdersSmall() {
        return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },
    getDebilidades() {
        return fetch('/demo/data/debilidades.json', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
            .then((d) => d.data2 as Demo.Product[]);
}

};
