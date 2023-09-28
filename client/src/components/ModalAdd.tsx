import { useAtom } from "jotai"
import { modalShowedAtom, notyf, trpc } from "../utils"
import Modal from "./Modal"
import { nanoid } from "nanoid"
import { useState } from "react"

const ModalAdd = () => {
	const [label, setLabel] = useState("")
	const [url, setUrl] = useState("")
	const [modalShowed, setModalShowed] = useAtom(modalShowedAtom)
	const getPhotosQuery = trpc.getPhotos.useQuery()
	const addPhotoMutation = trpc.addPhoto.useMutation({
		onError(error) {
			notyf.error(error.message)
		},
		onSuccess() {
			notyf.success("Photo added successfully")
			getPhotosQuery.refetch()
			setLabel("")
			setUrl("")
			setModalShowed(null)
		},
	})

	if (addPhotoMutation.error) {
	}

	if (addPhotoMutation.isSuccess) {
	}

	return (
		<Modal showModal={modalShowed === "add"}>
			<div className="flex flex-col gap-y-6">
				<p className="font-medium text-xl">Add a new photo</p>
				<div className="flex flex-col gap-y-2">
					<p className="text-sm font-medium">Label</p>
					<input
						type="text"
						className="outline-none border rounded-lg border-gray-400 px-4 py-2 text-sm"
						placeholder="E.g. Beautiful Landscape in Bali"
						value={label}
						onInput={(e) => {
							if (e.currentTarget.value.length > 100) {
								notyf.error("Label must be less than 50 characters")
								return
							}
							setLabel(e.currentTarget.value)
						}}
					/>
				</div>

				<div className="flex flex-col gap-y-2">
					<p className="text-sm font-medium">Photo URL</p>
					<input
						type="text"
						className="outline-none border rounded-lg border-gray-400 px-4 py-2 text-sm"
						placeholder="E.g. https://images.unsplash.com/photo-1567306301408-9b74779a11af"
						value={url}
						onInput={(e) => {
							if (e.currentTarget.value.length > 500) {
								notyf.error("URL must be less than 200 characters")
								return
							}
							setUrl(e.currentTarget.value)
						}}
					/>
				</div>
				<div className="ml-auto flex gap-x-4">
					<button
						className="rounded-lg shadow  text-gray-400 ml-auto px-4 py-3"
						disabled={addPhotoMutation.isLoading}
						onClick={() => {
							setLabel("")
							setUrl("")
							setModalShowed(null)
						}}
					>
						Cancel
					</button>
					<button
						className="rounded-lg shadow bg-green-600 text-white ml-auto px-4 py-3"
						disabled={addPhotoMutation.isLoading}
						onClick={() => {
							if (label === "" || url === "") {
								notyf.error("Please fill all fields")
								return
							}
							addPhotoMutation.mutate({
								id: nanoid(),
								label,
								url,
								date: Date.now(),
							})
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
