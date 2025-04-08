import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Transaction from "../models/Transaction";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "./jwt";

//Se tiene any y se debe de evitar porque se puede usar el valor que sea
export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //Comprobacion de email
  const userExists = await User.findOne({ email }); //Returns the first
  if (userExists) {
    const error = new Error("Correo ya registrado");
    res.status(409).json({ error: error.message });
    return;
  }

  const user = new User(req.body);
  user.password = await hashPassword(password);

  await user.save();
  res.status(201).end("Registro creado correctamente");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //Comprobacion de email (ver si esta registrado)
  const user = await User.findOne({ email }); //Returns the first
  if (!user) {
    const error = new Error("Este correo no esta vinculado a una cuenta");
    res.status(404).json({ error: error.message });
    return;
  }

  // Verificar password
  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("Password Incorrecto");
    res.status(401).json({ error: error.message });
    return;
  }

  //Se retorna JWT (solamente se manda el id)
  const token = generateJWT({ id: user._id });

  res.send(token);
};

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

export const initiateTransaction = async (req: Request, res: Response) => {
  const { recipientEmail, amount, currency, metadata } = req.body;
  
  if (recipientEmail === req.user.email) {
    const error = new Error("No se puede transferir a usted mismo");
    res.status(404).json({ error: error.message });
    return;
  }

  //Comprobacion de destinatario
  const recipientUser  = await User.findOne({ email: recipientEmail }); 
  if (!recipientUser ) {
    const error = new Error("El usuario destino no existe");
    res.status(404).json({ error: error.message });
    return;
  }

  if (recipientUser.balance < amount) {
    const error = new Error("Saldo insuficiente");
    res.status(404).json({ error: error.message });
    return;
  }

  //Se crea transaccion con el estado pending
  const transaction = new Transaction({
    sender: req.user._id,
    recipient: recipientUser._id,
    amount: amount,
    currency: currency || "MXN",
    status: "pending",
    metadata: metadata || ""
  })

  await transaction.save();
  req.user.balance -= amount;
  await req.user.save();

  //Se retorna el ID de la transaccion
  const token = generateJWT({ id: transaction._id });

  res.send(token);
};



export const validateTransaction = async (req: Request, res: Response) => {
  
  if (req.transaction.status !== "pending") {
    res.status(400).json({ error: "La transacción no está en estado pendiente"});
    return
  }

  req.transaction.status = 'authorized'
  await req.transaction.save()

  res.send("Transacción autorizada correctamente")
}

export const finishTransaction = async (req: Request, res: Response) => {
  
  if (req.transaction.status !== "authorized") {
    res.status(400).json({ error: "La transacción no está autorizada"});
    return
  }

  const recipient = await User.findById(req.transaction.recipient)

  recipient.balance += req.transaction.amount
  await recipient.save()

  req.transaction.status = 'completed'
  await req.transaction.save()

  res.send("Transacción finalizada correctamente")
  
}


export const transactionsHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { recipient: userId }],
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'username email')
      .populate('recipient', 'username email');
    
    const numTransactions = transactions.length;

    res.status(200).json({ 
      message: "Historial de transacciones obtenido correctamente",
      numTransactions,
      transactions 
    });
  } catch (error) {
    console.error("Error al obtener el historial de transacciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
