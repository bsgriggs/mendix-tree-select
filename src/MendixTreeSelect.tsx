import { ReactElement, createElement, useCallback, useEffect, useState } from "react";
import { MendixTreeSelectContainerProps } from "../typings/MendixTreeSelectProps";
import { TreeSelect } from "antd";
import { ValueStatus, ObjectItem } from "mendix";
import { OptionMap } from "typings/OptionMap";

export function MendixTreeSelect({
    id,
    name,
    tabIndex,
    association,
    dataSource,
    objKey,
    label,
    parentKey,
    checkable,
    selectableJSON,
    expandAll,
    inputType,
    placeholder,
    selectionType,
    selectedAttribute,
    showTreeLines,
    treeDataType
}: MendixTreeSelectContainerProps): ReactElement {
    const [data, setData] = useState<OptionMap[]>([]);
    const [value, setValue] = useState<string[]>([]);

    // Mendix Convert Data
    useEffect(() => {
        if (inputType === "MENDIX" && dataSource.status === ValueStatus.Available && dataSource.items) {
            setData(convertOptionMap(dataSource.items));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSource]);

    // Mendix Convert Current Value
    useEffect(() => {
        if (inputType === "MENDIX" && association.status === ValueStatus.Available) {
            setValue(convertCurrentValue(association.value as ObjectItem[]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [association]);

    // JSON Convert Data
    useEffect(() => {
        if (inputType === "JSON" && selectableJSON.status === ValueStatus.Available) {
            setData(JSON.parse(selectableJSON.value));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectableJSON]);

    // JSON Convert Current Value
    useEffect(() => {
        if (inputType === "JSON" && selectedAttribute.status === ValueStatus.Available) {
            setValue(JSON.parse(selectedAttribute.value as string));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAttribute]);

    const convertOptionMap = useCallback(
        (list: ObjectItem[]): OptionMap[] => {
            return list.map(obj => {
                return {
                    value: objKey.get(obj).displayValue,
                    label: label.get(obj).value as string,
                    id: objKey.get(obj).displayValue,
                    pId: parentKey.get(obj).displayValue,
                    objectItem: obj
                };
            });
        },
        [objKey, label, parentKey]
    );

    const convertCurrentValue = useCallback(
        (list: ObjectItem[]): string[] => {
            return list.map(obj => objKey.get(obj).displayValue);
        },
        [objKey]
    );

    const onChange = useCallback(
        (newValue: string[]) => {
            if (inputType === "MENDIX") {
                association.setValue(
                    data.filter(option => newValue.includes(option.id)).map(option => option.objectItem)
                );
            } else {
                selectedAttribute.setValue(JSON.stringify(newValue));
            }
        },
        [selectedAttribute, association, data, inputType]
    );

    return (
        <TreeSelect
            id={name}
            tabIndex={tabIndex}
            aria-describedby={id}
            treeData={data}
            showSearch
            value={value}
            popupMatchSelectWidth
            placeholder={placeholder.value}
            allowClear
            multiple
            treeDefaultExpandAll={expandAll}
            onChange={onChange}
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
            disabled={inputType === "MENDIX" ? association.readOnly : selectedAttribute.readOnly}
        />
    );
}
