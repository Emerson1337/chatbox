import { Connection } from '../entities/Connection';
import { io } from '../http';
import { ConnectionService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesServices';

interface IParams {
  text: string,
  email: string
}

io.on("connect", (socket) => {
  const connectionService = new ConnectionService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on("client_first_access", async (params) => {

    const socket_id = socket.id;
    const { text, email } = params as IParams;
    const userExists = (await usersService.findByEmail(email));
    let user_id = null;


    if (!userExists) {
      const user = await usersService.create(email);
      await connectionService.create({
        socket_id,
        user_id: user.id
      })
      user_id = user.id;
    } else {
      user_id = userExists.id;
      const connection = await connectionService.findByUserId(userExists.id);
      if (!connection) {
        await connectionService.create({
          socket_id,
          user_id: userExists.id
        })
      } else {
        connection.socket_id = socket_id; //sobrescrevendo o id existente
        await connectionService.create(connection)
      }
    }

    await messagesService.create({
      text,
      user_id
    })

    const allMessages = await messagesService.findByIdUserMessages(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionService.findAllWithoutAdmin();
    io.emit("admin_list_all_user", allUsers);

  });


  socket.on("client_send_to_admin", async params => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await connectionService.findBySocketId(socket.id)

    const message = await messagesService.create({
      text,
      user_id
    })

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id
    })

  })
})