import { inferRouterOutputs } from "@trpc/server"
import to from "await-to-js"
import { DoneInvokeEvent, assign, createMachine } from "xstate"
import { AppRouter } from "../../server"
import { client, getClientLoggedIn, notyf } from "./utils"

interface MachineContext {
	photos: inferRouterOutputs<AppRouter>["getPhotos"]
	label: string
	url: string
	password: string
	search: string
	currentPhotoId?: string
}

type MachineEvent =
	| {
			type: "FETCH"
	  }
	| {
			type: "DELETE"
			payload: {
				currentPhotoId: string
			}
	  }
	| {
			type: "ADD_FORM"
			payload: {
				currentPhotoId: string
			}
	  }
	| {
			type: "CLOSE_ADD_FORM"
	  }
	| {
			type: "ADD"
	  }
	| {
			type: "PASSWORD"
			payload: {
				password: string
			}
	  }
	| {
			type: "CLOSE_PASSWORD"
	  }
	| {
			type: "UPDATE_LABEL"
			payload: {
				label: string
			}
	  }
	| {
			type: "UPDATE_URL"
			payload: {
				url: string
			}
	  }
	| {
			type: "UPDATE_SEARCH"
			payload: {
				search: string
			}
	  }
	| {
			type: "UPDATE_PASSWORD"
			payload: {
				password: string
			}
	  }

