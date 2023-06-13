/**
 * This file was generated from MendixAntdTreeSelect.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, EditableValue, ListValue, ListAttributeValue, ListExpressionValue, ReferenceValue, ReferenceSetValue } from "mendix";
import { Big } from "big.js";

export type InputTypeEnum = "MENDIX" | "JSON";

export type ReferenceTypeEnum = "REFERENCE" | "REFERENCE_SET";

export type SelectionTypeEnum = "ALL" | "PARENT" | "CHILDREN";

export type TreeDataTypeEnum = "FLAT" | "TREE";

export interface MendixAntdTreeSelectContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    placeholder: DynamicValue<string>;
    expandAll: boolean;
    checkable: boolean;
    showTreeLines: boolean;
    inputType: InputTypeEnum;
    referenceType: ReferenceTypeEnum;
    selectionType: SelectionTypeEnum;
    dataSource: ListValue;
    label: ListExpressionValue<string>;
    objKey: ListAttributeValue<string | Big>;
    parentKey: ListAttributeValue<string | Big>;
    reference: ReferenceValue;
    referenceSet: ReferenceSetValue;
    treeDataType: TreeDataTypeEnum;
    selectableJSON: DynamicValue<string>;
    selectedAttribute: EditableValue<string>;
}

export interface MendixAntdTreeSelectPreviewProps {
    readOnly: boolean;
    placeholder: string;
    expandAll: boolean;
    checkable: boolean;
    showTreeLines: boolean;
    inputType: InputTypeEnum;
    referenceType: ReferenceTypeEnum;
    selectionType: SelectionTypeEnum;
    dataSource: {} | { type: string } | null;
    label: string;
    objKey: string;
    parentKey: string;
    reference: string;
    referenceSet: string;
    treeDataType: TreeDataTypeEnum;
    selectableJSON: string;
    selectedAttribute: string;
    onChange: {} | null;
}
