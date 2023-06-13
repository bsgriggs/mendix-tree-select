import { ReactElement, createElement, useCallback, useEffect, useMemo, useState } from "react";
import { MendixAntdTreeSelectContainerProps } from "../typings/MendixAntdTreeSelectProps";
import { TreeSelect } from "antd";
import { ValueStatus, ObjectItem } from "mendix";
import { OptionMap } from "typings/OptionMap";

export function MendixAntdTreeSelect({
    id,
    name,
    tabIndex,
    referenceType,
    reference,
    referenceSet,
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
}: MendixAntdTreeSelectContainerProps): ReactElement {
    const [data, setData] = useState<OptionMap[]>([]);
    const [value, setValue] = useState<undefined | string | string[]>();

    const readOnly = useMemo(() => {
        if (inputType === "MENDIX") {
            if (referenceType === "REFERENCE") {
                return reference.readOnly;
            } else {
                return referenceSet.readOnly;
            }
        } else {
            return selectedAttribute.readOnly;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reference, referenceSet, selectedAttribute]);

    // Mendix Convert Data
    useEffect(() => {
        if (inputType === "MENDIX" && dataSource.status === ValueStatus.Available && dataSource.items) {
            setData(convertOptionMap(dataSource.items));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSource]);

    // Mendix Convert Current Value
    useEffect(() => {
        if (inputType === "MENDIX") {
            if (referenceType === "REFERENCE" && reference.status === ValueStatus.Available) {
                setValue(reference.value ? objKey.get(reference.value).displayValue : undefined);
            } else if (referenceType === "REFERENCE_SET" && referenceSet.status === ValueStatus.Available) {
                setValue(convertCurrentValueList(referenceSet.value as ObjectItem[]));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reference, referenceSet]);

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
            if (selectedAttribute.displayValue.trim() !== "") {
                setValue(JSON.parse(selectedAttribute.displayValue));
            } else {
                setValue(undefined);
            }
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

    const convertCurrentValueList = useCallback(
        (list: ObjectItem[]): string[] => {
            return list.map(obj => objKey.get(obj).displayValue);
        },
        [objKey]
    );

    const onChange = useCallback(
        (newValue: string | string[]) => {
            if (inputType === "MENDIX") {
                if (referenceType === "REFERENCE") {
                    reference.setValue(data.find(option => option.id === newValue)?.objectItem);
                } else {
                    referenceSet.setValue(
                        data.filter(option => newValue.includes(option.id)).map(option => option.objectItem)
                    );
                }
            } else {
                selectedAttribute.setValue(JSON.stringify(newValue));
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedAttribute, reference, referenceSet, data]
    );

    console.info("props", {selectableJSON, selectedAttribute});

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
            multiple={referenceType === "REFERENCE_SET"}
            treeDefaultExpandAll={expandAll}
            onChange={onChange}
            treeCheckable={checkable && referenceType !== "REFERENCE"}
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
