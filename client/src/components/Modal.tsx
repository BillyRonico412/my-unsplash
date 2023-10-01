interface Props {
	children: React.ReactNode
}

const Modal = (props: Props) => {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="w-full max-w-lg mx-4 max-h-[50%] bg-white px-6 py-8 rounded-lg shadow">
				{props.children}
			</div>
		</div>
	)
}

export default Modal
