import {Socket} from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket, io:SocketIO.Server) => {
  const usuario =  new Usuario( cliente.id);
  usuariosConectados.agregar(usuario);

}


export const desconectar = (cliente: Socket, io:SocketIO.Server) =>{
    cliente.on('disconnect',() =>{
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

export const mensaje =  (cliente: Socket, io: SocketIO.Server) =>{
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
    })
}

export const confiUsuario =  (cliente: Socket, io: SocketIO.Server) =>{
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: any) => {
       usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
       io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre } configurado`
        })
    })
}


export const obtenerUsuarios =  (cliente: Socket, io: SocketIO.Server) =>{
    cliente.on('obtener-usuarios', () => {
       io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    })
}