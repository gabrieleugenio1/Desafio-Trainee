import syncRequest from "sync-request";
import { Response, Request } from "express";

export default class Challenge4Controller {
  static index(req: Request, res: Response) {
    try {
      const { ceps } = req.body;
      if (!ceps || !Array.isArray(ceps) || ceps.length < 1) {
        return res.status(400).json({ error: "Forneça pelo menos 1 CEP." });
      }
      const validCeps = ceps.filter(
        (cep) => typeof cep === "string" && cep.length === 8
      );

      const results = [];

      for (const cep of validCeps) {
        try {
          const response = syncRequest(
            "GET",
            `https://viacep.com.br/ws/${cep}/json/`
          );
          const data = JSON.parse(response.getBody("utf8"));
          results.push(data);
        } catch (error) {
          results.push({ cep, erro: "CEP não encontrado" });
        }
      }
      res.status(200).json({ results });
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: "Erro ao consultar CEP's." });
    }
  }
}
