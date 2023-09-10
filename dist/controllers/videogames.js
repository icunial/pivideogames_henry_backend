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
exports.getAllApi = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_URL = "https://api.rawg.io/api/games";
// Get all videogames from API
const getAllApi = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    try {
        const apiResults = yield axios_1.default.get(`${API_URL}?key=${process.env.API_KEY}`);
        if (apiResults) {
            apiResults.data.results.forEach((r) => {
                results.push({
                    id: r.id,
                    name: r.name,
                    image: r.background_image
                });
            });
        }
        for (const r of results) {
            const apiResults = yield axios_1.default.get(`${API_URL}/${r.id}?key=${process.env.API_KEY}`);
            if (apiResults) {
                const genres = [];
                for (const r of apiResults.data.genres) {
                    genres.push(r.name.toUpperCase());
                }
                r.genre = genres;
            }
        }
        return results;
    }
    catch (error) {
        throw new Error("Error trying to get all videogames from API");
    }
});
exports.getAllApi = getAllApi;
