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
const jwt_1 = __importDefault(require("@fastify/jwt"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const zod_1 = require("zod");
const server = (0, fastify_1.default)();
server.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
server.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
server.register(jwt_1.default, {
    secret: "supersecret",
});
server.register(swagger_1.default, {
    openapi: {
        info: {
            title: "SampleApi",
            description: "Sample backend service",
            version: "1.0.0",
        },
        servers: [],
    },
    transform: fastify_type_provider_zod_1.jsonSchemaTransform,
});
server.register(swagger_ui_1.default, {
    routePrefix: "/documentation",
});
const LOGIN_SCHEMA = zod_1.z.object({
    username: zod_1.z.string().max(32).describe("Some description for username"),
    password: zod_1.z.string().max(32),
});
server.after(() => {
    server.withTypeProvider().route({
        method: "POST",
        url: "/login",
        schema: { body: LOGIN_SCHEMA },
        handler: (req, res) => {
            console.log(req.body);
            res.send("ok");
        },
    });
});
server.withTypeProvider().route({
    method: "GET",
    url: "/",
    // Define your schema
    schema: {
        querystring: zod_1.z.object({
            name: zod_1.z.string().min(4),
        }),
        response: {
            200: zod_1.z.string(),
        },
    },
    handler: (req, res) => {
        res.send(req.query.name);
    },
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.ready();
        yield server.listen({
            port: 4949,
        });
        console.log(`Documentation running at http://localhost:4949/documentation`);
    });
}
run();
