export default class Veiculo {
    private modelo: string;
    private anoFabricacao: number;
    private quantidadePortas: number;
    private marca: string;



    constructor(marca: string, modelo: string, anoFabricacao: number, quantidadePortas: number) {
      this.modelo = modelo;
      this.anoFabricacao = anoFabricacao;
      this.quantidadePortas = quantidadePortas;
      this.marca = marca;
    }
    getDetalhes(): Record<string, any> {
      return {
        marca: this.marca,
        modelo: this.modelo,
        anoFabricacao: this.anoFabricacao,
        quantidadePortas: this.quantidadePortas,
      };
    }
  }