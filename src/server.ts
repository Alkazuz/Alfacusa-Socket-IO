import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Novo cliente conectado");

    // aqui você pode adicionar eventos de escuta ao socket individual
    socket.on("im", (message) => {
        console.log(message)
        if(message == "Alfacusa JDA"){ // identificação da socket JDA
            // adicionando o cliente à sala "jda"
            socket.join("jda");
            console.log("JDA conectada na sala");
        }else if(message == "backend"){ // identificação do cliente do backend
            // adicionando o cliente à sala "backend"
            socket.join("backend");
            console.log("backend conectada na sala");
        }
    });

    // evento quando o backend envia informações da coleta de daily
    socket.on("daily-collect", (message) => {
        console.log(`Recebida informações da coleta de daily do usuário ${JSON.stringify(message)}`);
        // emitindo informações para a jda
        io.to("jda").emit("daily-collect", message);
    });

    // evento quando o backend envia informações da coleta de gemas
    socket.on("gems-collect", (message) => {
        console.log(`Recebida informações da coleta de gemas do usuário ${JSON.stringify(message)}`);
        // emitindo informações para a jda
        io.to("jda").emit("gems-collect", message);
    });

    // evento quando o backend envia informações para adicionar gemas a um usuário
    socket.on("gems", (message) => {
        console.log(`Recebida informações da coleta de gemas para um usuário ${JSON.stringify(message)}`);
         // emitindo informações para a jda
         io.to("jda").emit("gems", message);
    });

    // evento quando o backend envia informações de compra de um usuário
    socket.on("shop", (message) => {
        console.log(`Recebida informações de compra na lojinha ${message}`);
        // emitindo informações para a jda
        io.to("jda").emit("shop", message);
    });

    // evento quando o backend envia informações sobre alterações de background
    socket.on("background", (message) => {
        console.log(`Recebida informações de background do usuário ${message}`);
        // emitindo informações para a jda
        io.to("jda").emit("background", message);
    });

    // evento quando o backend envia informações de compra de premium
    socket.on("premium", (message) => {
        console.log(`Recebida informações de compra premium do usuário ${message}`);
        // emitindo informações para a jda
        io.to("jda").emit("premium", message);
    });

    // evento quando o backend envia informações de atualização de policiais/médicos
    socket.on("profission", (message) => {
        // emitindo informações para a jda
        io.to("jda").emit("profission", message);
    });

    socket.on("christmas", (message) => {
        // emitindo informações para a jda
        io.to("jda").emit("christmas", message);
    });

});

httpServer.listen(process.env.PORT || 2299, 
    () => {console.log(`Rodando na porta ${process.env.PORT || 2299}`)}
);