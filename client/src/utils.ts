import { createTRPCReact } from "@trpc/react-query"
import { Notyf } from "notyf"
import type { AppRouter } from "../../server/index"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { atomWithMachine } from "jotai-xstate"
import { machine } from "./states"

export const trpc = createTRPCReact<AppRouter>()

export const notyf = new Notyf()

export const client = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: import.meta.env.VITE_TRPC_URL,
		}),
	],
})

export const getClientLoggedIn = (password: string) => {
	return createTRPCProxyClient<AppRouter>({
		links: [
			httpBatchLink({
				url: import.meta.env.VITE_TRPC_URL,
				async headers() {
					return {
						authorization: `Bearer ${password}`,
					}
				},
			}),
		],
	})
}

export const machineAtom = atomWithMachine(machine, {
	devTools: true,
})
