function calcularIMC(peso: number, altura: number): number {
  return peso / (altura * altura);
}

function classificarIMC(imc: number): string {
  if (imc < 18.5) return "Abaixo do peso";
  else if (imc < 25) return "Peso normal";
  else if (imc < 30) return "Sobrepeso";
  else return "Obesidade";
}

const imc = calcularIMC(60, 1.65);
console.log("IMC:", imc.toFixed(2));
console.log("Classificação:", classificarIMC(imc));
