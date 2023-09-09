import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      async headers() {
        return {
          Authorization: "Bearer 12345",
        };
      },
    }),
  ],
});

async function main() {
  // 👇 This is type-safe!
  const result = await trpc.createTodo.mutate({
    title: "My todo",
    description: "My description",
  });
  console.log(result);

  //   const token = await trpc.signUp.mutate({
  //     email: "sample",
  //     password: "sample",
  //   });
  //   console.log(token);
}

main().catch((err) => {
  console.error(err);
});
