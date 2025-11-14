import { Button, Form, Modal } from "antd"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { calculateFMV, GetAgreement, showObligationData } from "../../../api/EasApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { messageSerivce } from "../../../api/CommonApi";
import ModalLoader from "../../common/ModalLoader";
import { ButtonComp, InputComp, TableComp } from "../../common/FormComponent";
import { SelectComp } from "../../common/SelectComp";
import { Asterisk } from "../../../constants/AsteriskConstant";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';  // Import PropTypes after installation
import { IntvCss } from "../../common/GlobalStyle";
import { capitalizeWords, confirmMessage } from "../../../utils/common";
import FormSkeletonModal from "../../skeletons/FormSkeletonModal";


export const FMVModal = (props) => {
    const [form] = Form.useForm();
    const [getSpeciality, setGetSpeciality] = useState(null)
    const location = useLocation()
    const dispatch = useDispatch(); // Call useDispatch at the top level
    const [getQualification, setGetQualification] = useState(null)
    const [getExperience, setGetExperience] = useState(null)
    const [getMetro, setGetMetro] = useState(null)
    const [getFellowship, setGetFellowship] = useState(null)
    const [getObligationData, setGetObligationData] = useState(null)
    const [getTopicData, setGetTopicData] = useState(null)
    const [getInputfield, setGetInputfield] = useState(null)
    // const location = useLocation()
    const [getPropsData, setGetPropsData] = useState(null)
    const [getAgreementData, setGetAgreementData] = useState(null)
    const [getObligationEditData, setGetObligationEditData] = useState(null)
    const formData = form.getFieldsValue()
    const [getChangeFlag, setGetChangeFlag] = useState(false);
    // for calculate FMV
    const [getCalculateFMData, setGetCalculateFMData] = useState(null)
    const [getCalculateFMDataShow, setGetCalculateFMDataShow] = useState(null)
    const { confirm } = Modal
    console.log('locatipn', location, getPropsData, getCalculateFMDataShow)
    useEffect(() => {
        if (props?.openFMV === true) {
            form.resetFields();
            setGetCalculateFMDataShow(null);
            setGetCalculateFMData(null);
        }
    }, [props?.openFMV])
    useEffect(() => {
        debugger
        if (props.sepakerRecord !== null) {
            setGetPropsData({ ...props.sepakerRecord, screenFlag: "1" })
            debugger
            if (props.sepakerRecord?.newFlag === 'NewAdded') {
                form.setFieldsValue({
                    EmailId: props.sepakerRecord?.email,
                    Spclcode: props.sepakerRecord?.speciality,
                    Qlfcode: props.sepakerRecord?.qualification,
                    Noofhours: props.sepakerRecord?.nO_OF_HOURS,
                    Experience: props.sepakerRecord?.experience,
                    Metro: props.sepakerRecord?.metro,
                    Fellowship: props.sepakerRecord?.fellowship,
                })
                const mergedAgreements = {
                    ...props.sepakerRecord,  // Spread properties from getPropsData
                };
                // Set the normalized data to the state (as an array if needed)
                setGetCalculateFMData([mergedAgreements])
                setGetCalculateFMDataShow([mergedAgreements]);
            }
        }
    }, [props])
    useEffect(() => {
        debugger
        if (props.openFMV === true && getPropsData !== null) {
            debugger
            if (props.sepakerRecord?.newFlag !== "NewAdded") {
                showObligationDataMutation();
            }
        }
    }, [props, getPropsData])
    const [getFMVData, setGetFMVData] = useState(null)
    const { mutate: showObligationDataMutation, isLoading: showObligationLoad } = useMutation(
        (data) => showObligationData(getPropsData, location?.state), // The mutation function
        {

            onSuccess: (response) => {
                const dropData = response.data?.resultSet;
                setGetSpeciality(dropData?.specialityMaster);
                setGetQualification(dropData?.qualificationMaster);
                setGetExperience(dropData?.experienceMaster);
                setGetMetro(dropData?.metroMaster);
                setGetFellowship(dropData?.fellowshipMaster);
                setGetObligationData(dropData?.obligationMaster);
                setGetTopicData(dropData?.topicMaster);
                setGetObligationEditData(dropData?.obligData[0]);
                setGetFMVData(dropData?.fmvData)
            },
            onError: (error) => {
                // Handle the error if necessary
                console.error('Error fetching obligation data:', error);
            },
            // Optionally, you can include an `onSettled` function to run on success or failure
            onSettled: () => {
                // Perform any actions after the mutation (e.g., resetting state)
            }
        }
    );


    // get agreement master
    const { data: getAgreement } = useQuery({
        queryKey: ["getAgreement"],
        queryFn: () => GetAgreement(location?.state),
        select: response => {
            return response.data?.resultSet;
        },
        enabled: !!props.openFMV,
        onSuccess(response) {
            debugger
            const dropData = response
            const locationData = getPropsData
            if (locationData?.gsT_NUMBER !== null) {
                const gstObject = dropData.find(obj => obj.PARAMSNAME === "GST");
                setGetAgreementData(gstObject)
            }
            else if (locationData?.gsT_NUMBER === null || locationData?.gsT_NUMBER === "") {
                const gstObject = dropData.find(obj => obj.PARAMSNAME === "F");
                setGetAgreementData(gstObject)
            }
            else {
                const gstObject = dropData.find(obj => obj.PARAMSNAME === "NF");
                setGetAgreementData(gstObject)
            }

        }
    });


    const { mutate: CalculateFMVSave } = useMutation({
        mutationFn: (data) => calculateFMV(data, location?.state),
        onSuccess: (response) => {
            debugger
            let resData = response?.data?.resultSet;

            if (resData?.outcode === 3) {
                // setGetCalculateFMDataShow(resData.calculatedFmv)
                setGetCalculateFMDataShow(resData.calculatedFmv.map(item => ({
                    gst: item.gst,
                    cgst: item.cgst,
                    sgst: item.sgst,
                    amount: item.amount,
                    total: item.total,
                    totaL_AMOUNT: item.total,
                    cgsT_PER: item.cgsT_PER,
                    sgsT_PER: item.sgsT_PER,
                    Con_GST: item.coN_GST,
                    coN_CGST: item.coN_CGST,
                    coN_SGST: item.coN_SGST,
                    coN_TOT_AMT: item.coN_AMOUNT,
                    // grosS_AMOUNT: item.coN_AMOUNT,
                    grosS_AMOUNT: item.amount,
                    coN_AMT: item.coN_AMOUNT,
                    coN_Total: item.coN_TOTAL,
                    coN_EntryNo: item.coN_ENTRYNO,
                    coN_MIN_AMT: item.coN_MIN_AMT,
                })))

                // setGetCalculateFMData(resData.calculatedFmv)
                setGetCalculateFMData(resData.calculatedFmv.map(item => ({
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
                    // grosS_AMOUNT: item.coN_AMOUNT,
                    grosS_AMOUNT: item.amount,
                    // coN_AMT: item.coN_AMOUNT,
                    coN_AMT: item.amount,
                    coN_Total: item.coN_TOTAL,
                    coN_EntryNo: item.coN_ENTRYNO,
                    coN_MIN_AMT: item.coN_MIN_AMT,
                })))
                dispatch(messageSerivce({ messageType: "success", messageContent: resData?.msg }));
                // form.resetFields()
            }
            else {
                setGetCalculateFMData(null)
                setGetCalculateFMDataShow(null)
                dispatch(messageSerivce({ messageType: "error", messageContent: resData?.msg }));
                // dispatch(messageSerivce({ messageType: "error", messageContent: "No data found" }));
            }
        },
    });
    const handleCommonChange = (field, value) => {
        setGetInputfield((prev) => ({
            ...prev,
            [field]: value,
        }));
        setGetChangeFlag(true)
    }
    const confirmCalculation = () => {
        debugger
        console.log('formData', formData, location?.state?.obligation)
        let ObligSoftAlertData = getFMVData.filter(x => x.OBLIGATION == location?.state?.obligation && x.TOPIC == location?.state?.topic && parseInt(x.NO_OF_DAYS) < 180);
        if (ObligSoftAlertData.length > 0) {
            confirm({
                title: `Same obligation and topic exists in previous 6 months. Are you sure you want to continue?`,
                centered: true,
                cancelText: "No",
                okText: "Yes",
                icon: null,
                onOk: calculateFMVData,
                width: 400,
            })
        }
        else {
            calculateFMVData()
        }
    }
    const calculateFMVData = async () => {

        try {
            await form.validateFields();
            debugger
            const getFormData = form.getFieldsValue()
            if (getFormData.Noofhours < 0.5) {
                // Show an alert if the amount is not in thousands
                confirmMessage({
                    title: capitalizeWords("Number of hours should be greater than or equal to 0.5")
                });
                return false; // Stop further execution

            }
            // Update formData fields
            const updatedFormData = {
                ...formData, // Spread the existing formData to retain other fields
                Screenflag: "1",
                Agreement: getAgreementData?.PARAMCODE,
                FMVID: getPropsData?.fmvid
            };

            // Construct the mainData object
            const mainData = {
                IntvId: location?.state?.IntvId,
                IntvReqId: location?.state?.IntvReqId,
                Pcode: getPropsData?.pcode, // Ensure Pcode is accessed safely
                Calculatefmv: updatedFormData, // Use the updated formData
            };
            // Call your FMV calculation function here if needed
            CalculateFMVSave(mainData);
            setGetChangeFlag(false)
        }
        catch (error) {
            debugger;
            return dispatch(messageSerivce({ messageType: "error", messageContent: "All Fields are mandantory" }));
        }
    };
    const columns = [
        {
            title: 'Amount',
            dataIndex: 'grosS_AMOUNT',
            key: 'grosS_AMOUNT',
            width: 200,
            align: "right",
        },
        {
            title: 'CGST',
            dataIndex: 'cgst',
            key: 'cgst',
            width: 200,
            align:"right",
            // render: (_, record) => {
            //     // Check if the value exists, round it up to two decimal places, and ensure two decimal places are shown
            //     let roundedValue = record.cgst ? Math.ceil(record.cgst) : 0;
            //     return roundedValue.toFixed(2); // Ensure the display has two decimal places
            // },
            render: (_, record) => {
                const value = record.cgst ? parseFloat(record.cgst) : 0;
                const roundedValue = Math.round(value * 2) / 2;
                return roundedValue.toFixed(2);
            }
        },
        {
            title: 'SGST',
            dataIndex: 'sgst',
            key: 'sgst',
            width: 200,
            align:"right",
            // render: (_, record) => {
            //     // Check if the value exists, round it up to two decimal places, and ensure two decimal places are shown
            //     let roundedValue = record.sgst ? Math.ceil(record.sgst) : 0;
            //     return roundedValue.toFixed(2); // Ensure the display has two decimal places
            // },
            render: (_, record) => {
                const value = record.sgst ? parseFloat(record.sgst) : 0;
                const roundedValue = Math.round(value * 2) / 2;
                return roundedValue.toFixed(2);
            }
            
        },
        {
            title: 'FMV Amount',
            dataIndex: 'totaL_AMOUNT',
            key: 'totaL_AMOUNT',
            width: 250,
            align: "right",
            render: (_, record) => {
                // Check if the value exists and round it up to the nearest whole number
                let roundedValue = record.totaL_AMOUNT ? Math.ceil(record.totaL_AMOUNT) : 0;
                return roundedValue; // Display without any decimal places
            },
        },

    ];

    const calculateGST = (amount, CGST_PER, SGST_PER) => {
        const cgst = parseInt(CGST_PER) || 0;
        const sgst = parseInt(SGST_PER) || 0;
        const gst = amount - (amount * 100) / (cgst + sgst + 100);
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
        debugger;
        if (parseFloat(record.coN_TOT_AMT) > parseFloat(record.coN_MIN_AMT)) {
            const updatedTotal = parseFloat(record.coN_TOT_AMT) - 1000;

            // Calculate GST, CGST, and SGST
            const coN_GST = calculateGST(updatedTotal, record.cgsT_PER, record.sgsT_PER);
            const coN_CGST = calculateCGST(coN_GST, record.cgsT_PER, record.sgsT_PER);
            const coN_SGST = calculateSGST(coN_GST, record.cgsT_PER, record.sgsT_PER);

            // Ensure contractAmount is valid
            const contractAmount = updatedTotal - (coN_CGST + coN_SGST);

            setGetCalculateFMData((prevData) =>
                prevData.map((item) => {
                    if (item.id === record.id) {
                        return {
                            ...item,
                            // total: updatedTotal,
                            coN_TOT_AMT: updatedTotal,
                            coN_GST: coN_GST || 0, // Default to 0 if NaN
                            coN_CGST: coN_CGST || 0, // Default to 0 if NaN
                            coN_SGST: coN_SGST || 0, // Default to 0 if NaN
                            coN_TOTAL: contractAmount > 0 ? contractAmount : 0, // Default to 0 if invalid
                            // grosS_AMOUNT: updatedTotal
                            coN_AMT: contractAmount,
                        };
                    }
                    return item;
                })
            );
        }
    };


    // const handleIncrease = (record) => {
    //     if (parseFloat(record.total) < parseFloat(record.amount)) { // max condition for total
    //         const updatedTotal = parseFloat(record.total) + 1000;
    //         const gst = calculateGST(updatedTotal, record.cgsT_PER, record.sgsT_PER);
    //         const cgst = calculateCGST(gst, record.cgsT_PER, record.sgsT_PER);
    //         const sgst = calculateSGST(gst, record.cgsT_PER, record.sgsT_PER);
    //         const contractAmount = updatedTotal - (cgst + sgst);

    //         setGetCalculateFMData((prevData) =>
    //             prevData.map((item) => {
    //                 if (item.id === record.id) {
    //                     return {
    //                         ...item,
    //                         total: updatedTotal,
    //                         gst,
    //                         cgst,
    //                         sgst,
    //                         coN_TOTAL: contractAmount,
    //                     };
    //                 }
    //                 return item;
    //             })
    //         );
    //     }
    // };
    const handleIncrease = (record) => {
        if (parseFloat(record.coN_TOT_AMT) < parseFloat(record.totaL_AMOUNT)) { // Check if total is less than max allowed amount
            const updatedTotal = parseFloat(record.coN_TOT_AMT) + 1000;
            const coN_GST = calculateGST(updatedTotal, record.cgsT_PER, record.sgsT_PER);
            const coN_CGST = calculateCGST(coN_GST, record.cgsT_PER, record.sgsT_PER);
            const coN_SGST = calculateSGST(coN_GST, record.cgsT_PER, record.sgsT_PER);
            const contractAmount = updatedTotal - (coN_CGST + coN_SGST);

            setGetCalculateFMData((prevData) =>
                prevData.map((item) => {
                    if (item.id === record.id) {
                        return {
                            ...item,
                            // total: updatedTotal,
                            coN_TOT_AMT: updatedTotal,
                            coN_GST,
                            coN_CGST,
                            coN_SGST,
                            coN_TOTAL: contractAmount,
                            coN_AMT: contractAmount,
                            // grosS_AMOUNT: updatedTotal
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
            dataIndex: 'coN_TOT_AMT',
            key: 'coN_TOT_AMT',

            render: (_, record) => (
                <>
                    {/* {
                        getPropsData.fmV_DISABLE === '1' ?
                            <>{record.total} </>
                            : */}
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
                            // disabled={parseFloat(record.total) >= parseFloat(record.coN_TOT_AMT)}
                            className="btncal"
                        >
                            +
                        </Button>
                    </div>
                    {/* // } */}
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
                const value = record.coN_CGST ? parseFloat(record.coN_CGST) : 0;
                const roundedValue = Math.round(value * 2) / 2;
                return roundedValue.toFixed(2);
            }

            // render: (_, record) => {
            //     // Check if the value exists, round it up to two decimal places, and ensure two decimal places are shown
            //     let roundedValue = record.coN_CGST ? Math.ceil(record.coN_CGST) : 0;
            //     return roundedValue.toFixed(2); // Ensure the display has two decimal places
            // },
        },
        {
            title: 'SGST',
            dataIndex: 'coN_SGST',
            key: 'coN_SGST',
            width: 200,
            align: "right",
            render: (_, record) => {
                const value = record.coN_SGST ? parseFloat(record.coN_SGST) : 0;
                const roundedValue = Math.round(value * 2) / 2;
                return roundedValue.toFixed(2);
            }

            // render: (_, record) => {
            //     // Check if the value exists, round it up to two decimal places, and ensure two decimal places are shown
            //     let roundedValue = record.coN_SGST ? Math.ceil(record.coN_SGST) : 0;
            //     return roundedValue.toFixed(2); // Ensure the display has two decimal places
            // },

            // render: (_, record) => {
            //     // Check if the value exists and round it up to two decimal places
            //     let roundedValue = record.coN_SGST ? Math.ceil(record.coN_SGST * 100) / 100 : 0;
            //     return roundedValue.toFixed(2); // Ensure the display has two decimal places
            // },
        },
        {
            // title: 'Contract Amount',
            // dataIndex: 'coN_TOTAL',
            // key: 'coN_TOTAL',
            // render: (_,record) => {
            //     // Check if the value exists and round it up to two decimal places
            //     let roundedValue = record.coN_TOTAL ? Math.ceil(record.coN_TOTAL * 100) / 100 : 0;
            //     return roundedValue.toFixed(2); // Ensure the display has two decimal places
            // },
            title: 'Contract Amount',
            dataIndex: 'coN_AMT',
            key: 'coN_AMT',
            width: 250,
            align: "right",
            render: (_, record) => {
                // Check if the value exists and round it up to the nearest whole number
                let roundedValue = record.coN_AMT ? Math.ceil(record.coN_AMT) : 0;
                return roundedValue; // Display without any decimal places
            },

        },

    ];

    const SaveData = async () => {
        debugger
        if (getChangeFlag !== true) {

            try {
                await form.validateFields();
                const mergedAgreements = getCalculateFMData.map(item => ({
                    ...getPropsData,
                    ...item,
                    email: formData.EmailId || item.email || null,
                    msL_EMAIL: formData.EmailId || item.email || null,
                    fellowship: formData.Fellowship || item.fellowship || null,
                    qualification: formData.Qlfcode || item.qualification || null,
                    nO_OF_HOURS: formData.Noofhours || item.nO_OF_HOURS || 0,
                    experience: formData.Experience || item.experience || null,
                    speciality: formData.Spclcode || item.Spclcode || null,
                    metro: formData.Metro || item.metro || null,
                    // coN_TOT_AMT: item.total,
                    amount: item.coN_TOT_AMT,
                    topic: props?.location?.state?.topic,
                    obligation: props?.location?.state?.obligation,
                    newFlag: "NewAdded",
                    FMVFLAG: (!getObligationEditData ||
                        getObligationEditData === null ||
                        getObligationEditData === undefined ||
                        (Array.isArray(getObligationEditData) && getObligationEditData.length === 0))
                        ? 'I'
                        : 'U',
                    flag: (!getObligationEditData ||
                        getObligationEditData === null ||
                        getObligationEditData === undefined ||
                        (Array.isArray(getObligationEditData) && getObligationEditData.length === 0))
                        ? 'I'
                        : 'U',
                    entryno: getPropsData.entryno,
                    // cgsT_PER: item.cgsT_PER,
                    // cgst: item.cgst,
                    // coN_AMOUNT: item.coN_AMOUNT,
                    // coN_AMT: item.coN_AMOUNT,
                    // coN_CGST: item.coN_CGST,
                    // coN_ENTRYNO: item.coN_ENTRYNO,
                    // coN_GST: item.coN_GST,
                    // coN_MIN_AMT: item.coN_MIN_AMT,
                    // coN_SGST: item.coN_SGST,
                    // coN_TOTAL: item.coN_TOTAL,
                    // grosS_AMOUNT: getCalculateFMDataShow[0]?.coN_TOTAL,
                    // gst: item.gst,
                    // sgsT_PER: item.sgsT_PER,
                    // sgst: item.sgst,
                    // total: item.total,
                    // status:'Contract Created',
                    fmvflag: (!getObligationEditData ||
                        getObligationEditData === null ||
                        getObligationEditData === undefined ||
                        (Array.isArray(getObligationEditData) && getObligationEditData.length === 0))
                        ? 'I'
                        : 'U',
                    // totaL_AMOUNT:item.coN_AMOUNT,
                    // totaL_AMOUNT: item.total,
                    agreement: getAgreementData?.PARAMCODE

                }));
                const flattenedMergedAgreements = mergedAgreements.reduce((acc, obj) => {
                    return { ...acc, ...obj };
                }, {});
                const finalData = {
                    // ...formData,

                    ...flattenedMergedAgreements
                }
                console.log('finalData', finalData)
                props.saveFVMData(finalData);
                // form.resetFields();
                // setGetCalculateFMDataShow(null);
                // setGetCalculateFMData(null);
            }
            catch (error) {
                debugger
                return dispatch(messageSerivce({ messageType: "error", messageContent: "All Fields are mandantory" }));
            }
        }
        else {
            confirm({
                title: ` Please calculate the FMV to proceed further!`,
                centered: true,
                cancelText: false,
                icon: null,
                cancelButtonProps: { className: 'd-none' },
                width: 400,
            })
        }

    }
    console.log('getPropsData', getPropsData)
    useEffect(() => {
        debugger
        if (props?.location?.state) {
            form.setFieldsValue({
                Obligation: (props?.location?.state?.obligation) !== null ? (props?.location?.state?.obligation) : null,
                Topic: (props?.location?.state?.topic) !== null ? (props?.location?.state?.topic) : null
            })
        }
    }, [props])

    useEffect(() => {
        debugger
        if (getObligationEditData !== null) {
            form.setFieldsValue({
                EmailId: getObligationEditData?.email || getPropsData?.msL_EMAIL,
                Spclcode: getValidNumber(getObligationEditData?.speciality),
                Qlfcode: getValidNumber(getObligationEditData?.qualification),
                Noofhours: getObligationEditData?.nO_OF_HOURS !== undefined ? `${getObligationEditData?.nO_OF_HOURS}` : '',
                Experience: getValidNumber(getObligationEditData?.experience),
                Metro: getValidNumber(getObligationEditData?.metro),
                Fellowship: getValidNumber(getObligationEditData?.fellowship),
            })
            const mergedAgreements = {
                ...getObligationEditData,  // Spread properties from getObligationEditData
            };
            // Set the normalized data to the state (as an array if needed)
            setGetCalculateFMData([mergedAgreements])
            setGetCalculateFMDataShow([mergedAgreements]);

        }
    }, [getObligationEditData])

    const cancelFVMModalData = () => {
        form.resetFields();
        setGetCalculateFMData("")
        setGetCalculateFMDataShow("");
        props.cancelFVMModal()
    }
    const getValidNumber = (value) => {
        const parsedValue = parseInt(value, 10);
        return isNaN(parsedValue) ? "" : parsedValue;
    }
    return (
        <Modal open={props?.openFMV} onCancel={props.cancelFVMModal}
            className='paddingZeromodal colorHeadermodal fullmodal' centered
            width="100%" title="FMV ANALYZER"
            footer={
                <div className=' row d-flex justify-content-center'>
                    <div className={`col-md-2 col-6`}>
                        <Button key="close" className='w-100'
                            onClick={SaveData}
                        >
                            SAVE
                        </Button>
                    </div>
                    <div className={`col-md-2 col-6`}>
                        <Button key="close" className='w-100'
                            onClick={cancelFVMModalData}
                        >
                            CANCEL
                        </Button>
                    </div>
                </div>
            }
        >
            {/* {showObligationLoad && (<ModalLoader />)} */}

            <Form form={form}>

                <div className="modalsegment overflow-auto">
                    {(showObligationLoad) ? (
                        <FormSkeletonModal />
                    ) : (
                        <div className='container-fluid mt-2'>
                            <div className="boxcard mb-3">
                                <div className='box-title-card SubheaderModal'>
                                    <p className='mb-0 box-title'>{getPropsData !== null ? getPropsData.pname : ""} - CONTACT DETAILS</p>
                                </div>
                                <div className='box-body'>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8 col-md-8">
                                            <div className="row justify-content-center">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="FormStyle FormStyleError">
                                                        <label className="FormLabel" >Email ID <Asterisk /></label>
                                                        <InputComp props={{
                                                            type: 'text',
                                                            size: 'medium',
                                                            required: true,
                                                            name: 'EmailId',
                                                            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
                                                        }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* ADDRESS DETAILS */}

                                <div className='box-title-card SubheaderModal'>
                                    <p className='mb-0 box-title'>{getPropsData !== null ? getPropsData.pname : ""} - FAIR MARKET VALUE</p>
                                </div>
                                <div className='box-body'>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8 col-md-8">
                                            <div className="row justify-content-center">
                                                <div className="col-lg-6 col-md-6 mt-2">
                                                    <div className="FormStyle FormStyleError">
                                                        <label htmlFor="textarea" className="FormLabel">Obligation <Asterisk /></label>
                                                        <SelectComp
                                                            props={{
                                                                mode: 'single',
                                                                size: 'medium',
                                                                style: { width: '100%' },
                                                                // required: true,
                                                                disabled: true,
                                                                message: 'Please Select Obligation',
                                                                name: 'Obligation',
                                                                options: [
                                                                    { value: '', label: 'Select' }, // Default "Select" option
                                                                    ...(getObligationData?.map(obj => ({
                                                                        value: obj.PARAMCODE,
                                                                        label: obj.PARAMNAME,
                                                                    })) || []),
                                                                ],
                                                                value: getInputfield?.Obligation,
                                                                defaultValue: '',
                                                                onChange: (value) => {
                                                                    handleCommonChange('Obligation', value);
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 mt-2">
                                                    <div className="FormStyle FormStyleError">
                                                        <label htmlFor="textarea" className="FormLabel">Topic <Asterisk /></label>
                                                        <SelectComp
                                                            props={{
                                                                mode: 'single',
                                                                size: 'medium',
                                                                style: { width: '100%' },
                                                                // required: true,
                                                                message: 'Please Select Topic',
                                                                name: 'Topic',
                                                                disabled: true,
                                                                options: [
                                                                    { value: '', label: 'Select' }, // Default "Select" option
                                                                    ...(getTopicData?.map(obj => ({
                                                                        value: obj.PARAMCODE,
                                                                        label: obj.PARAMNAME,
                                                                    })) || []),
                                                                ],
                                                                value: getInputfield?.Topic,
                                                                defaultValue: '',
                                                                onChange: (value) => {
                                                                    handleCommonChange('Topic', value);
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 mt-2">
                                                    <div className="FormStyle FormStyleError">
                                                        <label htmlFor="textarea" className="FormLabel">Speciality <Asterisk /></label>
                                                        <SelectComp
                                                            props={{
                                                                mode: 'single',
                                                                size: 'medium',
                                                                style: { width: '100%' },
                                                                required: true,
                                                                disabled: (getPropsData?.fmV_DISABLE || '0') === '1',
                                                                message: 'Please Select Speciality',
                                                                name: 'Spclcode',
                                                                options: [
                                                                    { value: '', label: 'Select' }, // Default "Select" option
                                                                    ...(getSpeciality?.map(obj => ({
                                                                        value: obj.PARAMCODE,
                                                                        label: obj.PARAMNAME,
                                                                    })) || []),
                                                                ],
                                                                value: getInputfield?.Spclcode,
                                                                defaultValue: '',
                                                                onChange: (value) => {
                                                                    handleCommonChange('Spclcode', value);
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 mt-2">
                                                    <div className="FormStyle FormStyleError">
                                                        <label htmlFor="textarea" className="FormLabel">Qualification <Asterisk /></label>
                                                        <SelectComp
                                                            props={{
                                                                mode: 'single',
                                                                size: 'medium',
                                                                style: { width: '100%' },
                                                                required: true,
                                                                disabled: (getPropsData?.fmV_DISABLE || '0') === '1',
                                                                message: 'Please Select Qualification',
                                                                name: 'Qlfcode',
                                                                options: [
                                                                    { value: '', label: 'Select' }, // Default "Select" option
                                                                    ...(getQualification?.map(obj => ({
                                                                        value: obj.PARAMCODE,
                                                                        label: obj.PARAMNAME,
                                                                    })) || []),
                                                                ],
                                                                value: getInputfield?.Qlfcode,
                                                                defaultValue: '',
                                                                onChange: (value) => {
                                                                    handleCommonChange('Qlfcode', value);
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 mt-2">
                                                    <div className="FormStyle FormStyleError">
                                                        <label className="FormLabel" >Number of Hours <Asterisk /></label>
                                                        <InputComp props={{
                                                            type: 'text',
                                                            size: 'medium',
                                                            name: 'Noofhours',

                                                            disabled: (getPropsData?.fmV_DISABLE || '0') === '1',
                                                            required: true,
                                                            pattern: "^(?:0\\.\\d{1,2}|[1-9]\\d?(?:\\.\\d{1,2})?)$",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const isValidPattern = /^(?:0\.\d{1,2}|[1-9]\d{0,1}(?:\.\d{1,2})?)$/.test(value);
                                                                if (isValidPattern || value === "") {
                                                                    handleCommonChange('Noofhours', value); // Update the value if it matches the pattern or is empty
                                                                } else {
                                                                    e.target.value = getInputfield?.Noofhours || ""; // Reset the value if invalid
                                                                }
                                                            },
                                                        }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 mt-2">
                                                    <div className="FormStyle FormStyleError">
                                                        <label htmlFor="textarea" className="FormLabel">Experience <Asterisk /></label>
                                                        <SelectComp
                                                            props={{
                                                                mode: 'single',
                                                                size: 'medium',
                                                                style: { width: '100%' },
                                                                required: true,
                                                                message: 'Please Select Experience',
                                                                disabled: (getPropsData?.fmV_DISABLE || '0') === '1',
                                                                name: 'Experience',
                                                                options: [
                                                                    { value: '', label: 'Select' }, // Default "Select" option
                                                                    ...(getExperience?.map(obj => ({
                                                                        value: obj.PARAMCODE,
                                                                        label: obj.PARAMNAME,
                                                                    })) || []),
                                                                ],
                                                                value: getInputfield?.Experience,
                                                                defaultValue: '',
                                                                onChange: (value) => {
                                                                    handleCommonChange('Experience', value);
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 mt-2">
                                                    <div className="FormStyle FormStyleError">
                                                        <label htmlFor="textarea" className="FormLabel">Metro <Asterisk /></label>
                                                        <SelectComp
                                                            props={{
                                                                mode: 'single',
                                                                size: 'medium',
                                                                style: { width: '100%' },
                                                                required: true,
                                                                message: 'Please Select Metro',
                                                                disabled: (getPropsData?.fmV_DISABLE || '0') === '1',
                                                                name: 'Metro',
                                                                options: [
                                                                    { value: '', label: 'Select' }, // Default "Select" option
                                                                    ...(getMetro?.map(obj => ({
                                                                        value: obj.PARAMCODE,
                                                                        label: obj.PARAMNAME,
                                                                    })) || []),
                                                                ],
                                                                value: getInputfield?.Metro,
                                                                defaultValue: '',
                                                                onChange: (value) => {
                                                                    handleCommonChange('Metro', value);
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 mt-2">
                                                    <div className="FormStyle FormStyleError">
                                                        <label htmlFor="textarea" className="FormLabel">Fellowship <Asterisk /></label>
                                                        <SelectComp
                                                            props={{
                                                                mode: 'single',
                                                                size: 'medium',
                                                                style: { width: '100%' },
                                                                required: true,
                                                                message: 'Please Select Fellowship',
                                                                disabled: (getPropsData?.fmV_DISABLE || '0') === '1',
                                                                name: 'Fellowship',
                                                                options: [
                                                                    { value: '', label: 'Select' }, // Default "Select" option
                                                                    ...(getFellowship?.map(obj => ({
                                                                        value: obj.PARAMCODE,
                                                                        label: obj.PARAMNAME,
                                                                    })) || []),
                                                                ],
                                                                value: getInputfield?.Fellowship,
                                                                defaultValue: '',
                                                                onChange: (value) => {
                                                                    handleCommonChange('Fellowship', value);
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <ButtonComp
                                            props={{
                                                type: "primary",
                                                block: true,
                                                size: 'medium',
                                                className: 'footbtn text-uppercase calculatebtn',
                                                label: 'Calculate',
                                                onClick: confirmCalculation
                                            }}
                                            formItem={true}
                                        />
                                    </div>


                                    <div className="row justify-content-center">
                                        <div className="col-lg-8 col-md-8 mt-4">
                                            {
                                                (getCalculateFMDataShow !== null) ? (
                                                    <div className="Report-table table-responsive">
                                                        <div className={`${IntvCss['intvTable']}`}>
                                                            <TableComp props={{
                                                                columns: columns,
                                                                dataSource: getCalculateFMDataShow,
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
                                                (getCalculateFMData !== null || getCalculateFMData?.length > 0) ? (
                                                    <div className="Report-table table-responsive mt-4">
                                                        <div className={`${IntvCss['intvTable']}`}>
                                                            <TableComp props={{
                                                                columns: columnsOne,
                                                                dataSource: getCalculateFMData,
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

                                </div>
                            </div>
                        </div>)}
                </div>
            </Form>

        </Modal>
    )
}


FMVModal.propTypes = {
    sepakerRecord: PropTypes.object,
    openFMV: PropTypes.object,
    cancelFVMModal: PropTypes.func,
    saveFVMData: PropTypes.func,
    location: PropTypes.object
};