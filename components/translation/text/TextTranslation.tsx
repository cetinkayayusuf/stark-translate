import React, {FunctionComponent, useState} from "react";
import {LanguageSelection} from "../../common/LanguageSelection";
import {Button, HStack, Input, VStack} from "@chakra-ui/react";
import {TranslationTextInputType, TranslationTextOutputType} from "../../../lib/translation/types";
import {translateText} from "../../../lib/translation";

type TextTranslationProps = {}
export const TextTranslation: FunctionComponent<TextTranslationProps> = ({}) => {
    const [translationInput, setTranslationInput] = useState<TranslationTextInputType>({
        text: "",
        source: "",
        target: "",
    });
    const [translations, setTranslations] = useState<TranslationTextOutputType[]>([])
    const handleTranslate = (): void => {
        translateText(translationInput).then(translationsData => setTranslations(translationsData))
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTranslationInput(({
            ...translationInput,
            text: event.target.value
        } as TranslationTextInputType))
    }
    const handleSourceLanguageSelect = (selectedLanguage: string): void => {
        setTranslationInput(({
            ...translationInput,
            source: selectedLanguage
        } as TranslationTextInputType))
    }
    const handleTargetLanguageSelect = (selectedLanguage: string): void => {
        setTranslationInput(({
            ...translationInput,
            target: selectedLanguage
        } as TranslationTextInputType))
    }
    return (
        <>
            <VStack>
                <HStack py={'4'}>
                    <VStack>
                        <LanguageSelection onSelect={handleSourceLanguageSelect} placeHolder={'Source'}/>
                        <Input variant={'filled'} placeholder={'Type input text'} onChange={handleInputChange}/>
                    </VStack>
                    <Button colorScheme={'red'} px={'8'} type={'button'}
                            aria-label={'Translate Button'} onClick={handleTranslate}>Translate</Button>
                    <VStack>
                        <LanguageSelection onSelect={handleTargetLanguageSelect} placeHolder={'Target'}/>
                        <Input variant={'filled'} readOnly={true}
                               value={translations.length > 0 ? translations.map((translation, index) => `${index > 0 ? ', ' : ''}${translation.translatedText}`) : ''}
                               onChange={handleInputChange}/>
                    </VStack>
                </HStack>
            </VStack>
        </>
    );
}