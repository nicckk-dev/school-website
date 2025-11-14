import { Button, Form } from "antd"
import { AutoCompleteComp, CheckboxComp, DatePickerComp, InputComp, RadioComp, TextareaComp, TimePickerComp, UploadComp } from "./FormComponent"
import { SelectComp } from "./SelectComp";
import { CaretDownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import '../../assets/css/style.scss';
import CommHeader from "./CommHeader";

export const CommonForm = () => {

    const handleChange = (e) => {
        console.log(e);
    }

    const handleFinish = (values) => {
        console.log(values)
    }

    const onFinishFailed = (e) => {
        console.log(e);
    }

    const selectProps = {
        options: [{ value: 'jack', label: 'Jack', }, { value: 'kane', label: 'Kane', }, { value: 'lucy', label: 'Lucy', }],
        mode: 'single',    // mode: {single,multiple,tags}
        onChange: handleChange,
        seperator: [','],
        required: true,
        message: 'Select',
        name: 'Select',
        size: 'large',
        suffixIcon: <CaretDownOutlined style={{ pointerEvents: "none" }} />
    }

    const checkprops = {
        name: 'Checkbox',
        onChange: handleChange,
        options: [
            {
                label: 'Apple',
                value: 'Apple',
            },
            {
                label: 'Pear',
                value: 'Pear',
            },
            {
                label: 'Orange',
                value: 'Orange',
            }],
        required: true, message: 'Check'
    }

    return (
        <>
            <CommHeader title="Common Form" />
            {/* <div className="container" style={{ maxWidth: '1000px' }}> */}
            <Form name="basic" initialValues={{
                ['Select']: 'jack'
            }}
                onFinish={handleFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ width: '100%', display: 'flex', justifyContent: "center", marginTop: '20px' }}
            >

                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="FormStyle my-2">

                                <InputComp props={{
                                    type: 'text', onChange: handleChange,
                                    placeholder: 'Input',
                                    name: 'input',
                                    required: true, message: "Enter Input",
                                    minLength: 5,
                                    size: 'large',
                                    maxLength: 10,
                                }}
                                />
                                <label htmlFor="input" className="FormLabel">Input</label>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="FormStyle my-2">
                                <label htmlFor="number" className="FormLabel">Input Number</label>
                                <InputComp props={{
                                    onChange: handleChange, type: "number",
                                    placeholder: 'Input Number', size: 'large',
                                    name: 'number', required: true, message: "Enter Input Number", minLength: 4, maxLength: 10,
                                    }} 
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="FormStyle my-2">
                                <label htmlFor="textarea" className="FormLabel">Select</label>
                                <SelectComp props={selectProps} />
                            </div>
                        </div>
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
                        <div className="col-lg-6 col-md-12">
                            <div className="FormStyle my-2">
                                <CheckboxComp props={checkprops} group={true} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="FormStyle my-2">
                                <RadioComp props={{ name: 'Radio', onChange: handleChange, options: ['Jack', 'Lucy', 'Kane'], required: true, message: 'Select', }} group={true} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="FormStyle my-2">
                                <label htmlFor="date" className="FormLabel">DatePicker</label>
                                <DatePickerComp props={{ name: 'Date', required: true, 
                                    message: 'Date', value: dayjs('2022-12-01', 'YYYY-MM-DD'), 
                                    className: 'w-100', size: 'large' }} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="FormStyle my-2">
                                <label htmlFor="time" className="FormLabel">TimePicker</label>
                                <TimePickerComp props={{
                                    name: 'Time', use12Hours: true,
                                    required: true, message: 'Time', onChange: handleChange,
                                    value: dayjs('12:11:08', 'HH:mm:ss'), size: 'large',
                                    className: 'w-100'
                                }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="FormStyle my-2">
                                <UploadComp props={{
                                    name: 'Upload', required: true, message: 'Upload',
                                    onChange: handleChange, maxCount: 3, multiple: true, showPreviewIcon: false, showDownloadIcon: true,
                                    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', accept: 'application/pdf'
                                }}
                                    updatedList={true} fileType={['application/pdf', 'image/jpeg']}
                                />
                            </div>
                        </div>

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

                        <div className="col-12">
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </div>
                    </div>
                </div>
            </Form>
            {/* </div> */}
        </>
    )
}