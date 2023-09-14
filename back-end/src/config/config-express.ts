import express, { Request, Response, Express } from "express";
import cors from "cors";

export default function configExpress(app: Express) {

  //Configurando o express
  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Página não encontrada: 404
  app.get("*", (req: Request, res: Response) => {
    res.status(404).json({message:'Página não encontrada.'});
  });
};

