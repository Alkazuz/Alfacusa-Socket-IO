import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Novo cliente conectado");

    // aqui você pode adicionar eventos de escuta ao socket individual
    socket.on("im", (message) => {
        if(message == "Alfacusa JDA"){ // identificação da socket JDA
            // adicionando o cliente à sala "jda"
            socket.join("jda");
            console.log("JDA conectada na sala");
        }else if(message == "website"){ // identificação do cliente do website
            // adicionando o cliente à sala "website"
            socket.join("website");
            console.log("website conectada na sala");
        }
    });

    // evento quando algum cliente informações da coleta de daily
    socket.on("daily", (userid: string, total: number) => {
        console.log(`Recebida informações da coleta de daily do usuário ${userid} que recebe ${total}`);
        // emitindo informações de daily para todos as jda's da sala 'jda'
        io.to("jda").emit("daily", userid, total);
    });

});

httpServer.listen(process.env.PORT || 3000, 
    () => {console.log(`Rodando na porta ${process.env.PORT || 3000}`)}
);