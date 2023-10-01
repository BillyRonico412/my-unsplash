"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@trpc/server/adapters/standalone");
const await_to_js_1 = __importDefault(require("await-to-js"));
const node_json_db_1 = require("node-json-db");
const zod_1 = require("zod");
const trpc_1 = require("./trpc");
const cors_1 = __importDefault(require("cors"));
const context_1 = require("./context");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const zodPhoto = zod_1.z.object({
    id: zod_1.z.string(),
    label: zod_1.z.string().min(1).max(100),
    url: zod_1.z.string().min(1).max(500).url(),
    date: zod_1.z.number().int(),
});
const db = new node_json_db_1.JsonDB(new node_json_db_1.Config("db", true, true, "/"));
const appRouter = (0, trpc_1.router)({
    addPhoto: trpc_1.publicProcedure.input(zodPhoto).mutation(({ input, ctx }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.authenticated) {
            throw new Error("Unauthorized");
        }
        const [errAddPhoto] = yield (0, await_to_js_1.default)(db.push(`/photos/${input.id}`, input, true));
        if (errAddPhoto) {
            throw errAddPhoto;
        }
        return true;
    })),
    getPhotos: trpc_1.publicProcedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        const [errGetPhotos, photos] = yield (0, await_to_js_1.default)(db.getObject("/photos"));
        if (errGetPhotos) {
            throw errGetPhotos;
        }
        return photos;
    })),
    deletePhoto: trpc_1.publicProcedure
        .input(zodPhoto.shape.id)
        .mutation(({ input, ctx }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.authenticated) {
            throw new Error("Unauthorized");
        }
        const [errDeletePhoto] = yield (0, await_to_js_1.default)(db.delete(`/photos/${input}`));
        if (errDeletePhoto) {
            throw errDeletePhoto;
        }
        return true;
    })),
});
const server = (0, standalone_1.createHTTPServer)({
    middleware: (0, cors_1.default)(),
    router: appRouter,
    createContext: context_1.createContext,
});
server.listen(3000);
