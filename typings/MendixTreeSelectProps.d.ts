/**
 * This file was generated from MendixTreeSelect.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, ListValue, ListAttributeValue, ListExpressionValue, ReferenceSetValue } from "mendix";
import { Big } from "big.js";

export interface MendixTreeSelectContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    dataSource: ListValue;
    label: ListExpressionValue<string>;
    objKey: ListAttributeValue<string | Big>;
    parentKey: ListAttributeValue<string | Big>;
    association: ReferenceSetValue;
    onSelect?: ActionValue;
}

export interface MendixTreeSelectPreviewProps {
    readOnly: boolean;
    dataSource: {} | { type: string } | null;
    label: string;
    objKey: string;
    parentKey: string;
    association: string;
    onSelect: {} | null;
}
