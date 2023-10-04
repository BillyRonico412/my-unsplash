import { useAtom } from "jotai"
import { machineAtom, notyf } from "../utils"
import Modal from "./Modal"
import { useEffect, useRef } from "react"

const ModalMdp = () => {
	const [state, send] = useAtom(machineAtom)
	const refInputMdp = useRef<HTMLInputElement>(null)
	const refOnce = useRef(false)

	useEffect(() => {
		if (
			(state.matches("add-password") || state.matches("delete-password")) &&
			!refOnce.current
		) {
			refInputMdp.current?.focus()
			refOnce.current = true
		}
	}, [state])

	if (!state.matches("add-password") && !state.matches("delete-password")) {
		refOnce.current = false
		return <></>
	}

	return (
		<Modal>
			<div className="flex flex-col gap-y-6">
				<p className="font-medium text-xl">Are you sure?</p>
				<div className="flex flex-col gap-y-2">
					<p className="text-sm font-medium">Password</p>
					<input
						ref={refInputMdp}
						type="password"
						className="outline-none border rounded-lg border-gray-400 px-4 py-2 text-sm"
						placeholder="********"
						value={state.context.password}
						onInput={(e) => {
							send({
								type: "UPDATE_PASSWORD",
								payload: {
									password: e.currentTarget.value,
								},
							})
						}}
					/>
				</div>
				<div className="ml-auto flex gap-x-4">
					<button
						className="rounded-lg shadow  text-gray-400 ml-auto px-4 py-3"
						disabled={
							Boolean(state.matches("adding")) ||
							Boolean(state.matches("deleting"))
						}
						onClick={() => {
							send("CLOSE_PASSWORD")
						}}
					>
						Cancel
					</button>
					<button
						className="rounded-lg shadow bg-red-600 text-white ml-auto px-4 py-3"
						onClick={() => {
							if (state.context.password === "") {
								notyf.error("Please fill all fields")
								return
							}
							send("PASSWORD")
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
