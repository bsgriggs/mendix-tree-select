import { ReactElement, createElement } from "react";
import { MendixTreeSelectPreviewProps } from "../typings/MendixTreeSelectProps";

export function preview({  }: MendixTreeSelectPreviewProps): ReactElement {
    return <div />;
}

export function getPreviewCss(): string {
    return require("./ui/TreeSelect.css");
}
