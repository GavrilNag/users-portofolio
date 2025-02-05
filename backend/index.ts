import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";
import { z } from "zod";

import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  "h-Custom": string;
}

interface IReply {
  200: { success: boolean };
  302: { url: string };
  "4xx": { error: string };
}

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "SampleApi",
      description: "Sample backend service",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/documentation",
});

const LOGIN_SCHEMA = z.object({
  username: z.string().max(32).describe("Some description for username"),
  password: z.string().max(32),
});

server.after(() => {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/login",
    schema: { body: LOGIN_SCHEMA },
    handler: (req, res) => {
      console.log(req.body);
      res.send("ok");
    },
  });
});

server.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/",
  // Define your schema
  schema: {
    querystring: z.object({
      name: z.string().min(4),
    }),
    response: {
      200: z.string(),
    },
  },
  handler: (req, res) => {
    res.send(req.query.name);
  },
});

async function run() {
  await server.ready();

  await server.listen({
    port: 4949,
  });

  console.log(`Documentation running at http://localhost:4949/documentation`);
}

run();
