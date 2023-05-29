import {
  createTaskSchema,
  getSingleTaskSchema,
  deleteTaskSchema,
  updateTaskSchema
} from '../../../schema/todo';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const todoRouter = createTRPCRouter({

  // create new Task
  createTask: protectedProcedure.input(createTaskSchema).mutation(async ({ctx, input}) => {
    const task = await ctx.prisma.task.create({
      data: {
        ...input,
        user: {
          connect: {
            id: ctx.session?.user.id
          },
        },
      },
    });
    return task;
  }),

  //get many task
  getTasks: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
      orderBy: {
        createdAt: 'desc'
      },
    })
  }),

  // get single task
  getSingleTask: protectedProcedure.input(getSingleTaskSchema).query(({ ctx, input }) => {
    return ctx.prisma.task.findUnique({
      where: {
        id: input.taskId
      },
    })
  }),

  // update task
  updateTask: protectedProcedure.input(updateTaskSchema).mutation(async ({ ctx, input }) => {
    const task = await ctx.prisma.task.update({
      where: {
        id: input.taskId,
      },
      data: {
        title: input.title,
        body: input.body
      },
    })
    return task;
  }),

  // delete task
  deleteTask: protectedProcedure.input(deleteTaskSchema).mutation(async ({ ctx, input }) => {
    await ctx.prisma.task.delete({
      where: {
        id: input.taskId
      },
    })
  })
})