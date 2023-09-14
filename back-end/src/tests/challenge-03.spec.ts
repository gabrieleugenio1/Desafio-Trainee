import { Request, Response } from "express";
import Challenge3Controller from "../controllers/challenge-3";  
import Carro from "../models/Carro";
import fs from "fs";

describe("Challenge3Controller", () => {
  it("deve adicionar um veículo Moto corretamente", () => {
    const req = {
      body: {
        brand: "Honda",
        model: "CG 125",
        year: 2020,
        doorsCar: 0,
        passengers: 1,
      },
    } as Request;

    const jsonMock = jest.fn();

    const res = {
      status: jest.fn(() => ({ json: jsonMock })),
    } as unknown as Response;

    Challenge3Controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Veículo adicionado com sucesso.",
    });
  });

  it("deve adicionar um veículo Carro corretamente", () => {
    const req = {
      body: {
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        doorsCar: 4,
        passengers: 4,
      },
    } as Request;

    const jsonMock = jest.fn();

    const res = {
      status: jest.fn(() => ({ json: jsonMock })),
    } as unknown as Response;

    Challenge3Controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Veículo adicionado com sucesso.",
    });
  });

  it("deve retornar erro 400 para valores inválidos", () => {
    const req = {
      body: {
        brand: "",
        model: "",
        year: "abc",
        doorsCar: "invalid",
        passengers: "NaN",
      },
    } as Request;

    const jsonMock = jest.fn();

    const res = {
      status: jest.fn(() => ({ json: jsonMock })),
    } as unknown as Response;

    Challenge3Controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      error:
        "Valores inválidos. Certifique-se de que os valores são números válidos e que todos os campos foram preenchidos.",
    });
  });

  it("deve retornar erro da classe carro para portas menores que 2 ou maiores que 4", () => {


    const req = {
      body: {
        brand: "fiat",
        model: "sedan",
        year: "2020",
        doorsCar: "6",
        passengers: "0",
      },
    } as Request;

    const jsonMock = jest.fn();

    const res = {
      status: jest.fn(() => ({ json: jsonMock })),
    } as unknown as Response;

    Challenge3Controller.index(req, res);

    expect(() => new Carro(req.body.brand, req.body.model, req.body.year, req.body.doorsCar)).toThrowError(
      'A quantidade de portas deve ser entre 2 e 4.'
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Erro ao processar os dados do veículo.",
    });
  });
});

it("deve retornar erro 500 para um erro inesperado", () => {
  const req = {
    body: {
      brand: "Honda",
      model: "CG 125",
      year: 2020,
      doorsCar: 0,
      passengers: 1,
    },
  } as Request;

  const jsonMock = jest.fn();

  const res = {
    status: jest.fn(() => ({ json: jsonMock })),
  } as unknown as Response;

  jest.spyOn(fs, "existsSync").mockImplementation(() => {
    throw new Error("Erro inesperado");
  });

  Challenge3Controller.index(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(jsonMock).toHaveBeenCalledWith({
    error: "Erro ao processar os dados do veículo.",
  });
});
