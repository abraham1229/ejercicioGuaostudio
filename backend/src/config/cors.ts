import {CorsOptions} from 'cors'

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {

    const whiteList = [process.env.FRONTEND_URL]
    if (process.argv[2] === '--api') {
      whiteList.push(undefined)
    }
    if (process.env.NODE_ENV === 'test') {
      whiteList.push(undefined);
    }
    
    if (whiteList.includes(origin)) {
      callback(null, true) //Se acepta conexion
    } else {
      callback(new Error('Error de CORS'))
    }
  }
}