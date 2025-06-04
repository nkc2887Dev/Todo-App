import type { Request, Response } from 'express';
import * as todoService from '../services/todo.service';
import { sendResponse } from '../utils/sendResponse';
import MESSAGE from '../constants/message.constant';

export const getAllTodos = async (_req: Request, res: Response): Promise<void> => {
    try {
        const todos = await todoService.getAllTodos();
        sendResponse({
            res,
            success: true,
            data: todos,
            message: MESSAGE.SUCCESS.TODO.FETCHED
        });
    } catch (error) {
        sendResponse({
            res,
            success: false,
            message: MESSAGE.ERROR.INTERNAL_SERVER,
            statusCode: 500
        });
    }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.body;
        const todo = await todoService.createTodo(title);

        sendResponse({
            res,
            success: true,
            data: todo,
            message: MESSAGE.SUCCESS.TODO.CREATED,
            statusCode: 201
        });
    } catch (error) {
        sendResponse({
            res,
            success: false,
            message: MESSAGE.ERROR.INTERNAL_SERVER,
            statusCode: 500
        });
    }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const todo = await todoService.updateTodo(id, updates);

        if (!todo) {
            return sendResponse({
                res,
                success: false,
                message: MESSAGE.ERROR.TODO.NOT_FOUND,
                statusCode: 404
            });
        }

        sendResponse({
            res,
            success: true,
            data: todo,
            message: MESSAGE.SUCCESS.TODO.UPDATED
        });
    } catch (error) {
        sendResponse({
            res,
            success: false,
            message: MESSAGE.ERROR.INTERNAL_SERVER,
            statusCode: 500
        });
    }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const todo = await todoService.deleteTodo(id);

        if (!todo) {
            return sendResponse({
                res,
                success: false,
                message: MESSAGE.ERROR.TODO.NOT_FOUND,
                statusCode: 404
            });
        }

        sendResponse({
            res,
            success: true,
            message: MESSAGE.SUCCESS.TODO.DELETED
        });
    } catch (error) {
        sendResponse({
            res,
            success: false,
            message: MESSAGE.ERROR.INTERNAL_SERVER,
            statusCode: 500
        });
    }
}; 