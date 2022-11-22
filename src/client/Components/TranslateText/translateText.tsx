import React from "react";
import { useTranslation } from "react-i18next";

interface TranslateProps {
    content: string,
    defaultValue?: string,
    start?: string | JSX.Element,
    end?: string | JSX.Element
}

const TranslateText: React.FC<TranslateProps> = (props): JSX.Element => {
    const [translation, i18n] = useTranslation();
    return <>{props.start || ""}{translation(props.content, { defaultValue: props.defaultValue })}{props.end || ""}</>;
}

export default TranslateText;