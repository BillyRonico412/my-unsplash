import { inferAsyncReturnType } from "@trpc/server"
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone"

export const createContext = async ({ req }: CreateHTTPContextOptions) => {
	return {
		authenticated: (() =>
			req.headers.authorization !== undefined &&
			req.headers.authorization.split(" ")[1] === process.env.PASSWORD)(),
	}
}
export type Context = inferAsyncReturnType<typeof createContext>
