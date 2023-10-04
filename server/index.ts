import { createHTTPServer } from "@trpc/server/adapters/standalone"
import to from "await-to-js"
import { Config, JsonDB } from "node-json-db"
import { z } from "zod"
import { publicProcedure, router } from "./trpc"
import cors from "cors"
import { createContext } from "./context"
import dotenv from "dotenv"
import { v4 } from "uuid"

dotenv.config()

const zodPhoto = z.object({
	label: z.string().min(1).max(100),
	url: z.string().min(1).max(500).url(),
	date: z.number().int(),
})

const db = new JsonDB(new Config("db", true, true, "/"))

const appRouter = router({
	addPhoto: publicProcedure.input(zodPhoto).mutation(async ({ input, ctx }) => {
		if (!ctx.authenticated) {
			throw new Error("Unauthorized")
		}
		const id = v4()
		const [errAddPhoto] = await to(db.push(`/photos/${id}`, input, true))
		if (errAddPhoto) {
			throw errAddPhoto
		}
		return true
	}),
	getPhotos: publicProcedure.query(async () => {
		const [errGetPhotos, photos] = await to(
			db.getObject<Record<string, z.infer<typeof zodPhoto>>>("/photos"),
		)
		if (errGetPhotos) {
			throw errGetPhotos
		}
		return photos
	}),
	deletePhoto: publicProcedure
		.input(z.string())
		.mutation(async ({ input, ctx }) => {
			if (!ctx.authenticated) {
				throw new Error("Unauthorized")
			}
			const [errDeletePhoto] = await to(db.delete(`/photos/${input}`))
			if (errDeletePhoto) {
				throw errDeletePhoto
			}
			return true
		}),
})

const server = createHTTPServer({
	middleware: cors(),
	router: appRouter,
	createContext,
})

server.listen(3000)

export type AppRouter = typeof appRouter
