import { useEffect, useState } from "react";

export function useCopy() {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
    };

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        }
    }, [isCopied]);

    return { isCopied, copyToClipboard, setIsCopied };
}   