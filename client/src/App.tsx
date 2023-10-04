import { useAtom } from "jotai"
import { useEffect } from "react"
import Header from "./components/Header"
import MansoryPhotos from "./components/MansoryPhotos"
import ModalAdd from "./components/ModalAdd"
import ModalMdp from "./components/ModalMdp"
import { machineAtom } from "./utils"

const App = () => {
	const [, send] = useAtom(machineAtom)
	useEffect(() => {
		send("FETCH")
	}, [send])
	return (
		<>
			<div className="grid grid-rows-[48px_1fr] gap-y-8 py-8 w-screen h-screen">
				<Header />
				<MansoryPhotos />
			</div>
			<ModalAdd />
			<ModalMdp />
		</>
	)
}

export default App
