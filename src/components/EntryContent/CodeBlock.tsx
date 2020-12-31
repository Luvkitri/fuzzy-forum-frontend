import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
    language: string,
    value: string
}

const CodeBlock: React.FC<Props> = ({language, value}) => {
    return (
        <SyntaxHighlighter language={language} value={value}>
            {value}
        </SyntaxHighlighter>
    )
}

export default CodeBlock;
