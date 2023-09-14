import { Request, Response } from "express";
import Moto from "../models/Moto";
import Carro from "../models/Carro";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(__dirname, "../" + "data.json");

export default class Challenge3Controller {
  static index(req: Request, res: Response): Response {
    try {
      let { brand, model, year, doorsCar, passengers } = req.body;

      doorsCar = parseInt(doorsCar);
      passengers = parseInt(passengers);
      year = parseInt(year);

      if (
        isNaN(doorsCar) ||
        isNaN(passengers) ||
        isNaN(year) ||
        brand === "" ||
        model === ""
      ) {
        return res.status(400).json({
          error:
            "Valores inválidos. Certifique-se de que os valores são números válidos e que todos os campos foram preenchidos.",
        });
      }

      let veiculo = null;

      if (doorsCar === 0) {
        veiculo = new Moto(brand, model, year, passengers);
      } else {
    
        veiculo = new Carro(brand, model,  year,  doorsCar);
      }

      let jsonData = [];
      if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath, "utf-8");
        jsonData = JSON.parse(rawData);
      }
      jsonData.push(veiculo.getDetalhes());

      fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));

      return res.status(200).json({ message: "Veículo adicionado com sucesso." });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao processar os dados do veículo." });
    }
  }
}
