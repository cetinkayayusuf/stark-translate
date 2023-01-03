import axios, {AxiosError} from "axios";
import {API_KEY, BASE_URL} from "../config";

export const detectLanguage = async (text: string): Promise<string> => {
    try {
        return await axios.get(BASE_URL + `/detect?key=${API_KEY}`, {
            params: {
                q: text,
            }
        }).then(result => {
            let confidence = 0;
            let language = ""
            result.data.data.detections.map((detection: any) => detection.map((detectedLanguage: any) => {
                if(detectedLanguage.confidence >= confidence)
                    language = detectedLanguage.language;
            }));
            return language;
        });
    } catch (e) {
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error('Language Detection Service Request Failed');
            } else if (error.request) {
                throw new Error('Cannot connect to Language Detection Service');
            } else {
                throw new Error('Cannot process request');
            }
        } else {
            throw new Error('Cannot process request');
        }
    }
}