import mongoose, { Document, Schema, Types } from "mongoose";

export type TransactionStatus =
  | "pending"
  | "authorized"
  | "completed"
  | "failed";

export interface ITransaction extends Document {
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  amount: number;
  currency: string;
  status: TransactionStatus;
  metadata?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Definición del Schema de Transacción
const transactionSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "MXN",
    },
    status: {
      type: String,
      enum: ["pending", "authorized", "completed", "failed"],
      default: "pending",
      required: true,
    },
    metadata: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Se crea el modelo 'Transaction' usando el schema definido y se exporta.
const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

export default Transaction;
