import { Request, Response } from "express";
import User from "../models/User";
import slug, { extend } from "slug";
import formidable from 'formidable';
import { v4 as uuid } from 'uuid'
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "./jwt";
import cloudinary from "../config/cloudinary";

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

  //Comprobacion de handle
  const handle = slug(req.body.handle, "");
  const handleExists = await User.findOne({ handle });
  if (handleExists) {
    const error = new Error("Usuario no disponible");
    res.status(409).json({ error: error.message });
    return;
  }

  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.handle = handle;

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

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description, links } = req.body;
    
    //Comprobacion de handle
    const handle = slug(req.body.handle, "");
    const handleExists = await User.findOne({ handle });
    if (handleExists && handleExists.email !== req.user.email) {
      const error = new Error("Usuario no disponible");
      res.status(409).json({ error: error.message });
      return;
    }
    //Actualizar usuario
    req.user.handle = handle;
    req.user.description = description;
    req.user.links = links

    await req.user.save();
    res.send("Perfil actualizado correctamente");
  } catch (e) {
    const error = new Error("Hubo un error");
    res.status(500).json({ error: error.message });
    return
  }
};

export const uploadImage = async (req: Request, res: Response) => {

  const form = formidable({ multiples: false })

  try {
    form.parse(req, (error, fields, files) => {
      console.log()
      cloudinary.uploader.upload(files.file[0].filepath, {public_id: uuid()}, async function (error, result) {
        if (error) {
          const error = new Error("Hubo un error al subir la imagen");
          res.status(500).json({ error: error.message });
          return
        }
        if (result) {
          req.user.image = result.secure_url
          await req.user.save()
          res.json({image: result.secure_url})
        }
      })
    })
  } catch (e) {
    const error = new Error("Hubo un error");
    res.status(500).json({ error: error.message });
    return
  }
}