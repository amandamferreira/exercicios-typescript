// Classe base Carro
class Carro {
  marca: string;
  modelo: string;
  ano: number;

  constructor(marca: string, modelo: string, ano: number) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
  }

  obterDetalhes(): string {
    return `Marca: ${this.marca}, Modelo: ${this.modelo}, Ano: ${this.ano}`;
  }
}

// Classe derivada CarroEletrico com herança
class CarroEletrico extends Carro {
  autonomiaBateria: number;

  constructor(marca: string, modelo: string, ano: number, autonomiaBateria: number) {
    super(marca, modelo, ano);
    this.autonomiaBateria = autonomiaBateria;
  }

  // Sobrescrevendo o método obterDetalhes
  obterDetalhes(): string {
    return `${super.obterDetalhes()}, Autonomia: ${this.autonomiaBateria}km`;
  }
}

// Testando as classes
const carro1 = new Carro("Toyota", "Corolla", 2020);
console.log(carro1.obterDetalhes());

const carro2 = new CarroEletrico("Tesla", "Model 3", 2023, 500);
console.log(carro2.obterDetalhes());
