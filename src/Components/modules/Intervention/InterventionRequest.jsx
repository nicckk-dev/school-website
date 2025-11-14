import React from "react";
import CommHeader from "../../common/CommHeader";
import { Form } from "antd";
import { CaretDownOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { DatePickerComp, InputComp, TimePickerComp } from "../../common/FormComponent";
import { SelectComp } from "../../common/SelectComp";
import dayjs from "dayjs";
import { IntvFooter } from "../../common/IntvFooter";
import { useLocation, useNavigate } from "react-router-dom";


export const InterventionRequest = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search)

    const footerBtnProps = [
        {
            title: 'CANCEL',
            handleClick: () => navigate('/Intv')
        },
        // {
        //     title: 'SUBMIT',
        //     // handleClick: (e) => console.log(e)
        // }
    ]

    return (
        <>
            <CommHeader title="Intervention Request" />
            <main>
                <div className="EasFoot">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <Form className="w-100 d-flex justify-content-between"
                                    autoComplete="off"
                                    // onFinish={handleFinish} onFinishFailed={handleFinishFailed}
                                    initialValues={{
                                        ['requestFor']: 'self',
                                        ['subordinate']: 'select',
                                        ['int_type']: 'select',
                                        ['year']: '2023',
                                        ['int_name']: 'select',
                                        ['state']: 'select',
                                        ['town']: 'select',
                                        ['days']: 'select',
                                        ['day_type']: 'select'
                                    }}
                                >

                                    <div className="container-fluid border g-0 my-2 p-2 px-3">
                                        <div className="row">
                                            <div className="col-12 d-flex justify-content-end py-1"><InfoCircleOutlined /></div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="textarea" className="FormLabel">Select Request For</label>
                                                    <SelectComp props={{
                                                        options: [{ value: 'select', label: 'Select Request For', }, { value: 'self', label: 'Self', }],
                                                        mode: 'single',
                                                        size: 'large',
                                                        name: 'requestFor',
                                                        required: true,
                                                        suffixIcon: <CaretDownOutlined style={{ pointerEvents: "none" }} />
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="textarea" className="FormLabel">Select Subordinate</label>
                                                    <SelectComp props={{
                                                        options: [{ value: 'select', label: 'Select Subordinate', }, { value: 'self', label: 'Self', }],
                                                        mode: 'single',
                                                        size: 'large',
                                                        name: 'subordinate',
                                                        required: true,
                                                        suffixIcon: <CaretDownOutlined style={{ pointerEvents: "none" }} />
                                                    }}
                                                        conditionalProps={{ disabled: true }}

                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="textarea" className="FormLabel">Select Intervention Type</label>
                                                    <SelectComp props={{
                                                        options: [{ value: 'select', label: 'Select Intervention Type', },
                                                        { value: 'CME-PRP', label: 'CME-PRP', },
                                                        { value: 'CRM-RPS', label: 'CRM-RPS', },
                                                        { value: 'WEBINAR', label: 'WEBINAR', },
                                                        { value: 'DOCTORS ZOOM MEETING', label: 'DOCTORS ZOOM MEETING', },
                                                        { value: 'WEBCAST', label: 'WEBCAST', },

                                                        ],

                                                        mode: 'single',
                                                        size: 'large',
                                                        name: 'int_type',
                                                        required: true,
                                                        suffixIcon: <CaretDownOutlined style={{ pointerEvents: "none" }} />
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="textarea" className="FormLabel">Select Year</label>
                                                    <SelectComp props={{
                                                        options: [
                                                            { value: '2022', label: '2022', },
                                                            { value: '2023', label: '2023', },
                                                            { value: '2024', label: '2024', },
                                                        ],
                                                        mode: 'single',
                                                        size: 'large',
                                                        name: 'year',
                                                        required: true,
                                                        suffixIcon: <CaretDownOutlined style={{ pointerEvents: "none" }} />
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="textarea" className="FormLabel">Select Intervention Name</label>
                                                    <SelectComp props={{
                                                        options: [{ value: 'select', label: 'Select Intervention Name', },
                                                        { value: 'CME-PRP 06Tst-2023', label: 'CME-PRP 06Tst-2023', },
                                                        { value: 'CME-PRP Amt01-2023', label: 'CME-PRP Amt01-2023', },
                                                        ],
                                                        mode: 'single',
                                                        size: 'large',
                                                        name: 'int_name',
                                                        required: true,
                                                        suffixIcon: <CaretDownOutlined style={{ pointerEvents: "none" }} />
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <InputComp props={{
                                                        type: 'text',
                                                        placeholder: 'Topic/Remarks',
                                                        name: 'topic',
                                                        minLength: 5,
                                                        size: 'large',
                                                    }}
                                                    />
                                                    <label htmlFor="input" className="FormLabel">Topic/Remarks</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="textarea" className="FormLabel">State</label>
                                                    <SelectComp props={{
                                                        options: [{ value: 'select', label: 'State', },
                                                        { value: 'Almaty', label: 'Almaty', },
                                                        ],
                                                        mode: 'single',
                                                        size: 'large',
                                                        name: 'state',
                                                        required: true,
                                                        suffixIcon: <CaretDownOutlined style={{ pointerEvents: "none" }} />
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <InputComp props={{
                                                        type: 'text',
                                                        placeholder: 'City',
                                                        name: 'city',
                                                        minLength: 5,
                                                        size: 'large',
                                                        value: 'Shymkent'
                                                    }}
                                                    />
                                                    <label htmlFor="input" className="FormLabel">City</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="textarea" className="FormLabel">Town</label>
                                                    <SelectComp props={{
                                                        options: [{ value: 'select', label: 'Town', },
                                                        { value: 'Dilwania', label: 'Dilwania', },
                                                        { value: 'Hilla', label: 'Hilla', },
                                                        { value: 'Test Town 1', label: 'Test Town 1', },
                                                        ],
                                                        mode: 'single',
                                                        size: 'large',
                                                        name: 'town',
                                                        required: true,
                                                        suffixIcon: <CaretDownOutlined style={{ pointerEvents: "none" }} />
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="textarea" className="FormLabel">Days</label>
                                                    <SelectComp props={{
                                                        options: [{ value: 'select', label: 'Select Days', },
                                                        { value: 'Single', label: 'Single', },
                                                        ],
                                                        mode: 'single',
                                                        size: 'large',
                                                        name: 'days',
                                                        required: true,
                                                        suffixIcon: <CaretDownOutlined style={{ pointerEvents: "none" }} />
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <InputComp props={{
                                                        type: 'text',
                                                        // placeholder: 'City',
                                                        name: 'city',
                                                        minLength: 5,
                                                        size: 'large',
                                                        // value: 'Shymkent'
                                                    }}
                                                    />
                                                    <label htmlFor="input" className="FormLabel">Venue</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12"></div>

                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="textarea" className="FormLabel">Day Type</label>
                                                    <SelectComp props={{
                                                        options: [{ value: 'select', label: 'Select Day Type', },
                                                        { value: 'Half Time', label: 'Half Time', },
                                                        { value: 'Full Time', label: 'Full Time', },
                                                        ],
                                                        mode: 'single',
                                                        size: 'large',
                                                        name: 'day_type',
                                                        required: true,
                                                        suffixIcon: <CaretDownOutlined style={{ pointerEvents: "none" }} />
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="date" className="FormLabel fw-bold">* From Date</label>
                                                    <DatePickerComp props={{
                                                        name: 'Date', required: true,
                                                        message: 'Date', value: dayjs('2022-12-01', 'YYYY-MM-DD'),
                                                        className: 'w-100', size: 'large'
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="time" className="FormLabel">User Start Time</label>
                                                    <TimePickerComp props={{
                                                        name: 'Time',
                                                        required: true, message: 'Time',
                                                        value: dayjs('12:11:08', 'HH:mm:ss'), size: 'large',
                                                        className: 'w-100'
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="FormStyle my-2">
                                                    <label htmlFor="time" className="FormLabel">User End Time</label>
                                                    <TimePickerComp props={{
                                                        name: 'Time',
                                                        required: true, message: 'Time',
                                                        value: dayjs('12:11:08', 'HH:mm:ss'), size: 'large',
                                                        className: 'w-100'
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <IntvFooter footerBtnProps={footerBtnProps} />
        </>
    )
}