import { performance } from "perf_hooks";

function logTempoExecucao(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const metodoOriginal = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const inicio = performance.now();

    try {
      const resultado = metodoOriginal.apply(this, args);
      return resultado;
    } finally {
      const fim = performance.now();
      console.log(`[${propertyKey}] executado em ${(fim - inicio).toFixed(2)}ms`);
    }
  };

  return descriptor;
}


// Exemplo de uso do Decorator
class Carros {
  constructor(private modelo: string, private tipo: string, private ano: number) {}

  @logTempoExecucao
  obterDetalhes() {
    for (let i = 0; i < 1e6; i++) {} // simula processamento
    return `Modelo: ${this.modelo}, Tipo: ${this.tipo}, Ano: ${this.ano}`;
  }
}

// Teste
const meuCarro = new Carros("Tesla", "Model", 3);
console.log(meuCarro.obterDetalhes());
