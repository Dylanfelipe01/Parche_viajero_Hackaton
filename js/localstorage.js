class CartStorage {
    // Clave única para identificar el objeto en el localStorage
    static CLAVE_STORAGE = "parche-viajero-carrito";

    /**
     * aca retorno el array que haya previamente en el localstorage
     * @returns {Array}
     */

    //funcion para obtener lo que haya en el localStorage
    static obtener() {
        try {
            const datos = localStorage.getItem(this.CLAVE_STORAGE);
            return datos ? JSON.parse(datos) : [];
        } catch (error) {
            console.error("Error al leer localStorage:", error);
            return [];
        }
    }

    /**
     * Guarda el estado actual del carrito en el localStorage.
     * @param {Array} carrito - Arreglo de objetos del carrito.
     */

    //guarda lo que haya en el carrito
    static guardar(carrito) {
        try {
            localStorage.setItem(this.CLAVE_STORAGE, JSON.stringify(carrito));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }

    // Elimina el carrito almacenado
    static limpiar() {
        localStorage.removeItem(this.CLAVE_STORAGE);
    }
}