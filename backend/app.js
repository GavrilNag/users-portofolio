"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const constants_1 = __importDefault(require("../config/constants"));
class App {
    constructor(appInit) {
        this.app_domain = constants_1.default.app.domain;
        this.app_port = constants_1.default.app.port;
        this.app = (0, fastify_1.default)({
            logger: {
                prettyPrint: {
                    translateTime: "SYS:h:MM:ss",
                    colorize: true,
                    ignore: "pid,hostname",
                },
            },
        });
        this.app.addHook("preHandler", (req, _reply, done) => {
            if (req.body) {
                req.log.info({ body: req.body }, "parsed body");
            }
            done();
        });
        this.register(appInit.plugins);
        this.routes(appInit.routes);
    }
    register(plugins) {
        plugins.forEach((plugin) => {
            this.app.register(plugin);
        });
    }
    routes(routes) {
        routes.forEach((route) => {
            const router = new route();
            this.app.register(router.routes, { prefix: router.prefix_route });
        });
        this.app.get("/healthcheck", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            reply.send({ healthcheck: "server is alive" });
        }));
    }
    listen() {
        this.app.listen(this.app_port, (err) => {
            if (err) {
                this.app.log.fatal({ msg: `Application startup error`, err });
                process.exit(1);
            }
            console.log(`App listening on the http://${this.app_domain}:${this.app_port} 🚀`);
        });
    }
}
exports.default = App;
