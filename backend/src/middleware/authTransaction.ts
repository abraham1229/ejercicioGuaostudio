import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Transaction, { ITransaction } from "../models/Transaction";

declare global {
  namespace Express {
    interface Request {
      transaction?: ITransaction;
    }
  }
}

export const authenticateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transactionToken = req.header("x-transaction-token");
  if (!transactionToken) {
    const error = new Error("Falta token de transacción");
    res.status(401).json({ error: error.message });
    return;
  }

  try {
    const result = jwt.verify(transactionToken, process.env.JWT_SECRET);

    if (typeof result === "object" && result.id) {
      const transaction = await Transaction.findById(result.id);
      if (!transaction) {
        const error = new Error("El usuario no existe");
        res.status(404).json({ error: error.message });
        return;
      }
      req.transaction = transaction
      next()
    }
  } catch (error) {
    res.status(500).json({ error: "Token no valido" });
  }
};
