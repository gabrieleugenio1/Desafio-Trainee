import Challenge4Controller from '../controllers/challenge-4';
import { Request, Response } from 'express';
import mockRequire from 'mock-require';

type RequestWithBody = Request & { body: { ceps: string[] } };

const mockRequest = (body: { ceps: string[] }): RequestWithBody => ({
  body,
}) as RequestWithBody;

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Challenge4Controller', () => {
  beforeEach(() => {
    mockRequire('sync-request', () => {
      throw new Error('Erro simulado durante a chamada ao sync-request');
    });
  });

  afterEach(() => {
    mockRequire.stopAll();
  });

  it('deve receber "CEP" verdadeiro', () => {
    const req = mockRequest({ ceps: ['12345678', '87654321'] });
    const res = mockResponse();

    Challenge4Controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({"results": [{"erro": true}, {"erro": true}]});
  });

  it('deve receber valores inválidos', () => {
    const req = mockRequest({ ceps: ['123', 'invalid'] });
    const res = mockResponse();

    Challenge4Controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({"results": []});
  });

  it('deve receber input vázio', () => {
    const req = mockRequest({ ceps: [] });
    const res = mockResponse();

    Challenge4Controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({"error": "Forneça pelo menos 1 CEP."});

  });


  
});
