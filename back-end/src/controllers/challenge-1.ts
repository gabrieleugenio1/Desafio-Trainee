import { Request, Response } from "express";

export default class Challenge1Controller {
  static isPalindrome(number: number): boolean {
    const strNumber = number.toString();
    const reversedStr = strNumber.split("").reverse().join("");
    return strNumber === reversedStr;
  }

  static index(req: Request, res: Response): Response {
    try {
      const { min, max } = req.body; 
      if (isNaN(Number(min)) || isNaN(Number(max))) {
        return res
          .status(400)
          .json({
            error:
              "Valores inválidos. Certifique-se de que os valores são números válidos.",
          });
      }

      const palindromes: number[] = [];
      for (let i = parseInt(min as string); i <= parseInt(max as string); i++) {
        if (Challenge1Controller.isPalindrome(i)) {
          palindromes.push(i);
        }
      }

      return res.status(200).json(palindromes);
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
      return res
        .status(500)
        .json({ error: "Erro ao processar a solicitação." });
    }
  }
}
