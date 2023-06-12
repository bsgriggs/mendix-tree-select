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

    //Mendix Convert Data
    useEffect(() => {
        if (inputType === "MENDIX" && dataSource.status === ValueStatus.Available && dataSource.items) {
            setData(convertOptionMap(dataSource.items));
        }
    }, [dataSource]);

    //Mendix Convert Current Value
    useEffect(() => {
        if (inputType === "MENDIX" && association.status === ValueStatus.Available) {
            setValue(convertCurrentValue(association.value as ObjectItem[]));
        }
    }, [association]);

    //JSON Convert Data
    useEffect(() => {
        if (inputType === "JSON" && selectableJSON.status === ValueStatus.Available) {
            setData(JSON.parse(selectableJSON.value));
        }
    }, [selectableJSON]);

    //JSON Convert Current Value
    useEffect(() => {
        if (inputType === "JSON" && selectedAttribute.status === ValueStatus.Available) {
            setValue(JSON.parse(selectedAttribute.value as string));
        }
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
        [objKey, label, parentKey, dataSource]
    );

    const convertCurrentValue = useCallback((list: ObjectItem[]): string[] => {
        return list.map(obj => objKey.get(obj).displayValue);
    }, []);

    const onChange = useCallback(
        (newValue: string[]) => {
            inputType === "MENDIX"
                ? association.setValue(
                      data.filter(option => newValue.includes(option.id)).map(option => option.objectItem)
                  )
                : selectedAttribute.setValue(JSON.stringify(newValue));
        },
        [selectedAttribute, association, data]
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
            disabled={selectedAttribute.readOnly || association.readOnly}
        />
    );
}
