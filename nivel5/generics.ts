// Exemplo de função genérica
function retornarPrimeiro<T>(arr: T[]): T {
  return arr[0];
}

// Teste com números
const numeros = [10, 20, 30];
console.log(retornarPrimeiro(numeros)); 

// Teste com strings
const nomes = ["Fernanda", "Amanda", "Eduarda"];
console.log(retornarPrimeiro(nomes)); 
