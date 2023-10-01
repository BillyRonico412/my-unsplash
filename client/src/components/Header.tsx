import { useAtom } from "jotai"
import { FaPlus, FaSearch } from "react-icons/fa"
import { modalInfoAtom, searchAtom } from "../utils"

const Header = () => {
	const [, setModalInfo] = useAtom(modalInfoAtom)
	const [search, setSearch] = useAtom(searchAtom)
	return (
		<div className="flex gap-x-4 lg:gap-x-12 container mx-auto px-4">
			<div className="flex items-center gap-x-4">
				<div className="flex flex-col items-center gap-y-1">
					<div className="bg-black w-[8px] h-[8px] rounded-sm shadow" />
					<div className="bg-black w-[20px] h-[8px] rounded-sm shadow" />
				</div>
				<div className="lg:flex flex-col gap-y-2 hidden">
					<p className="font-extrabold">My Unsplash</p>
					<p>devchallenges.io</p>
				</div>
			</div>
			<div className="border border-gray-200 rounded-lg shadow text-gray-400 flex items-center overflow-hidden w-full lg:w-auto">
				<span className="px-4">
					<FaSearch />
				</span>
				<input
					type="text"
					placeholder="Search by name"
					className="h-full w-full lg:w-auto border-none outline-none"
					value={search}
					onInput={(e) => {
						setSearch(e.currentTarget.value)
					}}
				/>
			</div>
			<button
				className="rounded-lg shadow bg-green-600 text-white ml-auto px-4"
				onClick={() =>
					setModalInfo({
						type: "add",
					})
				}
			>
				<span className="hidden lg:inline">Add a photo</span>
				<span className="inline lg:hidden">
					<FaPlus />
				</span>
			</button>
		</div>
	)
}

export default Header
