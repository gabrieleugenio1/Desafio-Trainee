import Veiculo from "./Veiculo";

export default class Carro extends Veiculo {
  constructor(marca: string, modelo: string, anoFabricacao: number, quantidadePortas: number ) {
    super(marca, modelo, anoFabricacao, quantidadePortas);
    if (quantidadePortas < 2 || quantidadePortas > 4) {
      throw new Error('A quantidade de portas deve ser entre 2 e 4.');
    }
  }

  getDetalhes(): Record<string, any> {
    const detalhesVeiculo = super.getDetalhes();
    return detalhesVeiculo;
  }
}
