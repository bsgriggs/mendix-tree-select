import { ReactElement, createElement, useCallback, useEffect, useState } from "react";
import { MendixTreeSelectContainerProps } from "../typings/MendixTreeSelectProps";
import { TreeSelect } from "antd";
import { ValueStatus, ObjectItem } from "mendix";
import "./ui/TreeSelect.css";
import { DefaultOptionType } from "antd/es/select";
import { OptionMap } from "typings/OptionMap";

export function MendixTreeSelect({
    id,
    name,
    tabIndex,
    association,
    dataSource,
    objKey,
    label,
    parentKey
}: MendixTreeSelectContainerProps): ReactElement {
    const [data, setData] = useState<DefaultOptionType[]>([]);
    const [optionMap, setOptionMap] = useState<OptionMap[]>([]);
    const [value, setValue] = useState<string[]>([]);

    useEffect(() => {
        if (dataSource.status === ValueStatus.Available && dataSource.items) {
            setData(convertToOption(dataSource.items));
            setOptionMap(convertOptionMap(dataSource.items));
        } else {
            setData([]);
        }
    }, [dataSource]);

    useEffect(() => {
        if (association.status === ValueStatus.Available) {
            setValue(convertCurrentValue(association.value as ObjectItem[]));
        } else {
            setValue([]);
        }
    }, [association]);

    const convertOptionMap = useCallback((list: ObjectItem[]): OptionMap[] => {
        return list.map(obj => {
            return {
                key: objKey.get(obj).displayValue,
                objectItem: obj
            };
        });
    }, []);

    const convertCurrentValue = useCallback((list: ObjectItem[]): string[] => {
        return list.map(obj => objKey.get(obj).displayValue);
    }, []);

    const convertToOption = useCallback((list: ObjectItem[]): DefaultOptionType[] => {
        let node: DefaultOptionType,
            roots: DefaultOptionType[] = [];
        let baseList: DefaultOptionType[] = list.map(obj => {
            return {
                label: label.get(obj).value,
                value: objKey.get(obj).displayValue,
                parentValue: parentKey.get(obj).displayValue,
                children: []
            };
        });
        for (let i = 0; i < baseList.length; i += 1) {
            node = baseList[i];
            if (node.parentValue) {
                // if you have dangling branches check that map[node.parentId] exists
                baseList.find(opt => opt.value === node.parentValue)?.children?.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }, []);

    const onChange = (newValue: string[]) => {
        // setValue(newValue);
        // let selected: ObjectItem[] = [];
        // newValue.forEach(val => {
        //     optionMap.forEach(option => {
        //         if (option.key === val) {
        //             selected.push(option.objectItem);
        //         }
        //     });
        // });
        const selected = optionMap.filter(option => newValue.includes(option.key)).map(option => option.objectItem);
        association.setValue(selected);
    };

    /* JSON version
        useEffect(() => {
        if (dataString.status === ValueStatus.Available) {
            const newOptions: BaseOptionType[] = JSON.parse(dataString.value);
            setData(newOptions);
            console.info("New options", newOptions);
        }
    }, [dataString]);

    useEffect(() => {
        if (setAttribute.status === ValueStatus.Available) {
            setValue(JSON.parse(setAttribute.value as string));
        }
    }, [setAttribute]);

    const onChange = useCallback((newValue: string[]) => {
        console.info("selected", newValue);
        setAttribute.setValue(JSON.stringify(newValue));
    }, [setAttribute]);
    */

    return (
            <TreeSelect
                tabIndex={tabIndex}
                id={name}
                aria-describedby={id}
                treeData={data}
                showSearch
                value={value}
                popupMatchSelectWidth
                placeholder="Please select"
                allowClear
                multiple
                treeDefaultExpandAll
                onChange={onChange}
                treeCheckable
                showCheckedStrategy={TreeSelect.SHOW_ALL}
                autoClearSearchValue
            />
    );
}
