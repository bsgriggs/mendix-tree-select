import { ReactElement, createElement, useCallback, useEffect, useState } from "react";
import { MendixTreeSelectContainerProps } from "../typings/MendixTreeSelectProps";
import { TreeSelect } from "antd";
import { ValueStatus, ObjectItem } from "mendix";
import "./ui/TreeSelect.css";
import { DefaultOptionType } from "antd/es/select";

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
    const [value, setValue] = useState<DefaultOptionType[]>([]);

    useEffect(() => {
        if (dataSource.status === ValueStatus.Available && dataSource.items) {
            setData(convertToOption(dataSource.items));
        } else {
            setData([]);
        }
    }, [dataSource]);

    useEffect(() => {
        if (association.status === ValueStatus.Available) {
            setValue(convertToOption(association.value as ObjectItem[]));
        } else {
            setValue([]);
        }
    }, [association]);

    const convertToOption = useCallback((list: ObjectItem[]): DefaultOptionType[] => {
        let node: DefaultOptionType,
            roots: DefaultOptionType[] = [];
        let baseList: DefaultOptionType[] = list.map(obj => {
            return {
                label: label.get(obj).value,
                value: objKey.get(obj).displayValue,
                parentValue: parentKey.get(obj).displayValue,
                objectItem: obj,
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

    const onChange = useCallback((newValue: DefaultOptionType[]) => {
        console.info("selected ant", newValue);
        /* eslint-disable */
        // @ts-ignore
        const selected = data.filter(option => newValue.includes(option.value)).map(option => option.objectItem);
        console.info("selected mx", selected);
        association.setValue(selected);
        /* eslint-enable */
    }, []);

    console.info("data", data);

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
            style={{ width: "100%" }}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChange}
            treeNodeFilterProp="label"
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_ALL}
        />
    );
}
