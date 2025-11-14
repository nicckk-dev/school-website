import { Button, Cascader, Checkbox, Collapse, Divider, Form, Input, Select, Space, TreeSelect } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AutoCompleteComp, ButtonComp, CheckboxComp, DatePickerComp, ImageComp, InputComp, RadioComp, SwitchComp, TextareaComp, TimePickerComp, UploadComp } from "./FormComponent";
import CommHeader from "./CommHeader";
import { SelectComp } from "./SelectComp";
import { CaretDownFilled, FilterOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import '../../assets/css/style.scss';
import PropTypes from "prop-types";

const { Option } = Select;

export const SelectwithInput = (props) => {
    let index = 0;
    const [items, setItems] = useState(props.options || []);
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return (
        <div className="FormStyle my-2">
            <label htmlFor="textarea" className="FormLabel">Custom Select with Input</label>
            <SelectComp props={{
                options: items.map(item => ({
                    label: item,
                    value: item,
                })),
                mode: 'multiple',
                required: true, name: 'Select4', size: 'large',
                dropdownRender: (menu) => (
                    <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 0' }}>
                            <Input placeholder="Please enter item" ref={inputRef} value={name} onChange={onNameChange} />
                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>Add item</Button>
                        </Space>
                    </>
                ),
                suffixIcon: <CaretDownFilled style={{ pointerEvents: "none" }} />
            }} />
        </div>
    )
}

export const SelectedHide = (props) => {
    let options = props.options || ['Item 1', 'Item 2', 'Item 3']
    const [selectedItems, setSelectedItems] = useState([]);
    const filterOptions = options.filter((op) => !selectedItems.includes(op));

    return (
        <div className="FormStyle my-2">
            <label htmlFor="textarea" className="FormLabel">SelectedHide</label>
            <SelectComp props={{
                options: filterOptions.map(item => ({
                    label: item,
                    value: item,
                })),
                mode: 'multiple',
                required: true, name: 'Select5', size: 'large',
                value: { selectedItems },
                onChange: setSelectedItems,
                suffixIcon: <CaretDownFilled style={{ pointerEvents: "none" }} />
            }} />
        </div>
    )
}

export const SelectAllSelect = (props) => {

    let selectRef = useRef();
    const [selectedValues, setSelectedValues] = useState([]);
    const initialSelect = selectedValues.length === props.options.length
    const [indeterminate, setIndeterminate] = useState(!initialSelect);
    const [checked, setChecked] = useState(initialSelect);

    const handleAllChange = (e) => {
        console.log(e.target.checked);
        if (e.target.checked === false) {
            setSelectedValues([]);
            setIndeterminate(false);
            setChecked(false);
        }
        else {
            const allOpt = props.options.map(op => op.value);
            setSelectedValues(allOpt);
            setIndeterminate(false);
            setChecked(true);
        }
    }

    useEffect(() => {
        if (selectedValues.includes('all')) {
            const allOpt = props.options.map(op => op.value);
            setSelectedValues(allOpt);
            setIndeterminate(false);
            setChecked(true);
        }
        else {
            setChecked(selectedValues.length === props.options.length);
            setIndeterminate(!!selectedValues.length && selectedValues.length < props.options.length);
        }
    }, [selectedValues, props.options]);

    const handleChange = (selected) => {
        console.log('selected', selected);
        setSelectedValues(selected);
    }

    return (
        <div className="FormStyle my-2">
            <Form.Item
                // label={props.label}
                name={props.name}
                rules={[
                    {
                        required: props.required || true,
                        message: props.message,
                    },
                ]}
            >
                <label htmlFor="select" className="FormLabel">{props.label}</label>
                <Select mode="multiple" style={props.style} size='large' value={selectedValues} onChange={handleChange || props.onChange} className={props.className}
                    placement={props.placement} placeholder={props.placeholder} maxTagCount={props.maxTagCount}
                    maxLength={props.maxLength} maxTagTextLength={props.maxTagTextLength} dropdownRender={props.dropdownRender}
                    dropdownStyle={props.dropdownStyle} suffixIcon={<CaretDownFilled style={{ pointerEvents: "none" }} />}>
                    <Option value={'all'}><Checkbox onChange={handleAllChange} ref={selectRef} indeterminate={indeterminate} checked={checked}>Select All</Checkbox></Option>
                    {
                        props.options.map((op, index) => (
                            <Option value={op.value} key={index}>{op.label}</Option>
                        ))
                    }
                </Select>

            </Form.Item>
        </div>
    )
}

export const CascaderComp = (props) => {
    let options = props.options || [
        {
            value: 'Item1',
            label: 'Item1',
            children: [
                {
                    value: 'SubItem1',
                    label: 'SubItem1',
                    children: [
                        {
                            value: 'Sub SubItem 1',
                            label: 'Sub SubItem 1',
                        },
                    ],
                },
                {
                    value: 'SubItem2',
                    label: 'SubItem2',
                    children: [
                        {
                            value: 'Sub SubItem 1',
                            label: 'Sub SubItem 1',
                        },
                        {
                            value: 'Sub SubItem 2',
                            label: 'Sub SubItem 2',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ];

    return (

        <div className="FormStyle my-2">
            <label htmlFor="textarea" className="FormLabel">Select Cascader</label>
            <Cascader options={options} onChange={props.onChange} className={props.onChange} size={props.size}
                suffixIcon={<CaretDownFilled style={{ pointerEvents: "none" }} />}
                style={props.style} />
        </div>

    )
}

export const TreeSelectComp = (props) => {
    const treeData = [
        {
            value: 'parent 1',
            title: 'parent 1',
            children: [
                {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    children: [
                        {
                            value: 'leaf1',
                            title: 'leaf1',
                        },
                        {
                            value: 'leaf2',
                            title: 'leaf2',
                        },
                    ],
                },
                {
                    value: 'parent 1-1',
                    title: 'parent 1-1',
                    children: [
                        {
                            value: 'leaf3',
                            title: (
                                <b
                                    style={{
                                        color: '#08c',
                                    }}
                                >
                                    leaf3
                                </b>
                            ),
                        },
                    ],
                },
            ],
        },
    ];

    return (

        <div className="FormStyle my-2">
            <label htmlFor="textarea" className="FormLabel">TreeSelect</label>
            <TreeSelect treeData={props.treeData || treeData} size={props.size} loadData={props.loadData}
                showSearch={props.showSearch} style={props.style} placeholder={props.placeholder}
                onChange={props.onChange} allowClear={props.allowClear} multiple={props.multiple}
                dropdownStyle={props.dropdownStyle} value={props.value} treeDefaultExpandAll={props.treeDefaultExpandAll}
                suffixIcon={<CaretDownFilled style={{ pointerEvents: "none" }} />} />
        </div>

    )
}

export const ComponentAccordion = () => {
    // console.log('route')

    const handleChange = (e) => {
        console.log(e)
    }
    //const dateFormat = "DD-MMM-YYYY";
    const options = [{ value: 'jack', label: 'Jack', }, { value: 'kane', label: 'Kane', }, { value: 'lucy', label: 'Lucy', }];
    const treeData2 = [
        {
            value: 'parent 1',
            title: 'parent 1',
            children: [
                {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    children: [
                        {
                            value: 'leaf1',
                            title: 'leaf1',
                        },
                        {
                            value: 'leaf2',
                            title: 'leaf2',
                        },
                    ],
                },
            ],
        },
    ];

    const inputComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="number" className="FormLabel">Text Input</label>
                    <InputComp props={{
                        onChange: handleChange, type: "text",
                        placeholder: 'Text Input', size: 'large',
                        name: 'input1', required: true, message: "Enter Input Number", minLength: 4, maxLength: 10,
                    }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="number" className="FormLabel">Number Input</label>
                    <InputComp props={{
                        onChange: handleChange, type: "number",
                        placeholder: 'Number Input', size: 'large',
                        name: 'number', required: true, message: "Enter Input Number", minLength: 4, maxLength: 10,
                    }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="number" className="FormLabel">Pattern Input</label>
                    <InputComp props={{
                        onChange: handleChange, type: "text",
                        placeholder: 'Pattern Input', size: 'large', pattern: '[0-9]{5}',
                        name: 'pattern', required: true, message: "Pattren Number", minLength: 4, maxLength: 20,
                    }}
                    />
                </div>
            </div>
        </div>
    )

    const textareaComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="textarea" className="FormLabel textarea">TextArea</label>
                    <TextareaComp props={{
                        name: 'textarea', onChange: handleChange,
                        required: true, message: 'Enter Message', minLength: 10,
                    }}
                    />
                </div>
            </div>
        </div>
    )

    const selectComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="textarea" className="FormLabel">Select(Single)</label>
                    <SelectComp props={{
                        options: [{ value: 'jack', label: 'Jack', }, { value: 'kane', label: 'Kane', }, { value: 'lucy', label: 'Lucy', }],
                        mode: 'single',    // mode: {single,multiple,tags}
                        onChange: handleChange, required: true, name: 'Select1', size: 'large',
                        suffixIcon: <CaretDownFilled style={{ pointerEvents: "none" }} />
                    }} />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="textarea" className="FormLabel">Select(Mutliple)</label>
                    <SelectComp props={{
                        options: [{ value: 'jack', label: 'Jack', }, { value: 'kane', label: 'Kane', }, { value: 'lucy', label: 'Lucy', }],
                        mode: 'multiple',    // mode: {single,multiple,tags}
                        onChange: handleChange, required: true, name: 'Select2', size: 'large',
                        suffixIcon: <CaretDownFilled style={{ pointerEvents: "none" }} />
                    }} />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="textarea" className="FormLabel">Select(With Seperator)</label>
                    <SelectComp props={{
                        options: [{ value: 'jack', label: 'Jack', }, { value: 'kane', label: 'Kane', }, { value: 'lucy', label: 'Lucy', }],
                        mode: 'multiple',    // mode: {single,multiple,tags}
                        seperator: [','],
                        onChange: handleChange, required: true, name: 'Select3', size: 'large',
                        suffixIcon: <CaretDownFilled style={{ pointerEvents: "none" }} />
                    }} />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <SelectwithInput />
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="textarea" className="FormLabel">Select(With Position)</label>
                    <SelectComp props={{
                        options: [{ value: 'jack', label: 'Jack', }, { value: 'kane', label: 'Kane', }, { value: 'lucy', label: 'Lucy', }],
                        mode: 'multiple',
                        seperator: [','],
                        placement: 'bottomLeft', //{'topLeft','topRight','bottomLeft','bottomRight',}
                        onChange: handleChange, required: true, name: 'Select6', size: 'large',
                        suffixIcon: <CaretDownFilled style={{ pointerEvents: "none" }} />
                    }} />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <SelectedHide />
            </div>
            <div className="col-lg-6 col-md-12">
                <CascaderComp size='large' style={{ width: '100%' }} />
            </div>
            <div className="col-lg-6 col-md-12">
                <TreeSelectComp size='large' style={{ width: '100%' }} />
            </div>
            <div className="col-lg-6 col-md-12">
                <SelectAllSelect style={{ width: '100%' }} options={options} label='Select All' />
            </div>
        </div>
    )

    const autoComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="autocomplete" className="FormLabel autocomplete">AutoComplete</label>
                    <AutoCompleteComp props={{
                        name: 'AutoComplete', onChange: handleChange,
                        size: 'large',
                        options: [
                            { value: 'Bus Travels fast' },
                            { value: 'Bus Travels slow' },
                            { value: 'Car Travels fast' },
                        ],
                        required: true, message: 'Select'
                    }}
                    />
                </div>
            </div>
        </div>
    )

    const checkComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12 border">
                <div className="FormStyle my-2">
                    <div className="FormStyle my-2">
                        <CheckboxComp props={{
                            name: 'Checkbox',
                            onChange: handleChange,
                            value: 'Checkbox1',
                            content: 'ChekcBox(Without Grouping)'

                        }} group={false} />
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12 border">
                <div className="FormStyle my-2">
                    <div className="FormStyle my-2">
                        <CheckboxComp props={{
                            name: 'Checkbox1',
                            onChange: handleChange,
                            options: ['Checkbox(With Grouping)', 'Checkbox(With Grouping)'],
                            required: true, message: 'Check'

                        }} group={true} />
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12 border">
                <div className="FormStyle my-2">
                    <div className="FormStyle my-2">
                        <CheckboxComp props={{
                            name: 'Checkbox2',
                            onChange: handleChange,
                            options: ['Checkbox', 'Pear', 'Orange'],
                            required: true, message: 'Check'

                        }} group={true} checkallbtn={true} divider={true} />
                    </div>
                </div>
            </div>
        </div>
    )

    const radioComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <div className="FormStyle my-2">
                        <RadioComp props={{ name: 'radio1', onChange: handleChange, value: 'Radio1', required: false, message: 'Select', content: 'Single Radio' }} group={false} />
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <div className="FormStyle my-2">
                        <RadioComp props={{ name: 'Radio', onChange: handleChange, options: ['Jack', 'Lucy', 'Kane'], required: true, message: 'Select', }} group={true} />
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <div className="FormStyle my-2">
                        <RadioComp props={{
                            name: 'radio3', onChange: () => console.log('Radio'), options: ['Apple', 'Pear', 'Orange'], required: true, message: 'Select', buttonStyle: 'solid'
                        }} group={true} radioStyle={true} />
                    </div>
                </div>
            </div>
        </div>
    )

    const dateComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="date" className="FormLabel">Simple DatePicker</label>
                    <DatePickerComp props={{
                        name: 'Date1', required: true,
                        message: 'Date',
                        className: 'w-100', size: 'large', format: 'DD-MMM-YYYY'
                    }} />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="date" className="FormLabel">DatePicker with Placements</label>
                    <DatePickerComp props={{
                        name: 'Date2', required: true,
                        message: 'Date', value: dayjs('12-AUG-2023', 'DD-MMM-YYYY'),
                        onChange: handleChange, placement: 'topRight',
                        className: 'w-100', size: 'large', format: 'DD-MMM-YYYY'
                    }} />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="date" className="FormLabel">Range DatePicker</label>
                    <DatePickerComp props={{
                        name: 'Date3', required: true,
                        message: 'Date',
                        onChange: handleChange,
                        className: 'w-100', size: 'large',
                        format: 'DD-MMM-YYYY'
                    }} range={true} />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="date" className="FormLabel">DatePicker with Switch Cases</label>
                    <DatePickerComp props={{
                        name: 'Date4', required: true,
                        message: 'Date', value: dayjs('12-AUG-2023', 'DD-MMM-YYYY'),
                        onChange: handleChange,
                        className: 'w-100', size: 'large', format: 'DD-MMM-YYYY'
                    }} range={false} switchPick={true} />
                </div>
            </div>
        </div>
    )

    const timeComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="time" className="FormLabel">TimePicker</label>
                    <TimePickerComp props={{
                        name: 'Time1',
                        required: true, message: 'Time', onChange: handleChange,
                        value: dayjs('12:11:08', 'HH:mm:ss'), size: 'large',
                        className: 'w-100'
                    }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="time" className="FormLabel">TimePicker (12 Hours)</label>
                    <TimePickerComp props={{
                        name: 'Time2',
                        required: true, message: 'Time', onChange: handleChange,
                        value: dayjs('12:11:08', 'HH:mm:ss'), size: 'large',
                        use12Hours: true,
                        className: 'w-100'
                    }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2">
                    <label htmlFor="time" className="FormLabel">TimePicker with Steps</label>
                    <TimePickerComp props={{
                        name: 'Time3',
                        required: true, message: 'Time', onChange: handleChange,
                        value: dayjs('12:11:08', 'HH:mm:ss'), size: 'large',
                        secondStep: '10',
                        minuteStep: '10',
                        hourStep: '2',
                        className: 'w-100'
                    }}
                    />
                </div>
            </div>
        </div>
    )

    const uploadComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 d-flex justify-content-center">
                    <label htmlFor="time" className="FormLabel">Upload with fileTypes</label>
                    <UploadComp props={{
                        name: 'Upload1', required: true, message: 'Upload',
                        onChange: handleChange, multiple: true, showPreviewIcon: false, showDownloadIcon: true,
                        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', accept: 'application/pdf',
                        content: <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    }}
                        updatedList={true} fileType={['application/pdf', 'image/jpeg']}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 d-flex justify-content-center">
                    <label htmlFor="time" className="FormLabel">Upload with MaxCount</label>
                    <UploadComp props={{
                        name: 'Upload2', required: true, message: 'Upload',
                        onChange: handleChange, maxCount: 3, multiple: true, showDownloadIcon: true, showPreviewIcon: false,
                        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', accept: 'application/pdf',
                    }}
                        updatedList={true} fileType={['application/pdf', 'image/jpeg']} showPreview={true}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 d-flex justify-content-center">
                    <label htmlFor="time" className="FormLabel">Upload with Preview Icon</label>
                    <UploadComp props={{
                        name: 'Upload3', required: true, message: 'Upload',
                        onChange: handleChange, maxCount: 3, multiple: true, showDownloadIcon: true,
                        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', accept: 'application/pdf',
                    }}
                        updatedList={true} fileType={['application/pdf', 'image/jpeg']} showPreview={true}
                    />
                </div>
            </div>
        </div>
    )

    const imageComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 d-flex">
                    <label htmlFor="time" className="FormLabel">ImageComp</label>
                    <ImageComp props={{
                        src: 'https://source.unsplash.com/nV7GJmSq3zc', width: 200, height: 200,
                    }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 d-flex">
                    <label htmlFor="time" className="FormLabel">ImageComp with Group Slider</label>
                    <ImageComp props={{
                        src: 'https://source.unsplash.com/nV7GJmSq3zc', width: 200, height: 200,
                        items: ['https://source.unsplash.com/ukvgqriuOgo', 'https://source.unsplash.com/LY1eyQMFeyo', 'https://source.unsplash.com/VviFtDJakYk'],
                    }} group={true} previewOne={true}
                    />
                </div>
            </div>
        </div>
    )

    const switchComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 justify-content-center d-flex">
                    <label htmlFor="time" className="FormLabel">SwitchComp</label>
                    <SwitchComp props={{
                        size: 'large'
                    }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 justify-content-center d-flex">
                    <label htmlFor="time" className="FormLabel">SwitchComp with loading</label>
                    <SwitchComp props={{
                        size: 'large', loading: true
                    }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 justify-content-center d-flex">
                    <label htmlFor="time" className="FormLabel">SwitchComp with disabled props</label>
                    <SwitchComp props={{
                        size: 'large',
                    }}
                        conditionalProps={{ disabled: true }}
                    />
                </div>
            </div>
        </div>
    )

    const buttonComp = (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 justify-content-center d-flex">
                    {/* <label htmlFor="time" className="FormLabel">ButtonComp</label> */}
                    <ButtonComp props={{
                        size: 'large', type: 'primary', label: 'ButtonComp',
                        onClick: handleChange,
                    }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 justify-content-center d-flex">
                    {/* <label htmlFor="time" className="FormLabel">ButtonComp</label> */}
                    <ButtonComp props={{
                        size: 'large', type: 'primary', label: 'ButtonComp with Icon', icon: <FilterOutlined />,
                        onClick: handleChange
                    }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 justify-content-center d-flex">
                    {/* <label htmlFor="time" className="FormLabel">ButtonComp</label> */}
                    <ButtonComp props={{
                        size: 'large', type: 'primary', label: 'ButtonComp with Block-level props',
                        onClick: handleChange,
                    }}
                        conditionalProps={{ block: true }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 justify-content-center d-flex">
                    {/* <label htmlFor="time" className="FormLabel">ButtonComp</label> */}
                    <ButtonComp props={{
                        size: 'large', type: 'primary', label: 'ButtonComp with disabled props',
                        onClick: handleChange,
                    }}
                        conditionalProps={{ disabled: true }}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="FormStyle my-2 justify-content-center d-flex">
                    {/* <label htmlFor="time" className="FormLabel">ButtonComp</label> */}
                    <ButtonComp props={{
                        size: 'large', type: 'primary', label: 'Loading Button',
                        onClick: handleChange,
                        loading: true
                    }}
                    />
                </div>
            </div>
        </div>
    )

    const items = [
        {
            key: '1',
            label: 'Input Component',
            children: inputComp,
        },
        {
            key: '2',
            label: 'Textarea Component',
            children: textareaComp,
        },
        {
            key: '3',
            label: 'Select Component',
            children: selectComp,
        },
        {
            key: '4',
            label: 'Autocomplete Component',
            children: autoComp,
        },
        {
            key: '5',
            label: 'Checkbox Component',
            children: checkComp,
        },
        {
            key: '6',
            label: 'Radio Component',
            children: radioComp,
        },
        {
            key: '7',
            label: 'DatePicker Component',
            children: dateComp,
        },
        {
            key: '8',
            label: 'TimePicker Component',
            children: timeComp,
        },
        {
            key: '9',
            label: 'Upload Component',
            children: uploadComp,
        },
        {
            key: '10',
            label: 'Image Component',
            children: imageComp,
        },
        {
            key: '11',
            label: 'Switch Component',
            children: switchComp,
        },
        {
            key: '12',
            label: 'Button Component',
            children: buttonComp,
        },
    ];

    return (
        <React.Fragment>
            <CommHeader title={'Common Component'} />

            <main>
                <div className="MainNoFoot">
                    <div className="container-fluid">
                        <div className="mt-1">
                            <Form>
                                <Collapse items={items} />
                            </Form>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

SelectwithInput.propTypes = {
    options: PropTypes.any,

};

SelectedHide.propTypes = {
    options: PropTypes.any,

};

SelectAllSelect.propTypes = {
    name: PropTypes.any,
    required: PropTypes.any,
    message: PropTypes.any,
    label: PropTypes.any,
    onChange: PropTypes.any,
    style: PropTypes.any,
    className: PropTypes.any,
    maxTagCount: PropTypes.any,
    placeholder: PropTypes.any,
    placement: PropTypes.any,
    dropdownRender: PropTypes.any,
    maxLength: PropTypes.any,
    maxTagTextLength: PropTypes.any,
    dropdownStyle: PropTypes.any,
    options: PropTypes.any,

};

CascaderComp.propTypes = {
    options: PropTypes.any,
    onChange: PropTypes.func,
    size: PropTypes.any,
    style: PropTypes.any,

};

TreeSelectComp.propTypes = {
    treeData: PropTypes.any,
    loadData: PropTypes.any,
    size: PropTypes.any,
    style: PropTypes.any,
    placeholder: PropTypes.any,
    showSearch: PropTypes.any,
    allowClear: PropTypes.any,
    onChange: PropTypes.any,
    multiple: PropTypes.any,
    dropdownStyle: PropTypes.any,
    value: PropTypes.any,
    treeDefaultExpandAll: PropTypes.any,
};


