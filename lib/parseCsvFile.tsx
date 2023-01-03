import Papa from "papaparse";

type CsvParseProps = {
    file : File
    onParseComplete : Function
}
export function parseCsvFile(props: CsvParseProps) {
    if(props.file === undefined) throw new Error('Undefined CSV File')
    try {
        Papa.parse(props.file, {
            complete: function (parsedFile) {
                props.onParseComplete(parsedFile);
            }
        });
    } catch (e) {
        throw new Error('Cannot Parse CSV File')
    }
}