import { Request, Response } from 'express';
import Challenge1Controller from '../controllers/challenge-1';

const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
} as unknown as Response;

describe('isPalindrome', () => {
  it('deve retornar true para um número palíndromo', () => {
    expect(Challenge1Controller.isPalindrome(121)).toBe(true);
  });

  it('deve retornar false para um número não palíndromo', () => {
    expect(Challenge1Controller.isPalindrome(123)).toBe(false);
  });
});

describe('index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar um array de números palíndromos', () => {
    const req = { body: { min: 100, max: 200 } } as Request;

    Challenge1Controller.index(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([101, 111, 121, 131, 141, 151, 161, 171, 181, 191]);
  });

  it('deve retornar um erro 400 para valores inválidos', () => {
    const req = { body: { min: 'abc', max: 'def' } } as Request;

    Challenge1Controller.index(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Valores inválidos. Certifique-se de que os valores são números válidos.',
    });
  });

  it('deve retornar um erro 400 para valores inválidos', () => {
    const req = { body: { min: 'abc', max: 'def' } } as Request;
  
    Challenge1Controller.index(req, mockResponse);
  
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Valores inválidos. Certifique-se de que os valores são números válidos.',
    });
  });
  
  it('deve retornar um erro 500 para um erro inesperado', () => {
    const req = { body: { min: 100, max: 200 } } as Request;
    jest.spyOn(Challenge1Controller, 'isPalindrome').mockImplementation(() => {
      throw new Error('Erro inesperado');
    });
  
    Challenge1Controller.index(req, mockResponse);
  
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Erro ao processar a solicitação.',
    });
  });
});
