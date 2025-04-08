import { Router } from "express";
import { body } from "express-validator";
import { createAccount, finishTransaction, getUser, initiateTransaction, login, transactionsHistory, validateTransaction } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticateUser } from "./middleware/authUser";
import { authenticateTransaction } from "./middleware/authTransaction";

//Routes creation
const router = Router();


// User
router.post(
  "/users/register",
  body("username").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("email").isEmail().withMessage("E-mail no válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password es muy corto, mínimo es 8 caracteres"),
  handleInputErrors,
  createAccount
);

router.post(
  "/users/login",
  body("email").isEmail().withMessage("E-mail no válido"),
  body("password").notEmpty().withMessage("El password es obligatorio"),
  handleInputErrors,
  login
);

router.get("/users/information", authenticateUser, getUser);


//Transactions
router.post(
  "/transactions/initiate",
  body("recipientEmail").isEmail().withMessage("El correo del destinatario es obligatorio"),
  body("amount").isFloat({ gt: 0 }).withMessage("El monto debe ser mayor a cero"),
  handleInputErrors,
  authenticateUser,
  initiateTransaction)

router.put(
  "/transactions/validate",
  authenticateUser,
  authenticateTransaction,
  validateTransaction)

router.put(
  "/transactions/complete",
  authenticateUser,
  authenticateTransaction,
  finishTransaction)

router.get(
  "/transactions/history",
  authenticateUser,
  transactionsHistory
)

export default router;
