import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

const appRouter = router({
  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    const username = opts.ctx.username; //after writing context
    console.log(username);

    const title = opts.input.title;
    const description = opts.input.description;

    //do db stuff here

    return {
      id: "1",
    };
  }),
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      //! context -> db conn and auth info
      const email = opts.input.email;
      const password = opts.input.password;

      //do validation
      //do db stuff here

      //do jwt stuff here

      let token = "12345";
      return {
        token: token,
      };
    }),
});

//differnt ways to create context in different adapters

const server = createHTTPServer({
  router: appRouter,
  createContext: (opts) => {
    let authHeader = opts.req.headers["authorization"];
    console.log(authHeader);

    //jwt.verify()
    return {
      username: "sample",
    };
  },
});

server.listen(3000);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