export const machine = createMachine<MachineContext, MachineEvent>({
	/** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDpsIAbMAYgDEBRAFQGEAJAbQAYBdRUABwHtZsAF2y9cXEAA9EAJmkBGAgHYAzABZVrABwA2VgE5py1soA0IAJ6IArFYXKre7dNaq9quQeUBfL2bRY8QgAzMEEA3ChyCFFCPAA3XgBrQn8cfAIQsLSoBHjedFRhUTZ2EvE+ASKxJElEbWU9AjlpK1ZtTTlNdz05VTNLBCtDAi0jZU0tPU1lRSsfPww04NDwyLAAJ3XedYJuEkKg7eQCVMCMlezc3ASCqpKymoqhEWrQKQRpRUUlRz1WF1YVkUckUmn6iFUVk0BA09Vmqm0ikMVmU2nmIFO6UyWEg5AAggARAkAWkoAHkAEoAWQePH4z1E4ne2j0300s30IPU0lUYIsiD0QJGcgcThsvJRcnRmOWWVxBOoABk6NRaSAnlUmYg5MYrARbED3M52opVIpwQg3NICDNPq4Groht5fBjFmdsZhcQBVAAKBLxtGoAH0AMrUPEUphqjUvLUILqNeSaLoeepWbTaOQWzTp-VOTQtT6I1FzF0ygioCAQYmHdbIfFE6P0zU1d6yBQqdRaXSeYzZ8YEaTaByyNRaHTSaVu9KV6u1+u+-2BoOKvEAISVTcqsdbEOkFr0PSa2lUDUcLRmij0U-ChFnNaO5EXAeDXopiq3DNetUGCmkHU+OQ5GUVFAVNbNWUHICh0UdpWFmNwbyWCsqwfOtyHoRUyTDINCQJINyWpT8WzeGR5CUNQNB0fRDD7fkEB1L4lGHRxOlYIdpiQs5724VBYFgAB3bYIHIH08RDEMAHVKQJYid1Ij5ZgIHMrU+aQDEPc16JZVRlOaL5ehBFEei4mdUN4-ihPWETMOw4MxIk6SKVkjhymbeSf3qRpmladpOm6XoLVmBQ5CcL4VBmGwXFMu9zL4wThKfP0XyDBypJkuTGV3BBVHUwdKKMFFDWBKwLWLGFUVC5QRR1QCYoICAwDIQQwGJCyEus0TxPS5zMu-d4dQMfLIXgkEpnYi0eV0xRjGAoCDHUHN6sa5rWvaqybKwnC0qclzOEedysoUnV7H1EVTWaNp2TNbMERhVNmiAq97E0ZamtCNb4o2pKl3s7rdr6uNmkhAge1sVwJ1cUr6IMpo9CMblqpcWZ6tnPBImidI8mSE5p1iiB0auG5Chee5XIO7cjp-dsKK7aje1MbTWAUFTM00KYpidVGq3R8gNi2HY9gOI5cdvFCCYiIn8hJ4oOEB7Kac7Kie1oxmBlNPVqqLQ85sPScyzxhr3uECIohiIhriSFJDZW0JCbyW5Sbl8m6Up-qyI7SjuxosYLRLGFJQRjRPiWg2xdtk21k2bZdn2QR51F5CI-ty3Hdl0oXfVQ73Y+cile9hnswUVxNImHyekRHwXVwXhGvgGoZTct242JbQLWJPVDy77vu9PeriDIJuvzjFkRhm-9jPZUKeQtKxTyUWD-wukUC31hYxY9dGh5In9IWUM6kRsDMdCK6GBiGOx9ChYF5tNNfXQ3i5IG3jz3mTa0dBUHVAShhwDyFA055xQ5mqtzOcRwX5U2ZHqDM7hgI5mMK4JwFpBqsCaEZaq6Yu71DAW1L6wlIE50hLpXKrIWI1RaGfRAXxdLjHhgiJE7JQSKDeqtPBlkCEU2HtlZomYlC5TUK0eC6ggLZiRE0BEwEhhX3UlKMOyE0YREIXGXKQVnAEB6KeQEIE3AFhYfIs4yclFcJ3u8VR9E1AKB-qCUKIoTyCirl4IAA */
	id: "machine",
	initial: "idle",
	context: {
		photos: {},
		label: "",
		url: "",
		password: "",
		search: "",
	},
	states: {
		idle: {
			on: {
				FETCH: {
					target: "fetching",
				},
			},
		},
		fetching: {
			invoke: {
				src: async () => {
					const [errPhotos, photos] = await to(client.getPhotos.query())
					if (errPhotos) {
						throw errPhotos
					}
					return photos
				},
				onDone: {
					target: "fetched",
					actions: assign({
						photos: (_, event) => event.data,
					}),
				},
				onError: {
					target: "fetched",
					actions: (_, event) => {
						console.error(event.data)
						notyf.error("Error fetching photos")
					},
				},
			},
		},
		fetched: {
			on: {
				ADD_FORM: {
					target: "add-form",
				},
				DELETE: {
					target: "delete-password",
					actions: assign({
						currentPhotoId: (_, event) => event.payload.currentPhotoId,
					}),
				},
				UPDATE_SEARCH: {
					actions: assign({
						search: (_, event) => event.payload.search,
					}),
				},
			},
		},
		"add-form": {
			on: {
				ADD: {
					target: "add-password",
				},

				UPDATE_LABEL: {
					actions: assign({
						label: (_, event) => event.payload.label,
					}),
				},
				UPDATE_URL: {
					actions: assign({
						url: (_, event) => event.payload.url,
					}),
				},
				CLOSE_ADD_FORM: {
					target: "fetched",
					actions: assign({
						label: "",
						url: "",
					}),
				},
			},
		},
		"add-password": {
			on: {
				PASSWORD: {
					target: "adding",
				},
				CLOSE_PASSWORD: {
					target: "fetched",
					actions: assign({
						currentPhotoId: undefined,
						password: "",
					}),
				},
				UPDATE_PASSWORD: {
					actions: assign({
						password: (_, event) => event.payload.password,
					}),
				},
			},
		},
		"delete-password": {
			on: {
				PASSWORD: {
					target: "deleting",
				},
				CLOSE_PASSWORD: {
					target: "fetched",
					actions: assign({
						currentPhotoId: undefined,
						password: "",
					}),
				},
				UPDATE_PASSWORD: {
					actions: assign({
						password: (_, event) => event.payload.password,
					}),
				},
			},
		},
		adding: {
			invoke: {
				src: async (context) => {
					const [errAddPhoto] = await to(
						getClientLoggedIn(context.password).addPhoto.mutate({
							date: Date.now(),
							label: context.label,
							url: context.url,
						}),
					)
					if (errAddPhoto) {
						throw errAddPhoto
					}
				},
				onDone: {
					target: "fetching",
					actions: [
						assign({
							label: "",
							url: "",
							password: "",
						}),
						() => {
							notyf.success("Photo added")
						},
					],
				},
				onError: {
					target: "add-password",
					actions: (_, event: DoneInvokeEvent<Error>) => {
						console.error(event.data)
						notyf.error("Error adding photo")
					},
				},
			},
		},
		deleting: {
			invoke: {
				src: async (context) => {
					if (!context.currentPhotoId) {
						throw new Error("Invalid photo id")
					}
					const [errDeletePhoto] = await to(
						getClientLoggedIn(context.password).deletePhoto.mutate(
							context.currentPhotoId,
						),
					)
					if (errDeletePhoto) {
						throw errDeletePhoto
					}
				},
				onDone: {
					target: "fetching",
					actions: [
						assign({
							currentPhotoId: undefined,
							password: "",
						}),
						() => {
							notyf.success("Photo deleted")
						},
					],
				},
				onError: {
					target: "delete-password",
					actions: (_, event: DoneInvokeEvent<Error>) => {
						console.error(event.data)
						notyf.error("Error deleting photo")
					},
				},
			},
		},
	},
})
