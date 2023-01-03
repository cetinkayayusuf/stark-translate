import axios, {AxiosError} from "axios";
import {TranslationTextInputType, TranslationTextOutputType} from "./types";
import {API_KEY, BASE_URL} from "./config";
import {detectLanguage} from "./common";

export const translateText = async (textInput: TranslationTextInputType): Promise<TranslationTextOutputType[]> => {
    try {
        if (textInput.source === undefined || textInput.source === null || textInput.source === '')
            textInput.source = await detectLanguage(textInput.text);
        return await axios.get(BASE_URL + `?key=${API_KEY}`, {
            params: {
                q: textInput.text,
                source: textInput.source,
                target: textInput.target,
            }
        }).then(result => result.data.data.translations.map((translation: any) => {
            return ({
                translatedText: translation.translatedText,
                sourceLanguageCode: translation.detectedSourceLanguage,
            } as TranslationTextOutputType)

        })).then(data => {
            return data;
        });
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