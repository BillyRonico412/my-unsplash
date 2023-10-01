import { useAtom } from "jotai"
import { useEffect } from "react"
import { modalInfoAtom, notyf, passwordAtom } from "../utils"
import Modal from "./Modal"
import { nanoid } from "nanoid"

const ModalMdp = () => {
	const [modalInfo, setModalInfo] = useAtom(modalInfoAtom)
	const [password, setPassword] = useAtom(passwordAtom)

	useEffect(() => {
		if (
			modalInfo &&
			(modalInfo.type === "password-add" ||
				modalInfo.type === "password-delete") &&
			modalInfo.mutation.isSuccess
		) {
			setPassword("")
			setModalInfo(null)
		}
	}, [modalInfo, setModalInfo, setPassword])

	if (
		!modalInfo ||
		(modalInfo.type !== "password-add" && modalInfo.type !== "password-delete")
	) {
		return <></>
	}

	return (
		<Modal>
			<div className="flex flex-col gap-y-6">
				<p className="font-medium text-xl">Are you sure?</p>
				<div className="flex flex-col gap-y-2">
					<p className="text-sm font-medium">Password</p>
					<input
						type="password"
						className="outline-none border rounded-lg border-gray-400 px-4 py-2 text-sm"
						placeholder="********"
						value={password}
						onInput={(e) => {
							setPassword(e.currentTarget.value)
						}}
					/>
				</div>
				<div className="ml-auto flex gap-x-4">
					<button
						className="rounded-lg shadow  text-gray-400 ml-auto px-4 py-3"
						disabled={modalInfo.mutation.isLoading}
						onClick={() => {
							setModalInfo(null)
							setPassword("")
						}}
					>
						Cancel
					</button>
					<button
						className="rounded-lg shadow bg-red-600 text-white ml-auto px-4 py-3"
						onClick={() => {
							if (password === "") {
								notyf.error("Please fill all fields")
								return
							}
							if (modalInfo.type === "password-delete") {
								modalInfo.mutation.mutate(modalInfo.id)
							}
							if (modalInfo.type === "password-add") {
								modalInfo.mutation.mutate({
									id: nanoid(),
									label: modalInfo.label,
									url: modalInfo.url,
									date: Date.now(),
								})
							}
						}}
					>
						Submit
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default ModalMdp
