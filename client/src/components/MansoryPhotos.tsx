import { useAtom } from "jotai"
import { FaTrashAlt } from "react-icons/fa"
import { modalInfoAtom, notyf, passwordAtom, searchAtom, trpc } from "../utils"

const MansoryPhotos = () => {
	const [, setPassword] = useAtom(passwordAtom)
	const [, setModalInfo] = useAtom(modalInfoAtom)
	const getPhotosQuery = trpc.getPhotos.useQuery()

	const [search] = useAtom(searchAtom)

	const deletePhotoMutation = trpc.deletePhoto.useMutation({
		onError(error) {
			notyf.error(error.message)
		},
		onSuccess() {
			notyf.success("Photo deleted successfully")
			setPassword("")
			setModalInfo(null)
			getPhotosQuery.refetch()
		},
	})

	if (getPhotosQuery.error) {
		notyf.error(getPhotosQuery.error.message)
		return <></>
	}

	if (getPhotosQuery.isLoading) {
		return <></>
	}

	return (
		<div className="overflow-y-auto">
			<div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-4 space-y-3 flex-grow container mx-auto px-4">
				{Object.values(getPhotosQuery.data)
					.filter((photo) =>
						photo.label.toLowerCase().includes(search.toLowerCase()),
					)
					.map((photo) => {
						return (
							<div
								className="break-inside-avoid rounded-lg overflow-hidden relative group hover:cursor-pointer"
								key={photo.id}
							>
								<img src={photo.url} alt={photo.label} />
								<div className="w-full h-full bg-black absolute left-0 top-0 bg-opacity-0 group-hover:bg-opacity-50" />
								<p className="font-medium absolute bottom-4 px-4 text-white hidden group-hover:block">
									{photo.label}
								</p>
								<button
									className="items-center w-8 aspect-square absolute top-4 right-4 rounded-full text-white bg-red-500 shadow px-3 py-1.5 font-medium text-sm hidden group-hover:flex hover:bg-red-600"
									title="Delete photo"
									onClick={() => {
										setModalInfo({
											type: "password-delete",
											mutation: deletePhotoMutation,
											id: photo.id,
										})
									}}
								>
									<FaTrashAlt />
								</button>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default MansoryPhotos
