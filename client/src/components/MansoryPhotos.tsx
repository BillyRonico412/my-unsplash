import { useAtom } from "jotai"
import { FaTrashAlt } from "react-icons/fa"
import { machineAtom } from "../utils"

const MansoryPhotos = () => {
	const [state, send] = useAtom(machineAtom)

	return (
		<div className="overflow-y-auto">
			<div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-4 space-y-3 flex-grow container mx-auto px-4">
				{Object.entries(state.context.photos)
					.filter(([, photo]) =>
						photo.label
							.toLowerCase()
							.includes(state.context.search.toLowerCase()),
					)
					.map(([id, photo]) => {
						return (
							<div
								className="break-inside-avoid rounded-lg overflow-hidden relative group hover:cursor-pointer"
								key={id}
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
										send({
											type: "DELETE",
											payload: {
												currentPhotoId: id,
											},
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
