import fastifyJwt from "@fastify/jwt";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyPlugin from "fastify-plugin";
import config from "../config/constants";
import { responseSender } from "../helper/response.handler";
import parseResponse from "../helper/response.parser";

const authPlugin = (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: any
) => {
  fastify.register(fastifyJwt, {
    secret: config.jwt.secret,
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        responseSender(
          parseResponse(
            new Error(`${err.statusCode}: Unauthorize, ${err.message}`)
          ),
          reply
        );
      }
    }
  );

  done();
};

export default fastifyPlugin(authPlugin);
