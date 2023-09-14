import { Request, Response } from "express";

export default class Challenge2Controller {
  static index(req: Request, res: Response): Response {
    let { valueDelivered, amountPaid } = req.body;
    valueDelivered = parseInt(valueDelivered);
    amountPaid = parseInt(amountPaid);

    if (
      isNaN(amountPaid) ||
      isNaN(valueDelivered) ||
      valueDelivered < amountPaid
    ) {
      return res.status(400).json({
        error:
          "Valores inválidos. Certifique-se de que os valores são números válidos e que o valor entregue é maior ou igual ao valor pago.",
      });
    }
    const change = valueDelivered - amountPaid;
    const notes100 = Math.floor(change / 100);
    const notes10 = Math.floor((change % 100) / 10);
    const notes1 = change % 10;

    return res.status(200).json({
      notes100:notes100,
      notes10: notes10,
      notes1: notes1,
    });
  }
}
