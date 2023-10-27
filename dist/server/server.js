"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("../routes/index.routes"));
//como se va a crear a que puerto se a crear
class Server {
    //trae los recursos que va a ocupar el servidor
    constructor() {
        //hace referencia para donde vamos a levnatr el servidor
        this.app = (0, express_1.default)();
        //ayudantes a este entorno o levantarlo 
        this.middlewares();
    }
    //lo que va a ocupar para poder correr
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        //la velocidad que va a correr
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
        this.app.use('/', index_routes_1.default);
    }
    listen() {
        this.app.listen((this.port = process.env.PORT || Server.PORT), () => {
            console.log(`Server is running import ${this.port}`);
        });
    }
}
Server.PORT = 3000; // se le asigan en nuestra variable si no funciona o deja de corre el 8000 pasa a 3000 ejemplo
exports.default = Server;
//# sourceMappingURL=server.js.map