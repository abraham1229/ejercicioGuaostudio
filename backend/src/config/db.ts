import colors from "colors";
import mongoose from "mongoose";
//Conection to database
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.cyan.bold(`MongoDB conectado en ${url}`));
  } catch (error) {
    console.log(colors.red(error.message));
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB desconectado");
  } catch (error) {
    console.error(`Error al desconectar MongoDB: ${error}`);
  }
};
