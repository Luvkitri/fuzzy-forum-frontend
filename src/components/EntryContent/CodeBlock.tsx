import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

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
