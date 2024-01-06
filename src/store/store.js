import { makeAutoObservable } from "mobx";

class Store {
    pokemon = [];
    filter = "";

    constructor() {
        makeAutoObservable(this)
    }

    setPokemon(pokemon) {
        this.pokemon = pokemon;
    }
    setFilter(filter) {
        this.filter = filter;
    }
}

const store = new Store();

export default store;