import { useAtom } from "jotai"
import { machineAtom, notyf } from "../utils"
import Modal from "./Modal"
import { useEffect, useRef } from "react"

const ModalAdd = () => {
	const [state, send] = useAtom(machineAtom)
	const refInputLabel = useRef<HTMLInputElement>(null)
	const refOnce = useRef(false)

	useEffect(() => {
		if (state.matches("add-form") && !refOnce.current) {
			refInputLabel.current?.focus()
			refOnce.current = true
		}
	}, [state])

	if (!state.matches("add-form")) {
		refOnce.current = false
		return <></>
	}

	return (
		<Modal>
			<div className="flex flex-col gap-y-6">
				<p className="font-medium text-xl">Add a new photo</p>
				<div className="flex flex-col gap-y-2">
					<p className="text-sm font-medium">Label</p>
					<input
						ref={refInputLabel}
						type="text"
						className="outline-none border rounded-lg border-gray-400 px-4 py-2 text-sm"
						placeholder="E.g. Beautiful Landscape in Bali"
						value={state.context.label}
						onInput={(e) => {
							if (e.currentTarget.value.length > 100) {
								notyf.error("Label must be less than 100 characters")
								return
							}
							send({
								type: "UPDATE_LABEL",
								payload: {
									label: e.currentTarget.value,
								},
							})
						}}
					/>
				</div>

				<div className="flex flex-col gap-y-2">
					<p className="text-sm font-medium">Photo URL</p>
					<input
						type="text"
						className="outline-none border rounded-lg border-gray-400 px-4 py-2 text-sm"
						placeholder="E.g. https://images.unsplash.com/photo-1567306301408-9b74779a11af"
						value={state.context.url}
						onInput={(e) => {
							if (e.currentTarget.value.length > 500) {
								notyf.error("URL must be less than 500 characters")
								return
							}
							send({
								type: "UPDATE_URL",
								payload: {
									url: e.currentTarget.value,
								},
							})
						}}
					/>
				</div>
				<div className="ml-auto flex gap-x-4">
					<button
						className="rounded-lg shadow  text-gray-400 ml-auto px-4 py-3"
						disabled={state.matches("adding")}
						onClick={() => {
							send("CLOSE_ADD_FORM")
						}}
					>
						Cancel
					</button>
					<button
						className="rounded-lg shadow bg-green-600 text-white ml-auto px-4 py-3"
						disabled={state.matches("adding")}
						onClick={() => {
							if (state.context.label === "" || state.context.url === "") {
								notyf.error("Please fill all fields")
								return
							}
							send("ADD")
						}}
					>
						Submit
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default ModalAdd
