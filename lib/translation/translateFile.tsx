import axios, {AxiosError} from "axios";
import {
    TranslationFileInputType,
    TranslationFileOutputType,
    TranslationTextInputType,
    TranslationTextOutputType
} from "./types";
import {API_KEY, BASE_URL} from "./config";
import {detectLanguage} from "./common";
import {translateText} from "./translateText";

export const translateFile = async (input: TranslationFileInputType): Promise<TranslationFileOutputType> => {
    try {
        if (input.source === undefined || input.source === null || input.source === '')
            input.source = await detectLanguage(input.file[0][0]);

        const translatedLines = await Promise.all(input.file.map(async line => {
            let translatedMeanings: TranslationTextOutputType[] = [];
            let editedLine = "";
            await Promise.all(line.map(async (word, index) => {
                const translations = await translateText({
                    text: word,
                    source: input.source,
                    target: input.target
                })
                if (index === 0) {
                    translatedMeanings = translations;
                    editedLine = word;
                } else {
                    for (let i = 0; i < translations.length; i++)
                        for (let j = 0; j < translatedMeanings.length; j++) {
                            if (translations[i].translatedText === translatedMeanings[i].translatedText) {
                                editedLine += ";" + word;
                                return;
                            }
                        }
                }
            }))
            return editedLine + ";" + translatedMeanings[0].translatedText;
        }))

        console.dir(translatedLines);
        return ({
            file: translatedLines,
            source: input.source,
            target: input.target
        } as TranslationFileOutputType)

    } catch
        (e) {
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error('Translate File Service Request Failed');
            } else if (error.request) {
                throw new Error('Cannot connect to Translate File Service');
            } else {
                throw new Error('Cannot process request');
            }
        } else {
            throw new Error('Cannot process request');
        }
    }
}