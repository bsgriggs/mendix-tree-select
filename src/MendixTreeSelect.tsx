import { ReactElement, createElement, useCallback, useEffect, useState } from "react";
import { MendixTreeSelectContainerProps } from "../typings/MendixTreeSelectProps";
import { TreeSelect } from "antd";
import { ValueStatus } from "mendix";
import "./ui/TreeSelect.css";
import { BaseOptionType } from "antd/es/select";

export function MendixTreeSelect({
    id,
    name,
    dataString,
    setAttribute,
    tabIndex
}: MendixTreeSelectContainerProps): ReactElement {
    const [data, setData] = useState<BaseOptionType[]>([]);
    const [value, setValue] = useState<string[]>();

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
            treeNodeFilterProp="value"
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_ALL}
        />
    );
}
