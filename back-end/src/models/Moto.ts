import Veiculo from "./Veiculo";

export default class Moto extends Veiculo {
    private quantidadePassageiros: number;

    constructor(marca: string, modelo: string, anoFabricacao: number, quantidadePassageiros: number) {
        super(marca,modelo, anoFabricacao, 0);
        this.quantidadePassageiros = quantidadePassageiros;
    }

    getDetalhes(): Record<string, any> {
        const detalhesVeiculo = super.getDetalhes();
        detalhesVeiculo["quantidadePassageiros"] = this.quantidadePassageiros;
        return detalhesVeiculo;
      }
  }