interface Pessoa {
  nome: string;
  idade: number;
  email?: string;
}

const pessoa1: Pessoa = {
  nome: "Amanda",
  idade: 18,
  email: "amanda@email.com"
};

const pessoa2: Pessoa = {
  nome: "Eduarda",
  idade: 18
};

console.log(pessoa1);
console.log(pessoa2);
