import colors from 'colors'
import server from './server'

const port = process.env.PORT || "4000" // Se lee en cuando se se haga el deployment

server.listen(port, () => {
  console.log(colors.blue.bold(`Servidor funcionando en el puerto: ${port}`));
});
