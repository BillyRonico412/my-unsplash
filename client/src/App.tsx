import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import Header from "./components/Header"
import MansoryPhotos from "./components/MansoryPhotos"
import ModalAdd from "./components/ModalAdd"
import { modalShowedAtom, passwordAtom, trpc } from "./utils"

const App = () => {
	const [, setModalShowed] = useAtom(modalShowedAtom)
	const [password] = useAtom(passwordAtom)
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:3000",
					headers: () => ({
						Authorization: `Bearer ${password}`,
					}),
				}),
			],
		}),
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<div className="grid grid-rows-[48px_1fr] gap-y-8 py-8 w-screen h-screen">
					<Header />
					<MansoryPhotos />
				</div>
				<ModalAdd />
			</QueryClientProvider>
		</trpc.Provider>
	)
}

export default App
