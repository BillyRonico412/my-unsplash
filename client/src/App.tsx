import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useAtom } from "jotai"
import { useMemo } from "react"
import Header from "./components/Header"
import MansoryPhotos from "./components/MansoryPhotos"
import ModalAdd from "./components/ModalAdd"
import ModalMdp from "./components/ModalMdp"
import { passwordAtom, trpc } from "./utils"

const App = () => {
	const [password] = useAtom(passwordAtom)
	const queryClient = useMemo(() => new QueryClient(), [])
	const trpcClient = useMemo(
		() =>
			trpc.createClient({
				links: [
					httpBatchLink({
						url: import.meta.env.VITE_TRPC_URL,
						headers: () => {
							return {
								Authorization: `Bearer ${password}`,
							}
						},
					}),
				],
			}),
		[password],
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<div className="grid grid-rows-[48px_1fr] gap-y-8 py-8 w-screen h-screen">
					<Header />
					<MansoryPhotos />
				</div>
				<ModalAdd />
				<ModalMdp />
			</QueryClientProvider>
		</trpc.Provider>
	)
}

export default App
