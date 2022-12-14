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
        }else if(message == "backend"){ // identificação do cliente do backend
            // adicionando o cliente à sala "backend"
            socket.join("backend");
            console.log("backend conectada na sala");
        }
    });

    // evento quando o backend envia informações da coleta de daily
    socket.on("daily-collect", (userid: string, total: number) => {
        console.log(`Recebida informações da coleta de daily do usuário ${userid} que recebe ${total}`);
        // emitindo informações para a jda
        io.to("jda").emit("gems-collect", userid, total);
    });

    // evento quando o backend envia informações da coleta de gemas
    socket.on("gems-collect", (userid: string, total: number) => {
        console.log(`Recebida informações da coleta de gemas do usuário ${userid} que recebe ${total}`);
        // emitindo informações para a jda
        io.to("jda").emit("gems-collect", userid, total);
    });

    // evento quando o backend envia informações para adicionar gemas a um usuário
    socket.on("gems", (userid: string, total: number) => {
        console.log(`Recebida informações de gemas para o usuário ${userid} que recebe ${total}`);
        // emitindo informações para a jda
        io.to("jda").emit("gems", userid, total);
    });

    // evento quando o backend envia informações de compra de um usuário
    socket.on("shop", (userid: string, shop: string, item: string, price: number) => {
        console.log(`Recebida informações de compra do usuário ${userid}, comprou ${item} no preço de ${price}`);
        // emitindo informações para a jda
        io.to("jda").emit("shop", userid, shop, item, price);
    });

    // evento quando o backend envia informações sobre alterações de background
    socket.on("background", (userid: string, background: string) => {
        console.log(`Recebida informações de background do usuário ${userid}, ${background}`);
        // emitindo informações para a jda
        io.to("jda").emit("background", userid, background);
    });

});

httpServer.listen(process.env.PORT || 3000, 
    () => {console.log(`Rodando na porta ${process.env.PORT || 3000}`)}
);