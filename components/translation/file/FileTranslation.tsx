import React, {FunctionComponent, useState} from 'react';
import {Button, HStack, Input, VStack} from "@chakra-ui/react";
import {LanguageSelection} from "../../common/LanguageSelection";
import {
    TranslationFileInputType,
    TranslationFileOutputType,
    TranslationTextInputType
} from "../../../lib/translation/types";
import {translateText} from "../../../lib/translation";
import {parseCsvFile} from "../../../lib/parseCsvFile";
import {translateFile} from "../../../lib/translation/translateFile";

type FileTranslationProps = {}
export const FileTranslation: FunctionComponent<FileTranslationProps> = ({}) => {
    const [translationInput, setTranslationInput] = useState<TranslationFileInputType>({
        file: [],
        source: "",
        target: "",
    });
    const [translationCompleted, setTranslationCompleted] = useState(false)
    const [translationOutput, setTranslationOutput] = useState<TranslationFileOutputType>({
        file: [],
        source: "",
        target: "",
    })
    const handleDownload = (): void => {
        let downloadFile = translationOutput.file[0];
        for (let i = 1; i < translationOutput.file.length; i++) {
            downloadFile += "\n" + translationOutput.file[i];
        }

        const blob = new Blob([downloadFile], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "translated-file.csv";
        link.href = url;
        link.click();
    }
    const handleTranslate = (): void => {
        setTranslationCompleted(false);
        translateFile(translationInput).then(translationData => {
            setTranslationOutput(translationData)
            setTranslationCompleted(true);
        })
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files === null || event.target.files.length === 0) return;
        parseCsvFile({
            file: event.target.files[0],
            onParseComplete: (parsedFile: any) => {
                setTranslationInput(({
                    ...translationInput,
                    file: parsedFile.data
                } as TranslationFileInputType))
            }
        })

    }
    const handleSourceLanguageSelect = (selectedLanguage: string): void => {
        setTranslationInput(({
            ...translationInput,
            source: selectedLanguage
        } as TranslationFileInputType))
    }
    const handleTargetLanguageSelect = (selectedLanguage: string): void => {
        setTranslationInput(({
            ...translationInput,
            target: selectedLanguage
        } as TranslationFileInputType))
    }
    return (
        <VStack>
            <HStack py={'4'}>
                <VStack>
                    <LanguageSelection onSelect={handleSourceLanguageSelect} placeHolder={'Source'}/>
                    <Input variant={'filled'} type="file" accept=".csv" onChange={handleInputChange}/>
                </VStack>
                <Button colorScheme={'red'} px={'8'} type={'button'}
                        aria-label={'Translate Button'} onClick={handleTranslate}>Translate</Button>
                <VStack>
                    <LanguageSelection onSelect={handleTargetLanguageSelect} placeHolder={'Target'}/>
                    <Button width={'fit-content'} minWidth={'fit-content'} type={'button'} onClick={handleDownload}
                            disabled={!translationCompleted}>Download
                        Translation</Button>
                </VStack>
            </HStack>
        </VStack>
    );
}