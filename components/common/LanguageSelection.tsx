import React, {FunctionComponent, useEffect, useState} from 'react';
import {Select, useToast} from "@chakra-ui/react";
import { Language } from '../../lib/translation/types';
import {getSupportedLanguages} from "../../lib/translation/getSupportedLanguages";

type LanguageSelectionProps = {
    onSelect: Function
    placeHolder?: string
}
export const LanguageSelection: FunctionComponent<LanguageSelectionProps> = ({onSelect, placeHolder = 'Select Language'}) => {
    const toast = useToast();
    const [languages, setLanguages] = useState<Language[]>([])
    useEffect(() => {
        const updateSupportedLanguages = async () => {
            try {
                const supportedLanguages: Language[] = await getSupportedLanguages();
                setLanguages(supportedLanguages);
            } catch (e) {
                toast({
                    title: 'Cannot Fetch Supported Languages',
                    description: (e as Error).message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
        updateSupportedLanguages().catch(console.error);
    }, [])

    const handleLanguageSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        onSelect(event.target.value);
    }
    return (
        <>
            {languages && languages.length > 0 &&
                <Select placeholder={placeHolder} size={'md'} onChange={handleLanguageSelect}>
                    {languages.map((language: Language) => (
                        <option key={language.code} value={language.code}>{language.name}</option>
                    ))
                    }
                </Select>
            }
        </>
    );
}