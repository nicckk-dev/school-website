import { Button, Form, Modal, Switch } from "antd"
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { calFMV, SearchByEAS } from "../../../api/EasApi";
import { useMutation } from "@tanstack/react-query";
import { messageSerivce } from "../../../api/CommonApi";
import ModalLoader from "../../common/ModalLoader";
import { ButtonComp, DatePickerComp, InputComp, TableComp, TextareaComp } from "../../common/FormComponent";
import { SelectComp } from "../../common/SelectComp";
import { Asterisk } from "../../../constants/AsteriskConstant";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { IntvCss } from "../../common/GlobalStyle";
import { capitalizeWords, confirmMessage } from "../../../utils/common";
import { removeLeadingZero, resetField, validateDecimalInputs, validateText } from "../../../utils/Validation";
import { ArrowRightOutlined } from "@ant-design/icons";
import { handleValidationErrors } from "../../../utils/errorMessage";
import dayjs from "dayjs";


export const AddObligation = (props) => {
    const [form] = Form.useForm();
    const location = useLocation()
    const dispatch = useDispatch();
    const [getInputfield, setGetInputField] = useState({})
    const formData = form.getFieldsValue()
    const [getChangeFlag, setGetChangeFlag] = useState(false);
    const [eASDtlAvl, setEASDtlAvl] = useState(null);
    const [showTypeyear, setShowTypeyear] = useState(false);
    const [isDateChange, setIsDateChange] = useState(false);


    const [calculateFMData, setCalculateFMData] = useState(null)
    const [calculateFMDataShow, setCalculateFMDataShow] = useState(null)
    useEffect(() => {
        if (props?.openModal) {
            form.resetFields();
            setCalculateFMDataShow(null);
            setCalculateFMData(null);
        }
    }, [props?.openModal])

    useEffect(() => {
        debugger
        if (props.editRecord && props?.openModal) {
            if (props.editRecord?.Obligation) {
                props.getDataChoiceVise({ choice: "OBLISERVICE_TYPE", param1: props.editRecord?.Obligation })
            }
            form.setFieldsValue({
                Obligation: getValidNumber(props.editRecord?.Obligation || ""),
                serviceType: getValidNumber(props.editRecord?.serviceType || ""),
                Topic: getValidNumber(props.editRecord?.Topic || ""),
                Noofhours: String(props.editRecord?.Noofhours || ""),
                EventName: props.editRecord?.EventName || "",
                EASID: props.editRecord?.EASID || "",
                EventDate: dayjs(props.editRecord?.EventDate || "", "DD-MM-YYYY"),
                VoucherType: getValidNumber(props.editRecord?.VoucherType || ""),
                Year: getValidNumber(props.editRecord?.Year || ""),
            })
            debugger
            setGetInputField((prev) => ({
                ...prev,
                Obligation: props.editRecord?.Obligation || "",
                serviceType: props.editRecord?.serviceType || "",
                Topic: props.editRecord?.Topic || "",
                Noofhours: String(props.editRecord?.Noofhours || ""),
                EventName: props.editRecord?.EventName || "",
                EASID: props.editRecord?.EASID || "",
                EventDate: props.editRecord?.EventDate || "",
                VoucherType: props.editRecord?.VoucherType || "",
                Year: props.editRecord?.Year || "",
                ObligationattrValue: props.editRecord?.ObligationattrValue || "",
                switchValue: props.editRecord?.switchValue || false,
            }));
            if (props.editRecord?.switchValue) {
                setShowTypeyear(true)
            }
            debugger
            setGetChangeFlag(true)
            setCalculateFMData([props.editRecord])
            setCalculateFMDataShow([props.editRecord]);

        }
    }, [props?.openModal])


    const { mutate: CalculateFMVSave, isLoading: CalculateFMVLoad } = useMutation({
        mutationFn: (data) => calFMV(data, props?.location?.state),
        onSuccess: (response) => {
            let resData = response?.data?.resultSet;
            setGetChangeFlag(true)
            if (resData?.outcode == 3) {
                setCalculateFMDataShow(
                    resData.calculatedFmv.map((item, index) => ({
                        gst: item.gst,
                        cgst: item.cgst,
                        sgst: item.sgst,
                        amount: item.amount,
                        total: item.total,
                        totaL_AMOUNT: item.total,
                        cgsT_PER: item.cgsT_PER,
                        sgsT_PER: item.sgsT_PER,
                        coN_GST: item.coN_GST,
                        coN_CGST: item.coN_CGST,
                        coN_SGST: item.coN_SGST,
                        coN_TOT_AMT: item.coN_AMOUNT,
                        grosS_AMOUNT: item.amount,
                        coN_AMT: item.coN_TOTAL,
                        coN_Total: item.coN_TOTAL,
                        FMVID: item.entryno,
                        coN_EntryNo: item.coN_ENTRYNO,
                        coN_MIN_AMT: item.coN_MIN_AMT,
                        key: index + 1,
                    })));

                setCalculateFMData(resData.calculatedFmv.map((item, index) => ({
                    gst: item.gst,
                    cgst: item.cgst,
                    sgst: item.sgst,
                    amount: item.amount,
                    total: item.total,
                    totaL_AMOUNT: item.total,
                    cgsT_PER: item.cgsT_PER,
                    sgsT_PER: item.sgsT_PER,
                    coN_GST: item.coN_GST,
                    coN_CGST: item.coN_CGST,
                    coN_SGST: item.coN_SGST,
                    coN_TOT_AMT: item.coN_AMOUNT,
                    grosS_AMOUNT: item.amount,
                    coN_AMT: item.coN_TOTAL,
                    coN_Total: item.coN_TOTAL,
                    FMVID: item.entryno,
                    coN_EntryNo: item.coN_ENTRYNO,
                    coN_MIN_AMT: item.coN_MIN_AMT,
                    key: index + 1,
                })));

                dispatch(messageSerivce({ messageType: "success", messageContent: resData?.msg }));
            }
            else {
                setCalculateFMData(null)
                setCalculateFMDataShow(null)
                dispatch(messageSerivce({ messageType: "error", messageContent: resData?.msg }));
            }
        },
    });

    const { mutate: SearchEAS, isLoading: isSearchEAS } = useMutation({
        mutationFn: (data) => SearchByEAS(data),
        onSuccess: (response) => {
            debugger
            let resData = response?.data?.resultSet;
            let easType = "";
            let easYear = "";
            let easDate = "";
            if (resData?.length > 0) {
                if (resData?.DUPLICACY == "1") {
                    confirmMessage({ title: capitalizeWords("Same EAS ID already mapped for this doctor") });
                    return false;
                }
                if (props?.TopicFlag == 1) {
                    if (resData?.TOPIC != formData?.Topic || resData?.OBLIGATION != formData?.Obligation) {
                        confirmMessage({ title: capitalizeWords("Obligation and topic does not match with EAS mapped obligation and topic") });
                        return false;
                    }
                }
                else if (resData?.TOPIC != formData?.Topic || resData?.OBLIGATION != formData?.Obligation) {
                    if (resData?.OBLIGATION != formData?.Obligation) {
                        confirmMessage({ title: capitalizeWords("Obligation does not match with EAS mapped obligation") });
                        return false;
                    }
                }
                setEASDtlAvl(1);
                if (resData[0].EAS_TYPE) {
                    easType = resData[0].EAS_TYPE;
                }
                if (resData[0].EAS_YEAR) {
                    easYear = resData[0].EAS_YEAR
                }
                if (resData[0].EAS_DATE) {
                    easDate = resData[0].EAS_DATE
                }


            }
            else {
                dispatch(messageSerivce({ messageType: "error", messageContent: "No Data Available" }));
                setEASDtlAvl(0);
            }
            form.setFieldsValue({
                EventDate: easDate,
                VoucherType: easType,
                Year: easYear
            });
            setGetInputField((prev) => ({
                ...prev,
                EventDate: easDate,
                VoucherType: easType,
                Year: easYear
            }));
            setShowTypeyear(true)


        },
    });
    const handleCommonChange = (field, value, option) => {

        setGetInputField((prev) => ({
            ...prev,
            [field]: value,
            [field + "label"]: option?.label,
            [field + "attrValue"]: option?.paramsname || "",
        }));
        form.setFieldsValue({
            [field]: value,
            [field + "label"]: option?.label,
        });

        if (field == "Obligation" && value != "") {
            form.setFieldsValue({
                serviceType: '',
                evntName: '',
            })
            setGetInputField((prev) => ({
                ...prev,
                serviceType: '',
                evntName: '',
            }));
            props.getDataChoiceVise({ choice: "OBLISERVICE_TYPE", param1: value })
        }
        if (field == "EASID") {
            form.setFieldsValue({
                EventDate: '',
                VoucherType: '',
                Year: '',
            })
            setGetInputField((prev) => ({
                ...prev,
                EventDate: '',
                VoucherType: '',
                Year: '',
            }));
            setShowTypeyear(false);
        }
        if (field == "EventDate" && props.editRecord) {
            setIsDateChange(true);
        }
        setGetChangeFlag(false)
    }


    const confirmCalculation = () => {
        let ObligSoftAlertData = [];

        if (props?.TopicFlag == '1') {
            ObligSoftAlertData = props?.sepakerRecord?.fmvData?.filter(x => x.OBLIGATION == formData?.Obligation && x.TOPIC == formData?.Topic && parseInt(x.NO_OF_DAYS) < 180);
        }
        else {
            ObligSoftAlertData = props?.sepakerRecord?.fmvData?.filter(x => x.OBLIGATION == formData?.Obligation && parseInt(x.NO_OF_DAYS) < 180);
        }
        if (ObligSoftAlertData?.length > 0) {
            CalculateFMVAlert()
        }
        else {
            calculateFMVData();
        }
    }
    const CalculateFMVAlert = () => {

        confirmMessage({
            title: `Same obligation ${props?.TopicFlag == '1' ? "and topic " : ""}exists in previous 6 months. Are you sure you want to continue?`,
            handleOk: () => calculateFMVData(),
            cancelBtn: true,
        })
    }


    const calculateFMVData = async () => {
        debugger
        try {
            await form.validateFields();
            const getFormData = form.getFieldsValue()
            if (!!getFormData.EASID && !showTypeyear) {
                confirmMessage({
                    title: capitalizeWords("Please Click On Arrow")
                });
                return false
            }
            if (getFormData.Noofhours < 0.5) {
                confirmMessage({
                    title: capitalizeWords("Number Of Hours Should Be Greater Than Or Equal To 0.5")
                });
                return false;
            }
            
            if ( getFormData.EventDate?.isBefore(props.parentFormData?.start_date, 'day') || getFormData.EventDate?.isAfter(props.parentFormData?.end_date, 'day')) {
                confirmMessage({
                    title: capitalizeWords("Event Date Should Be Within The Contract Period!")
                });
                return false;
            }
            let calculateFmv = {};
            calculateFmv.Agreement = props.parentFormData?.ContractType || null;
            calculateFmv.ObligationCode = formData?.Obligation || null;
            calculateFmv.Topic = props?.TopicFlag == '1' ? formData?.Topic || null : null;
            calculateFmv.Spclcode = props.parentFormData?.SpecialityasperFMV || null;
            calculateFmv.Qlfcode = props.parentFormData?.Qualification || null;
            calculateFmv.Experience = props.parentFormData?.Experience || null;
            calculateFmv.Metro = props.parentFormData?.Metro || null;
            calculateFmv.Fellowship = props.parentFormData?.Fellowship || null;
            calculateFmv.Noofhours = formData?.Noofhours || null;
            calculateFmv.Screenflag = props?.location?.state?.ScreenFlag || null;
            calculateFmv.FMVID = props.sepakerRecord?.obligData?.[0]?.ENTRYNO || null;

            CalculateFMVSave(calculateFmv);

        }
        catch (error) {
            handleValidationErrors(error, dispatch, messageSerivce);
        }
    };
    const columns = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 200,
            align: "right",
        },
        {
            title: 'CGST',
            dataIndex: 'cgst',
            key: 'cgst',
            width: 200,
            align: "right",
            render: (_, record) => {
                let roundedValue = record.cgst ? Math.ceil(record.cgst) : 0;
                return roundedValue.toFixed(2);
            },
        },
        {
            title: 'SGST',
            dataIndex: 'sgst',
            key: 'sgst',
            width: 200,
            align: "right",
            render: (_, record) => {
                let roundedValue = record.sgst ? Math.ceil(record.sgst) : 0;
                return roundedValue.toFixed(2);
            },
        },
        {
            title: 'FMV Amount',
            dataIndex: 'total',
            key: 'total',
            width: 250,
            align: "right",
            render: (_, record) => {
                let roundedValue = record.total ? Math.ceil(record.total) : 0;
                return roundedValue;
            },
        },

    ];

    const calculateGST = (amount, CGST_PER, SGST_PER) => {
        const cgst = parseInt(CGST_PER) || 0;
        const sgst = parseInt(SGST_PER) || 0;
        const gst = amount - Math.round((amount * 100) / (cgst + sgst + 100));
        return gst > 0 ? gst : 0;
    };

    const calculateCGST = (gst, CGST_PER, SGST_PER) => {
        const cgst = parseInt(CGST_PER) || 0;
        const sgst = parseInt(SGST_PER) || 0;
        return gst > 0 ? (gst * cgst) / (cgst + sgst) : 0;
    };

    const calculateSGST = (gst, CGST_PER, SGST_PER) => {
        const cgst = parseInt(CGST_PER) || 0;
        const sgst = parseInt(SGST_PER) || 0;
        return gst > 0 ? (gst * sgst) / (cgst + sgst) : 0;
    };

    const handleDecrease = (record) => {
        if (parseFloat(record.coN_TOT_AMT) > parseFloat(record.coN_MIN_AMT)) {
            const updatedTotal = parseFloat(record.coN_TOT_AMT) - 1000;

            const coN_GST = calculateGST(updatedTotal, record.cgsT_PER, record.sgsT_PER);
            const coN_CGST = calculateCGST(coN_GST, record.cgsT_PER, record.sgsT_PER);
            const coN_SGST = calculateSGST(coN_GST, record.cgsT_PER, record.sgsT_PER);
            const gstCal = coN_CGST + coN_SGST;
            const contractAmount = updatedTotal - (coN_CGST + coN_SGST);

            setCalculateFMData((prevData) =>
                prevData.map((item) => {
                    if (item.key == record.key) {
                        return {
                            ...item,
                            coN_TOT_AMT: updatedTotal,
                            coN_GST: coN_GST || 0,
                            coN_CGST: coN_CGST || 0,
                            coN_SGST: coN_SGST || 0,
                            gst: gstCal || 0,
                            coN_TOTAL: contractAmount > 0 ? contractAmount : 0,
                            coN_AMT: contractAmount,
                        };
                    }
                    return item;
                })
            );
        }
    };

    const handleIncrease = (record) => {
        if (parseFloat(record.coN_TOT_AMT) < parseFloat(record.totaL_AMOUNT)) {
            const updatedTotal = parseFloat(record.coN_TOT_AMT) + 1000;
            const coN_GST = calculateGST(updatedTotal, record.cgsT_PER, record.sgsT_PER);
            const coN_CGST = calculateCGST(coN_GST, record.cgsT_PER, record.sgsT_PER);
            const coN_SGST = calculateSGST(coN_GST, record.cgsT_PER, record.sgsT_PER);
            const gstCal = coN_CGST + coN_SGST;
            const contractAmount = updatedTotal - (coN_CGST + coN_SGST);

            setCalculateFMData((prevData) =>
                prevData.map((item) => {
                    if (item.key == record.key) {
                        return {
                            ...item,
                            coN_TOT_AMT: updatedTotal,
                            coN_GST,
                            coN_CGST,
                            coN_SGST,
                            gst: gstCal || 0,
                            coN_TOTAL: contractAmount,
                            coN_AMT: contractAmount,
                        };
                    }
                    return item;
                })
            );
        }
    };


    const columnsOne = [
        {
            title: 'Contract Total Amount	',
            dataIndex: 'coN_AMOUNT',
            key: 'coN_AMOUNT',
            align: "right",
            render: (_, record) => (
                <>
                    <div className="d-flex align-items-center">
                        <Button
                            onClick={() => handleDecrease(record)}
                            disabled={parseFloat(record.coN_TOT_AMT) <= parseFloat(record.coN_MIN_AMT)}
                            className="btncal"
                        >
                            -
                        </Button>
                        <div className="w-60px text-center">{record.coN_TOT_AMT}</div>
                        <Button
                            onClick={() => handleIncrease(record)}
                            disabled={parseFloat(record.coN_TOT_AMT) >= parseFloat(record.totaL_AMOUNT)}
                            className="btncal"
                        >
                            +
                        </Button>
                    </div>
                </>
            ),
        },
        {
            title: 'CGST',
            dataIndex: 'coN_CGST',
            key: 'coN_CGST',
            width: 200,
            align: "right",
            render: (_, record) => {
                const value = record.coN_CGST ? parseFloat(record.coN_CGST).toFixed(2) : 0.00;
                return value;
            },
        },
        {
            title: 'SGST',
            dataIndex: 'coN_SGST',
            key: 'coN_SGST',
            width: 200,
            align: "right",
            render: (_, record) => {
                const value = record.coN_SGST ? parseFloat(record.coN_SGST).toFixed(2) : 0.00;
                return value;
            },
        },
        {
            title: 'Contract Amount',
            dataIndex: 'coN_AMT',
            key: 'coN_AMT',
            width: 250,
            align: "right",
            render: (_, record) => {
                let roundedValue = record.coN_AMT ? Math.ceil(record.coN_AMT) : 0;
                return roundedValue;
            },

        },

    ];

    const SaveData = async () => {
        if (getChangeFlag) {

            try {
                await form.validateFields();
                // const mergedAgreements = getCalculateFMData.map(item => ({
                //     ...item,
                //     ...getInputfield,
                //     TOPIC_TEXT: formData?.TOPIC_TEXT || "",
                //     EventName: formData?.EventName || "",
                //     EASID: formData?.EASID || "",
                //     EventDate: formData?.EventDate || "",
                //     VoucherType: formData?.VoucherType || "",
                //     Year: formData?.Year || "",
                //     FMVFLAG: item.entryno ? "U" : "I",
                //     IsChanged: "1",
                //     IsDateChanged: "1",
                // }));


                // const flattenedMergedAgreements = Object.assign({}, ...mergedAgreements);


                // const finalData = { ...flattenedMergedAgreements };

                const mergedAgreements = calculateFMData.map(item => ({
                    ...item,
                    ...getInputfield,
                    TOPIC_TEXT: formData?.TOPIC_TEXT || "",
                    EventName: formData?.EventName || "",
                    EASID: formData?.EASID || "",
                    EventDate: formData?.EventDate || "",
                    VoucherType: formData?.VoucherType || "",
                    Year: formData?.Year || "",
                    FMVFLAG: item.entryno ? "U" : "I",
                    IsChanged: "1",
                    IsDateChanged: isDateChange ? "0" : "1",
                    ...(!!props?.editRecord?.ROWINDEX && { ROWINDEX: props?.editRecord?.ROWINDEX }),
                }));

                const finalData = mergedAgreements.reduce((acc, curr) => ({ ...acc, ...curr }), {});

                cancelModalData();
                props.saveFVMData(finalData);

                // form.resetFields();
                // setCalculateFMDataShow(null);
                // setCalculateFMData(null);

            }
            catch (error) {
                handleValidationErrors(error, dispatch, messageSerivce);
            }
        }
        else {
            confirmMessage({ title: capitalizeWords("Please calculate to save") });
        }

    }
    // useEffect(() => {
    //     if (props?.location?.state) {
    //         form.setFieldsValue({
    //             Obligation: (props?.location?.state?.obligation) !== null ? (props?.location?.state?.obligation) : null,
    //             Topic: (props?.location?.state?.topic) !== null ? (props?.location?.state?.topic) : null
    //         })
    //     }
    // }, [props])

    // useEffect(() => {
    //     if (getObligationEditData !== null) {
    //         form.setFieldsValue({
    //             EmailId: getObligationEditData?.email || getPropsData?.msL_EMAIL,
    //             Spclcode: getValidNumber(getObligationEditData?.speciality),
    //             Qlfcode: getValidNumber(getObligationEditData?.qualification),
    //             Noofhours: getObligationEditData?.nO_OF_HOURS !== undefined ? `${getObligationEditData?.nO_OF_HOURS}` : '',
    //             Experience: getValidNumber(getObligationEditData?.experience),
    //             Metro: getValidNumber(getObligationEditData?.metro),
    //             Fellowship: getValidNumber(getObligationEditData?.fellowship),
    //         })
    //         const mergedAgreements = {
    //             ...getObligationEditData,  // Spread properties from getObligationEditData
    //         };
    //         // Set the normalized data to the state (as an array if needed)
    //         setCalculateFMData([mergedAgreements])
    //         setCalculateFMDataShow([mergedAgreements]);

    //     }
    // }, [getObligationEditData])

    const cancelModalData = () => {
        form.resetFields();
        setCalculateFMData("")
        setCalculateFMDataShow("");
        setShowTypeyear(false);
        setGetInputField((prev) => ({
            ...prev,
            switchValue: false,
            ObligationattrValue: "",
        }));
        props.cancelModal()
        setGetChangeFlag(false)
    }
    const getValidNumber = (value) => {
        const parsedValue = parseInt(value, 10);
        return isNaN(parsedValue) ? "" : parsedValue;
    }
    const handleSwitch = (e) => {
        if (!e) {
            setShowTypeyear(false)
        }
        setGetInputField((prev) => ({
            ...prev,
            switchValue: e,
            ...(e ? {
                EASID: "",
                EventDate: "",
                VoucherType: "",
                Year: "",
            } : {}),
        }));
        form.setFieldsValue({
            EASID: "",
            EventDate: "",
            VoucherType: "",
            Year: "",
        });

    }
    const handleSearchEAS = () => {
        if (!formData?.EASID) {
            return confirmMessage({ title: capitalizeWords("Please enter EAS ID") });
        }
        else {
            let objData = {
                EASID: formData?.EASID,
                PCODE: location?.state?.Pcode,
                CONTRACTID: location?.state?.EntryNo
            }
            SearchEAS(objData)
        }


    }

    return (
        <Modal open={props?.openModal} onCancel={cancelModalData}
            className='paddingZeromodal colorHeadermodal fullmodal' centered
            width="100%" title="Add Obligation"
            footer={
                !(props?.location?.state?.EditFlag == "1" || props?.location?.state?.viewmode == "1") && (
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-2 col-6">
                            <Button
                                key="close"
                                className="w-100"
                                onClick={SaveData}
                            >
                                SAVE
                            </Button>
                        </div>
                    </div>
                )
            }
        >
            {(CalculateFMVLoad || isSearchEAS) && (<ModalLoader />)}

            <Form form={form}>

                <div className="modalsegment overflow-auto">
                    <div className='container-fluid mt-2 pb-5'>

                        <div className="row justify-content-center ">
                            <div className="col-lg-8 col-md-8">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-lg-6 col-md-6 mt-2">
                                        <div className={`FormStyle FormStyleError ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                            <label htmlFor="textarea" className="FormLabel">Obligation <Asterisk /></label>
                                            <SelectComp
                                                props={{
                                                    mode: 'single',
                                                    size: 'medium',
                                                    name: 'Obligation',
                                                    required: !(props.editRecord?.clickMode && props.editRecord?.clickMode == "V"),
                                                    disabled: props.editRecord?.clickMode == "V",
                                                    options: [
                                                        { value: '', label: 'Select' },
                                                        ...(props?.sepakerRecord?.obligationMaster?.map(obj => ({
                                                            value: getValidNumber(obj.PARAMCODE),
                                                            label: obj.PARAMNAME,
                                                            paramsname: obj.PARAMSNAME,
                                                        })) || []),
                                                    ],
                                                    value: getInputfield?.Obligation || "",
                                                    defaultValue: '',
                                                    onChange: (value, option) => {
                                                        handleCommonChange('Obligation', value, option);
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mt-2">
                                        <div className={`FormStyle FormStyleError ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                            <label htmlFor="textarea" className="FormLabel">Service Type <Asterisk /></label>
                                            <SelectComp
                                                props={{
                                                    mode: 'single',
                                                    size: 'medium',
                                                    name: 'serviceType',
                                                    required: !(props.editRecord?.clickMode && props.editRecord?.clickMode == "V"),
                                                    disabled: props.editRecord?.clickMode == "V",
                                                    options: [
                                                        { value: '', label: 'Select' },
                                                        ...(props?.getChoiceData?.["OBLISERVICE_TYPE"]?.map(obj => ({
                                                            value: getValidNumber(obj.PARAMCODE),
                                                            label: obj.PARAMNAME,
                                                        })) || []),
                                                    ],
                                                    value: getInputfield?.serviceType || "",
                                                    defaultValue: '',
                                                    onChange: (value, option) => {
                                                        handleCommonChange('serviceType', value, option);
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {
                                        props?.TopicFlag != 1 && (
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div className={`FormStyle FormStyleError ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                                    <label htmlFor="textarea" className="FormLabel">Topic <Asterisk /></label>
                                                    <TextareaComp
                                                        props={{
                                                            name: 'TOPIC_TEXT',
                                                            required: !(props.editRecord?.clickMode && props.editRecord?.clickMode == "V"),
                                                            disabled: props.editRecord?.clickMode == "V",
                                                            maxLength: 500,
                                                            disabled: true,
                                                            size: 'medium',
                                                            value: getInputfield.TOPIC_TEXT,
                                                            onChange: (e) => {
                                                                handleCommonChange('TOPIC_TEXT', e.target.value);
                                                            },

                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        props?.TopicFlag == 1 && (
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div className={`FormStyle FormStyleError ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                                    <label htmlFor="textarea" className="FormLabel">Topic <Asterisk /></label>
                                                    <SelectComp
                                                        props={{
                                                            mode: 'single',
                                                            size: 'medium',
                                                            name: 'Topic',
                                                            required: !(props.editRecord?.clickMode && props.editRecord?.clickMode == "V"),
                                                            disabled: props.editRecord?.clickMode == "V",
                                                            options: [
                                                                { value: '', label: 'Select' },
                                                                ...(props?.sepakerRecord?.topicMaster?.map(obj => ({
                                                                    value: getValidNumber(obj.PARAMCODE),
                                                                    label: obj.PARAMNAME,
                                                                    paramsname: obj.PARAMSNAME,
                                                                })) || []),
                                                            ],
                                                            value: getInputfield?.Topic || "",
                                                            defaultValue: '',
                                                            onChange: (value, option) => {
                                                                handleCommonChange('Topic', value, option);
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }


                                    {
                                        getInputfield?.["ObligationattrValue"] == 'THIRDPARTY' && (
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div className={`FormStyle FormStyleError ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                                    <label className="FormLabel" >Event Name <Asterisk /></label>
                                                    <TextareaComp
                                                        props={{
                                                            name: 'EventName',
                                                            required: getInputfield?.["ObligationattrValue"] == 'THIRDPARTY' && props.editRecord?.clickMode != "V",
                                                            disabled: props.editRecord?.clickMode == "V",
                                                            maxLength: 500,
                                                            size: 'medium',
                                                            value: getInputfield?.EventName || "",
                                                            onChange: (e) => {
                                                                let filteredValue = validateText(e.target.value, "[^a-zA-Z ]");
                                                                handleCommonChange('EventName', filteredValue);
                                                            },

                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                    <div className="col-lg-6 col-md-6 mt-2">
                                        <div className={`FormStyle FormStyleError ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                            <label className="FormLabel" >Number of Hours <Asterisk /></label>
                                            <InputComp props={{
                                                type: 'text',
                                                size: 'medium',
                                                name: 'Noofhours',
                                                required: !(props.editRecord?.clickMode && props.editRecord?.clickMode == "V"),
                                                disabled: props.editRecord?.clickMode == "V",
                                                pattern: "^(?:0\\.\\d{1,2}|[1-9]\\d?(?:\\.\\d{1,2})?)$",
                                                value: getInputfield?.Noofhours || "",
                                                onChange: (e) => {
                                                    removeLeadingZero(e, form, "Noofhours")
                                                    handleCommonChange('Noofhours', e.target.value);
                                                },
                                                onBlur: (e) => { resetField(e, form, "Noofhours") },
                                                onkeyup: (e) => { validateDecimalInputs(e, 2, 2, form, "Noofhours") },
                                            }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mt-2"></div>
                                </div>


                                <div className="row">
                                    <div className="col-lg-6 col-md-6 mt-3">
                                        <div className={`FormStyle d-flex justify-content-between ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                            <label htmlFor="textarea" className="FormLabel">EAS Linked <Asterisk /></label>
                                            <Switch className="text-color" checkedChildren="Yes" unCheckedChildren="NO" checked={getInputfield?.switchValue || false} value={getInputfield?.switchValue || false} defaultChecked={false} onClick={handleSwitch} />
                                        </div>
                                    </div>
                                </div>



                                {
                                    getInputfield?.switchValue && (
                                        <>
                                            <div className="row align-items-center d-flex">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className={`FormStyle FormStyleError ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                                        <label htmlFor="textarea" className="FormLabel">EAS ID <Asterisk /></label>
                                                        <InputComp props={{
                                                            type: 'text',
                                                            name: 'EASID',
                                                            required: getInputfield?.switchValue && !(props.editRecord?.clickMode && props.editRecord?.clickMode == "V"),
                                                            pattern: "^[0-9]+$",
                                                            disabled: props.editRecord?.clickMode == "V",
                                                            maxLength: 100,
                                                            size: 'middle',
                                                            value: getInputfield?.EASID || "",
                                                            onChange: (e) => {
                                                                let filteredValue = validateText(e.target.value, "[^0-9]");
                                                                handleCommonChange('EASID', filteredValue);
                                                            },
                                                        }}
                                                        />


                                                    </div>
                                                </div>
                                                {
                                                    props.editRecord?.clickMode != "V" && (
                                                        <div className="col-md-1 mt-4">
                                                            <button className="searchgo text-white mt-1" onClick={handleSearchEAS}>
                                                                <ArrowRightOutlined />
                                                            </button>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                            {
                                                showTypeyear && (

                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 mt-2">
                                                            <div className={`FormStyle FormStyleError ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                                                <label htmlFor="textarea" className="FormLabel">Event Date <Asterisk /></label>
                                                                <DatePickerComp
                                                                    key={'EventDate'}
                                                                    props={{
                                                                        name: 'EventDate',
                                                                        required: showTypeyear && !(props.editRecord?.clickMode && props.editRecord?.clickMode == "V"),
                                                                        disabled: props.editRecord?.clickMode == "V",
                                                                        format: 'DD-MM-YYYY',
                                                                        picker: 'date',
                                                                        value: getInputfield?.EventDate,
                                                                        onChange: (value) => {
                                                                            handleCommonChange('EventDate', value);
                                                                        },
                                                                        className: 'w-100',
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-md-6 mt-2">
                                                            <div className={`FormStyle FormStyleError ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                                                <label htmlFor="textarea" className="FormLabel">Voucher Type <Asterisk /></label>
                                                                <SelectComp
                                                                    props={{
                                                                        mode: 'single',
                                                                        size: 'medium',
                                                                        required: showTypeyear && !(props.editRecord?.clickMode && props.editRecord?.clickMode == "V"),
                                                                        disabled: props.editRecord?.clickMode == "V",
                                                                        name: 'VoucherType',
                                                                        options: [
                                                                            { value: '', label: 'Select' },
                                                                            ...(props?.sepakerRecord?.voucherTypeMaster?.map(obj => ({
                                                                                value: getValidNumber(obj.PARAMCODE),
                                                                                label: obj.PARAMNAME,
                                                                            })) || []),
                                                                        ],
                                                                        value: getInputfield?.VoucherType || "",
                                                                        defaultValue: '',
                                                                        onChange: (value, option) => {
                                                                            handleCommonChange('VoucherType', value, option);
                                                                        },
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 mt-2">
                                                            <div className={`FormStyle FormStyleError ${props.editRecord?.clickMode == "V" ? 'disableLable' : ''}`}>
                                                                <label htmlFor="textarea" className="FormLabel">Year <Asterisk /></label>
                                                                <SelectComp
                                                                    props={{
                                                                        mode: 'single',
                                                                        size: 'medium',
                                                                        required: showTypeyear,
                                                                        required: showTypeyear && !(props.editRecord?.clickMode && props.editRecord?.clickMode == "V"),
                                                                        disabled: props.editRecord?.clickMode == "V",
                                                                        name: 'Year',
                                                                        options: [
                                                                            { value: '', label: 'Select' },
                                                                            ...(props?.sepakerRecord?.easYearMaster?.map(obj => ({
                                                                                value: getValidNumber(obj.PARAMCODE),
                                                                                label: obj.PARAMNAME,
                                                                            })) || []),
                                                                        ],
                                                                        value: getInputfield?.Year || "",
                                                                        defaultValue: '',
                                                                        onChange: (value, option) => {
                                                                            handleCommonChange('Year', value, option);
                                                                        },
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </>
                                    )
                                }

                            </div>
                        </div>
                        {
                            props.editRecord?.clickMode != "V" && (
                                <div className="row justify-content-center ">
                                    <div className="col-md-10">
                                        <div className="row justify-content-center mt-3">

                                            <div className="col-md-2 col-6">
                                                <ButtonComp
                                                    props={{
                                                        type: "primary",
                                                        block: true,
                                                        size: 'medium',
                                                        className: 'footbtn text-uppercase w-100 ',
                                                        label: 'Cancel',
                                                        onClick: cancelModalData
                                                    }}
                                                    formItem={true}
                                                />
                                            </div>
                                            <div className="col-md-2 col-6">
                                                <ButtonComp
                                                    props={{
                                                        type: "primary",
                                                        block: true,
                                                        size: 'medium',
                                                        className: 'footbtn text-uppercase w-100 ',
                                                        label: 'Calculate',
                                                        onClick: confirmCalculation
                                                    }}
                                                    formItem={true}
                                                />
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            )
                        }

                        {
                            props.editRecord?.clickMode != "V" && (
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-md-8 mt-4">
                                        {
                                            (calculateFMDataShow !== null) ? (
                                                <div className="Report-table table-responsive">
                                                    <div className={`${IntvCss['intvTable']}`}>
                                                        <TableComp props={{
                                                            columns: columns,
                                                            dataSource: calculateFMDataShow,
                                                            pagination: false,
                                                            bordered: true,
                                                            className: `common_table `,
                                                            size: 'small',
                                                        }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                                :
                                                ""
                                        }

                                        {
                                            (calculateFMData !== null || calculateFMData?.length > 0) ? (
                                                <div className="Report-table table-responsive mt-4">
                                                    <div className={`${IntvCss['intvTable']}`}>
                                                        <TableComp props={{
                                                            columns: columnsOne,
                                                            dataSource: calculateFMData,
                                                            pagination: false,
                                                            size: 'small',
                                                            bordered: true,
                                                            className: `common_table `,
                                                        }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                                :
                                                ""
                                        }
                                    </div>
                                </div>
                            )
                        }



                    </div>
                </div>

            </Form>

        </Modal>
    )
}


AddObligation.propTypes = {
    sepakerRecord: PropTypes.object,
    openModal: PropTypes.object,
    cancelModal: PropTypes.func,
    saveFVMData: PropTypes.func,
    location: PropTypes.object,

    editRecord: PropTypes.any,
    getDataChoiceVise: PropTypes.func,
    parentFormData: PropTypes.any,
    getChoiceData: PropTypes.any,
    TopicFlag: PropTypes.any,

};