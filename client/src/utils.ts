import { atom } from "jotai"

import { createTRPCReact } from "@trpc/react-query"
import { Notyf } from "notyf"
import type { AppRouter } from "../../server/index"

export const trpc = createTRPCReact<AppRouter>()

export const notyf = new Notyf()

type ModalInfoType =
	| null
	| {
			type: "add" | "edit"
	  }
	| {
			type: "password-delete"
			id: string
			mutation: ReturnType<typeof trpc.deletePhoto.useMutation>
	  }
	| {
			type: "password-add"
			label: string
			url: string
			mutation: ReturnType<typeof trpc.addPhoto.useMutation>
	  }

export const modalInfoAtom = atom<ModalInfoType>(null)

export const passwordAtom = atom("")

export const searchAtom = atom("")
