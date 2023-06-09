import { ReactElement, createElement } from "react";
import { MendixAntdTreeSelectPreviewProps } from "../typings/MendixAntdTreeSelectProps";
import { TreeSelect } from "antd";

export function preview({
    referenceType,
    reference,
    referenceSet,
    checkable,
    expandAll,
    inputType,
    // label,
    placeholder,
    readOnly,
    selectedAttribute,
    selectionType,
    showTreeLines,
    treeDataType
}: MendixAntdTreeSelectPreviewProps): ReactElement {
    const data = [
        {
            label: "Node1",
            value: "1",
            children: [
                {
                    label: "Child Node1",
                    value: "2",
                    children: [
                        {
                            label: "Grand Child Node1",
                            value: "3"
                        }
                    ]
                }
            ]
        }
    ];

    return (
        <TreeSelect
            treeData={data}
            showSearch
            value={
                inputType === "MENDIX" ? (referenceType === "REFERENCE" ? reference : referenceSet) : selectedAttribute
            }
            popupMatchSelectWidth
            placeholder={placeholder}
            allowClear
            multiple
            treeDefaultExpandAll={expandAll}
            treeCheckable={checkable}
            showCheckedStrategy={
                selectionType === "ALL"
                    ? TreeSelect.SHOW_ALL
                    : selectionType === "PARENT"
                    ? TreeSelect.SHOW_PARENT
                    : TreeSelect.SHOW_CHILD
            }
            treeNodeFilterProp="label"
            treeLine={showTreeLines}
            treeDataSimpleMode={inputType === "MENDIX" || treeDataType === "FLAT"}
            disabled={readOnly}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/TreeSelect.css");
}
