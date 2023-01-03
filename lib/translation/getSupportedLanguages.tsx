import axios, {AxiosError} from "axios";
import {Language} from "./types/language.type";
import {API_KEY, BASE_URL} from "./config";

export const getSupportedLanguages = async (): Promise<Language[]> => {
    try {
        return await axios.get(BASE_URL + `/languages?key=${API_KEY}`, {
            params: {
                target: "en"
            }
        }).then(result => result.data.data.languages.map((language: any) => ({
            code: language.language,
            name: language.name,
        } as Language)));
    } catch (e) {
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error('Translation Service Request Failed');
            } else if (error.request) {
                throw new Error('Cannot connect to translation service');
            } else {
                throw new Error('Cannot process request');
            }
        } else {
            throw new Error('Cannot process request');
        }
    }
}