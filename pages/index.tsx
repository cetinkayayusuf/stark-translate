import React from "react";
import Head from 'next/head';
import {Divider, VStack} from "@chakra-ui/react";
import {TextTranslation, FileTranslation} from "../components";

export default function Home() {
    return (
        <>
            <Head>
                <title>Word Translation App</title>
                <meta name="description" content="word translation app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf8"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <VStack>
                    <TextTranslation/>
                    <Divider/>
                    <FileTranslation/>
                </VStack>
            </main>
        </>
    )
}
