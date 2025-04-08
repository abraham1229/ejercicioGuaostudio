import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, initiateTransaction, login, validateTransaction } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

//Routes creation
const router = Router();
// Autenticacion y registro
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

router.get("/users/information", authenticate, getUser);

router.post(
  "/transactions/initiate",
  body("recipientEmail").isEmail().withMessage("El correo del destinatario es obligatorio"),
  body("amount").isFloat({ gt: 0 }).withMessage("El monto debe ser mayor a cero"),
  handleInputErrors,
  authenticate,
  initiateTransaction)


router.put(
  "/transactions/validate",
  authenticate,
  validateTransaction)
// router.patch(
//   "/user",
//   body("handle").notEmpty().withMessage("El handle no puede ir vacio"),
//   body("description").notEmpty().withMessage("La descripcion no puede ir vacia"),
//   handleInputErrors,
//   authenticate,
//   updateProfile
// );

// router.post('/user/image', authenticate, uploadImage)

export default router;
