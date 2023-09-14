import { Request, Response } from "express";
import Challenge2Controller from "../controllers/challenge-2";

describe("Challenge2Controller", () => {
  it("deve calcular o troco corretamente", () => {
    const req = {
      body: {
        valueDelivered: 200, 
        amountPaid: 127,
      },
    } as Request;

    const jsonMock = jest.fn();

    const res = {
      status: jest.fn(() => ({ json: jsonMock })),
    } as unknown as Response;

    Challenge2Controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      notes100: 0, 
      notes10: 7,
      notes1: 3, 
    });
  });

  it("deve retornar erro 400 para valores inválidos", () => {
    const req = {
      body: {
        valueDelivered: "abc",
        amountPaid: 127,
      },
    } as Request;

    const jsonMock = jest.fn();

    const res = {
      status: jest.fn(() => ({ json: jsonMock })),
    } as unknown as Response;

    Challenge2Controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      error:
        "Valores inválidos. Certifique-se de que os valores são números válidos e que o valor entregue é maior ou igual ao valor pago.",
    });
  });

  it("deve retornar erro 400 para valor entregue menor que valor pago", () => {
    const req = {
      body: {
        valueDelivered: 50, 
        amountPaid: 100,
      },
    } as Request;

    const jsonMock = jest.fn();

    const res = {
      status: jest.fn(() => ({ json: jsonMock })),
    } as unknown as Response;

    Challenge2Controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      error:
        "Valores inválidos. Certifique-se de que os valores são números válidos e que o valor entregue é maior ou igual ao valor pago.",
    });
  });
});
