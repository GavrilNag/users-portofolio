import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createDTO, deleteDTO, updateDTO } from "../entities/dtos/todo.dto";
import responseHandler from "../helper/response.handler";
import * as Validator from "../helper/validate.helper";
import TodoUsecase from "../usecase/todo.usecase";

export class UsersController {
  public prefix_route = "/users";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
    fastify.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/",
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

    fastify.get(`/`, async (request, reply) => {
      responseHandler(async () => {
        const data = await TodoUsecase.findAllTodo();
        return data;
      }, reply);
      await reply;
    });

    fastify.post(`/`, async (request, reply) => {
      responseHandler(async () => {
        const reqCreate: createDTO = request.body as createDTO;
        const { task_name, task_content } = reqCreate;
        console.log(reqCreate);
        if (!Validator.validCheckInput(task_name, task_content)) {
          throw new Error(
            `400 : Invalid input, Please input field task_name and task_content`
          );
        }

        const data = await TodoUsecase.createTodo(reqCreate);
        return data;
      }, reply);
      await reply;
    });

    fastify.put(`/:id`, async (request, reply) => {
      responseHandler(async () => {
        const reqUpdate: updateDTO = request.body as updateDTO;
        const { _id, ...rawUpdate } = reqUpdate;

        if (!Validator.validCheckID(_id)) {
          throw new Error(`400 : Invalid input, Please input field id`);
        }

        const errorFieldsUpdate = Validator.validUpdatedFields(rawUpdate);
        if (errorFieldsUpdate.length > 0) {
          throw new Error(
            `400 : Invalid Fields! ${errorFieldsUpdate.join(", ")}`
          );
        }

        const data = await TodoUsecase.updateTodo(reqUpdate);
        return data;
      }, reply);
      await reply;
    });

    fastify.delete(
      `/:id`,
      { preValidation: [(fastify as any).authenticate] },
      async (request, reply) => {
        responseHandler(async () => {
          console.log(request.user);
          const data = await TodoUsecase.deleteTodo(request.body as deleteDTO);
          return data;
        }, reply);
        await reply;
      }
    );

    done();
  }
}
