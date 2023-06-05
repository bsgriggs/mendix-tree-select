/**
 * This file was generated from MendixTreeSelect.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, EditableValue } from "mendix";

export interface MendixTreeSelectContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    dataString: DynamicValue<string>;
    setAttribute: EditableValue<string>;
}

export interface MendixTreeSelectPreviewProps {
    readOnly: boolean;
    dataString: string;
    setAttribute: string;
    onSelect: {} | null;
}
