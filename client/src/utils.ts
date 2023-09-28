import { atom } from "jotai"

import { createTRPCReact } from "@trpc/react-query"
import { Notyf } from "notyf"
import type { AppRouter } from "../../server/index"

export const trpc = createTRPCReact<AppRouter>()

export const notyf = new Notyf()

export type ModalShowedType = null | "add" | "password-delete" | "password-add"

export const modalShowedAtom = atom<ModalShowedType>(null)

export const passwordAtom = atom("")

export const callbackWhenAuthAtom = atom<{
	callback: () => void
} | null>(null)
