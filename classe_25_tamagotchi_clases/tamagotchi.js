export class Tamagotchi {


    // Atributos privados. Se modifican solamente a través de metodos de la clase
    #felicidad;
    #responsabilidad;
    #limpieza;
    #energia;
    #enVida;

    constructor(arrayImagenes, nombre = "", personalidad = "") {
        // Atributos publicos
        this.arrayImagenes = arrayImagenes;
        this.nombre = nombre;
        this.personalidad = personalidad;
        
        // Atributos privados
        this.#responsabilidad = 5;
        this.#limpieza = 5;
        this.#energia = 5;
        this.#felicidad = 5;
        this.#enVida = true;
    }

    #validarLimites () {
        if (this.#energia <= 0 || this.#responsabilidad <= 0) {
            this.#enVida = false;
        }
        this.#felicidad = Math.max(0, Math.min(10, this.#felicidad));
        this.#responsabilidad = Math.max(0, Math.min(10, this.#responsabilidad));
        this.#limpieza = Math.max(0, Math.min(10, this.#limpieza));
        this.#energia = Math.max(0, Math.min(10, this.#energia));
    }
    
    tiempo() {
        this.#felicidad -= 1;
        this.#responsabilidad -= 1;
        this.#limpieza -= 1;
        this.#energia -= 1;
        this.#validarLimites();
    }

    duchar() {
        this.#limpieza += 10;
        this.#felicidad -= 2;
        this.#energia -= 2;
        this.#validarLimites();
    }

    alimentar() {
        this.#energia += 5;
        this.#felicidad += 1;
        this.#limpieza -= 2;
        this.#responsabilidad -= 1;
        this.#validarLimites();
    }

    jugar() {
        this.#felicidad += 6;
        this.#responsabilidad -= 2;
        this.#limpieza -= 4;
        this.#energia -= 2;
        this.#validarLimites();
    }

    dormir() {
        this.#energia += 5;
        this.#responsabilidad -= 2;
        this.#felicidad += 1;
        this.#validarLimites();
    }

    reprender() {
        this.#responsabilidad += 5;
        this.#felicidad -= 5;
        this.#validarLimites();
    }

    acariciar() {
        this.#felicidad += 2;
        this.#responsabilidad -= 1;
        this.#validarLimites();
    }

    crear() {
        this.#felicidad = parseInt(Math.random() * 10 + 1);
        this.#responsabilidad = parseInt(Math.random() * 10 + 1);
        this.#limpieza = parseInt(Math.random() * 10 + 1);
        this.#energia = parseInt(Math.random() * 10 + 1);
    }

    reiniciar() {
        this.#enVida = true;
        this.nombre = "";
        this.personalidad = "";
        this.#felicidad = 5;
        this.#responsabilidad = 5;
        this.#limpieza = 5;
        this.#energia = 5;
    }

    actualizar() {
        if ((this.#felicidad == 0 || this.#responsabilidad == 0 || this.#limpieza == 0 || this.#energia == 0)) {
            this.#enVida = false;
        }
        return {v: this.#enVida, f: this.#felicidad, r: this.#responsabilidad, l: this.#limpieza, e: this.#energia};
    }

}


