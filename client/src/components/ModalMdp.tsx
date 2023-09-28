import { useAtom } from "jotai"
import { ModalShowedType, modalShowedAtom, notyf } from "../utils"
import Modal from "./Modal"
import { useEffect, useState } from "react"

interface Props {
	callBack: () => void
	isLoading: boolean
	isSuccess: boolean
	modalShowedValue: ModalShowedType
}

const ModalMdp = (props: Props) => {
	const [modalShowed, setModalShowed] = useAtom(modalShowedAtom)
	const [password, setPassword] = useState("")

	useEffect(() => {
		if (props.isSuccess) {
			setModalShowed(null)
			setPassword("")
		}
	}, [props.isSuccess, setModalShowed])

	return (
		<Modal showModal={modalShowed === props.modalShowedValue}>
			<div className="flex flex-col gap-y-6">
				<p className="font-medium text-xl">Are you sure?</p>
				<div className="flex flex-col gap-y-2">
					<p className="text-sm font-medium">Password</p>
					<input
						type="text"
						className="outline-none border rounded-lg border-gray-400 px-4 py-2 text-sm"
						placeholder="E.g. Beautiful Landscape in Bali"
						value={password}
						onInput={(e) => {
							if (e.currentTarget.value.length > 100) {
								notyf.error("Label must be less than 50 characters")
								return
							}
							setPassword(e.currentTarget.value)
						}}
					/>
				</div>
				<div className="ml-auto flex gap-x-4">
					<button
						className="rounded-lg shadow  text-gray-400 ml-auto px-4 py-3"
						disabled={props.isLoading}
						onClick={() => {
							setModalShowed(null)
						}}
					>
						Cancel
					</button>
					<button
						className="rounded-lg shadow bg-green-600 text-white ml-auto px-4 py-3"
						onClick={() => {
							if (password === "") {
								notyf.error("Please fill all fields")
								return
							}
							props.callBack()
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
