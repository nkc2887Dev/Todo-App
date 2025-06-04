import { Response } from 'express';

export interface IConfig {
  MONGO: {
    URL: string;
  };
  PORT: string;
}

export interface ITodo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface SendResponseParams {
  res: Response;
  success: boolean;
  message?: string;
  data?: any;
  statusCode?: number;
} 