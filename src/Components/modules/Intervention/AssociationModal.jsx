import React, { useEffect, useState } from "react";
import { SelectComp } from "../../../components/common/SelectComp";
import { InputComp } from "../../../components/common/FormComponent";
import { Button, Form, Badge, Modal } from "antd";
import { Asterisk } from "../../../constants/AsteriskConstant";
import PanCardInput from "../../../components/common/PnacardComp";
import BankAccountInput from "../../../components/common/AccountNoInput";
import IfscCodeInput from "../../../components/common/IFSCInput";
import { MdOutlineAttachment } from "react-icons/md";
import { GetAssociationDetails, GetVendorDetail, GetCity } from "../../../api/EasApi"
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { messageSerivce } from '../../../api/CommonApi';
import { useDispatch } from 'react-redux';
import { CommonEasUpload } from '../../../components/modules/Intervention/CommonEasUpload';
import PropTypes from 'prop-types';  // Import PropTypes after installation
import ModalLoader from "../../common/ModalLoader";
import { validateText } from "../../../utils/Validation";
import { capitalizeWords, confirmMessage } from "../../../utils/common";
import FormSkeletonModal from "../../skeletons/FormSkeletonModal";

const { confirm } = Modal;


export const AssociationModal = (props) => {
    useEffect(() => {
        if (props?.openAssVendor === true) {
            form.resetFields();
            setRequestLetterFileList([]);
            setPanCardCopyFileList([]);
            setCiplaAgreementFileList([]);
            setGstCertificateFileList([]);
            setGstDeclarationFileList([]);
            setCancelledCheckFileList([]);
            setMsmeFileList([]);
            setVendorDeclarationFileList([]);
            setAddressProofFileList([]);
        }
    }, [props?.openAssVendor])
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const location = useLocation();
    const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
    const [isRequestDetailModelVisible, setIsRequestDetailModelVisible] = useState(false);
    const [isPancardCopyModelVisible, setIsPancardCopyModelVisible] = useState(false);
    const [isCiplaAgreementModelVisible, setIsCiplaAgreementModelVisible] = useState(false);
    const [isGstCertificatesModalVisible, setIsGstCertificatesModalVisible] = useState(false);
    const [isGstDeclarationModalVisible, setIsGstDeclarationModalVisible] = useState(false);
    const [isCancelledCheckModalVisible, setIsCancelledCheckModalVisible] = useState(false);
    const [isMsmeModalVisible, setIsMsmeModalVisible] = useState(false);
    const [isVendorDeclarationModalVisible, setIsVendorDeclarationModalVisible] = useState(false);
    const [isAddressProofModalVisible, setIsAddressProofModalVisible] = useState(false);
    const [requestLetterFileList, setRequestLetterFileList] = useState([]);
    const [panCardCopyFileList, setPanCardCopyFileList] = useState([]);
    const [ciplaAgreementFileList, setCiplaAgreementFileList] = useState([]);
    const [gstCertificateFileList, setGstCertificateFileList] = useState([]);
    const [gstDeclarationFileList, setGstDeclarationFileList] = useState([]);
    const [cancelledCheckFileList, setCancelledCheckFileList] = useState([]);
    const [msmeFileList, setMsmeFileList] = useState([]);
    const [vendorDeclarationFileList, setVendorDeclarationFileList] = useState([]);
    const [addressProofFileList, setAddressProofFileList] = useState([]);
    const [vendetDetails, setVendetDetails] = useState(null);
    const formData = form.getFieldsValue()
    const [getParams, setGetParams] = useState(null)
    const [getTitleData, setGetTitleData] = useState(null)
    const [city, setCity] = useState([]);
    const [getInputfield, setGetInputfield] = useState({
    });
    const [deliverableData, setDeliverableData] = useState([]);
    const { data: getAssociationDetails, isFetching: getAssociationDetailsFetching } = useQuery({
        queryKey: ["GetAssociationDetails"],
        queryFn: () => GetAssociationDetails({
            Vendorid: location?.state.vendoR_ID,
            custtypeflg: location?.state.custtypeflag,
            intvId: location?.state?.intvId,
            reqId: location?.state?.IntvReqId,
        }),
        select: response => {
            debugger
            console.log(response.data?.resultSet);
            return response.data?.resultSet;
        },
        enabled: !!props?.openAssVendor,
        onSuccess: (data) => {
            debugger
            let buMapdata = data?.deliverable?.map(obj => ({
                value: obj.paramcode,
                label: obj.paramname,
            }));
            let buData = [{ value: '-1', label: 'Select All' }, ...buMapdata];
            setDeliverableData(buData);
            if (Array.isArray(data?.association) && data.association.length > 0 && data.association[0]?.requesT_URL) {
                setRequestLetterFileList([
                    {
                        filename: data?.association[0]?.requesT_NAME,
                        imG_URL: data?.association[0]?.requesT_URL,
                        flag: 'uploaded',
                    },
                ]);
            }
            if (Array.isArray(data?.association) && data.association.length > 0) {
                form.setFieldsValue({
                    AssociationName: data?.association[0]?.associationName,
                    AssociationEmailAddress: data?.association[0]?.associationEmail,
                    Deliverables: data?.association[0]?.deliverables?.split(",").filter(value => value?.trim() !== ""),
                    Amount: data?.association[0]?.amount,
                    AdvancedAmount: data?.association[0]?.advAmount,

                });
            }

        },
    });
    const getValidNumber = (value) => {
        const parsedValue = parseInt(value, 10);
        return isNaN(parsedValue) ? "" : parsedValue;
    }

    const [stateData, setStateData] = useState(null)
    const [bankData, setBankData] = useState(null)

    const { data: getAssociationVendorDetails, isFetching: getAssociationVendorDetailsFetching } = useQuery({
        queryKey: ["GetVendorDetail"],
        queryFn: () => GetVendorDetail({
            intvId: location?.state?.intvId,
            reqId: location?.state?.IntvReqId,
            pcode: location?.state?.pcode,
            Vendorid: location?.state?.vendoR_ID,
            ScreenFlag: location?.state?.ScreenFlag,
            entryno: location?.state?.entryno,
            custtypeflg: location?.state?.custtypeflag,
        }),
        enabled: !!props?.openAssVendor,
        select: response => {
            console.log(response.data?.resultSet);
            return response.data?.resultSet;
        },
        onSuccess: (data) => {
            setVendetDetails(data);
            const paramsName = data?.gstMaster?.find(
                obj => obj?.paramcode === data?.bankdata?.[0]?.gsT_REGISTERED
            )?.paramsname || null;

            setGetParams(paramsName);
            const getTitleDataOne = data?.titleMaster?.filter(obj => obj?.paramsname?.toLowerCase() === 'c');
            setGetTitleData(getTitleDataOne)
            setStateData(data?.stateMaster)
            if (data?.bankdata !== null) {
                setBankData(data?.bankdata[0]?.gsT_EDIT)
            }

            if (Array.isArray(data?.attchmntdata) && data.attchmntdata.length > 0 && data?.attchmntdata[0]?.pancarD_URL) {

                const fileNames = data?.attchmntdata[0]?.pancarD_NAME?.split(',') || [];
                const fileUrls = data?.attchmntdata[0]?.pancarD_URL?.split(',') || [];

                if (fileNames.length === fileUrls.length) {
                    setPanCardCopyFileList(
                        fileNames.map((name, index) => ({
                            filename: name,
                            imG_URL: fileUrls[index],
                            flag: 'uploaded',
                        }))
                    );
                }
            }
            if (Array.isArray(data?.attchmntdata) && data.attchmntdata.length > 0 && data?.attchmntdata[0]?.ciplaagreemenT_URL) {
                const fileNames = data?.attchmntdata[0]?.ciplaagreemenT_NAME?.split(',') || [];
                const fileUrls = data?.attchmntdata[0]?.ciplaagreemenT_URL?.split(',') || [];

                if (fileNames.length === fileUrls.length) {
                    setCiplaAgreementFileList(
                        fileNames.map((name, index) => ({
                            filename: name,
                            imG_URL: fileUrls[index],
                            flag: 'uploaded',
                        }))
                    );
                }
            }
            if (Array.isArray(data?.attchmntdata) && data.attchmntdata.length > 0 && data?.attchmntdata[0]?.gsT_CERTIFICATE_URL) {

                const fileNames = data?.attchmntdata[0]?.gsT_CERTIFICATE_NAME?.split(',') || [];
                const fileUrls = data?.attchmntdata[0]?.gsT_CERTIFICATE_URL?.split(',') || [];

                if (fileNames.length === fileUrls.length) {
                    setGstCertificateFileList(
                        fileNames.map((name, index) => ({
                            filename: name,
                            imG_URL: fileUrls[index],
                            flag: 'uploaded',
                        }))
                    );
                }
            }
            if (Array.isArray(data?.attchmntdata) && data.attchmntdata.length > 0 && data?.attchmntdata[0]?.gsT_DECLARATION_URL) {

                const fileNames = data?.attchmntdata[0]?.gsT_DECLARATION_NAME?.split(',') || [];
                const fileUrls = data?.attchmntdata[0]?.gsT_DECLARATION_URL?.split(',') || [];

                if (fileNames.length === fileUrls.length) {
                    setGstDeclarationFileList(
                        fileNames.map((name, index) => ({
                            filename: name,
                            imG_URL: fileUrls[index],
                            flag: 'uploaded',
                        }))
                    );
                }
            }
            if (Array.isArray(data?.attchmntdata) && data.attchmntdata.length > 0 && data?.attchmntdata[0]?.chequE_URL) {

                const fileNames = data?.attchmntdata[0]?.chequE_NAME?.split(',') || [];
                const fileUrls = data?.attchmntdata[0]?.chequE_URL?.split(',') || [];

                if (fileNames.length === fileUrls.length) {
                    setCancelledCheckFileList(
                        fileNames.map((name, index) => ({
                            filename: name,
                            imG_URL: fileUrls[index],
                            flag: 'uploaded',
                        }))
                    );
                }
            }
            if (Array.isArray(data?.attchmntdata) && data.attchmntdata.length > 0 && data?.attchmntdata[0]?.msmE_URL) {

                const fileNames = data?.attchmntdata[0]?.msmE_NAME?.split(',') || [];
                const fileUrls = data?.attchmntdata[0]?.msmE_URL?.split(',') || [];

                if (fileNames.length === fileUrls.length) {
                    setMsmeFileList(
                        fileNames.map((name, index) => ({
                            filename: name,
                            imG_URL: fileUrls[index],
                            flag: 'uploaded',
                        }))
                    );
                }

            }
            if (Array.isArray(data?.attchmntdata) && data.attchmntdata.length > 0 && data?.attchmntdata[0]?.vendoR_DECLARATION_URL) {

                const fileNames = data?.attchmntdata[0]?.vendoR_DECLARATION_NAME?.split(',') || [];
                const fileUrls = data?.attchmntdata[0]?.vendoR_DECLARATION_URL?.split(',') || [];

                if (fileNames.length === fileUrls.length) {
                    setVendorDeclarationFileList(
                        fileNames.map((name, index) => ({
                            filename: name,
                            imG_URL: fileUrls[index],
                            flag: 'uploaded',
                        }))
                    );
                }
            }
            if (Array.isArray(data?.attchmntdata) && data.attchmntdata.length > 0 && data?.attchmntdata[0]?.addrprooF_URL) {
                const fileNames = data?.attchmntdata[0]?.addrprooF_NAME?.split(',') || [];
                const fileUrls = data?.attchmntdata[0]?.addrprooF_URL?.split(',') || [];

                if (fileNames.length === fileUrls.length) {
                    setAddressProofFileList(
                        fileNames.map((name, index) => ({
                            filename: name,
                            imG_URL: fileUrls[index],
                            flag: 'uploaded',
                        }))
                    );
                }
            }
            if (
                Array.isArray(data?.vendordt) && data.vendordt.length > 0 &&
                Array.isArray(data?.addressdata) && data.addressdata.length > 0 &&
                Array.isArray(data?.attchmntdata) && data.attchmntdata.length > 0 &&
                Array.isArray(data?.bankdata) && data.bankdata.length > 0
            ) {
                getCity({ choice: 'CITY', Statecode: data?.addressdata[0]?.state })

                form.setFieldsValue({
                    Title: data?.vendordt[0]?.title,
                    PanCard: data?.vendordt[0]?.vendoR_NAME,
                    AddressLine1: data?.addressdata[0]?.street,
                    AddressLine2: data?.addressdata[0]?.streeT2,
                    AddressLine3: data?.addressdata[0]?.streeT3,
                    GSTReg: data?.bankdata[0]?.gsT_REGISTERED,
                    // GSTRegNo: data?.bankdata[0]?.gstNumber,
                    GSTRegNo: data?.bankdata[0]?.gstin,

                    District: data?.addressdata[0]?.district,
                    State: data?.addressdata[0]?.state,
                    City: getValidNumber(data?.addressdata[0]?.city),
                    PostalCode: data?.addressdata[0]?.postaL_CODE,
                    addressproof: data?.attchmntdata[0]?.addrproof,
                    BankName: data?.bankdata[0]?.bank,
                    IFSCCode: data?.bankdata[0]?.ifsc,
                    BankAccNumber: location?.state.ScreenFlag == '9' ? data?.bankdata[0]?.accounT_NUM : data?.bankdata[0]?.actuaL_AC_NUMBER,
                    BankAccountNumberReal: data?.bankdata[0]?.actuaL_AC_NUMBER,
                    AccHldNumber: data?.bankdata[0]?.holdeR_NAME,
                    panCardNo: data?.bankdata[0]?.pancard,
                });
            }
        },
    });
    console.log('formData', formData)

    const { mutate: getCity, isLoading: isgetCity } = useMutation({
        mutationFn: (statecode) => GetCity(statecode),
        onSuccess: (response) => {
            console.log(response.data?.resultSet);
            setCity(response.data?.resultSet)
        },
        // enabled:!!(formData?.State),
        onError: (response) => {
            dispatch(messageSerivce({
                messageType: "error",
                messageContent: response.data?.resultSet,
            }));
        },

    });
    const handleCommonChange = (field, value, option) => {
        debugger

        setGetInputfield((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === 'State') {
            getCity({ choice: 'CITY', Statecode: value });
        }
        if (field == 'GSTReg') {
            setGetParams(option?.paramsname)
        }
        form.setFieldsValue({
            [field]: value,
        });
    }

    const handleDocument = (record) => {
        if (record === 'requestletter') {
            setIsRequestDetailModelVisible(true);
        }
        else if (record === 'pancardcopy') {
            setIsPancardCopyModelVisible(true);
        }
        else if (record === 'ciplaagreement') {
            setIsCiplaAgreementModelVisible(true);
        }
        else if (record === 'gst') {
            setIsGstCertificatesModalVisible(true);
        }
        else if (record === 'gstdeclaration') {
            setIsGstDeclarationModalVisible(true);
        }
        else if (record === 'cancelcheque') {
            setIsCancelledCheckModalVisible(true);
        }
        else if (record === 'msme') {
            setIsMsmeModalVisible(true);
        }
        else if (record === 'venderdeclaration') {
            setIsVendorDeclarationModalVisible(true);
        }
        else if (record === 'addressproof') {
            setIsAddressProofModalVisible(true);
        }
    }

    const onCancel = () => {
        setIsCameraModalVisible(false)
    }

    const footerBtnProps = [
        {
            title: 'CANCEL',
            isVisible: true,
            handleClick: () => {
                form.resetFields()
                navigate('/Intv/SpeakerExpense', { state: location?.state })
            }



        },
        {
            title: 'SAVE',
            isVisible: true,
            handleClick: async () => {
                console.log('ddddddde', form.validateFields())
                debugger
                // form.setFieldsValue({
                //     BankAccNumber: vendetDetails?.bankdata?.length > 0 ? vendetDetails?.bankdata[0]?.actuaL_AC_NUMBER : formData.BankAccNumber, // Show actual bank number
                //     // BankAccountNumberReal: data?.bankdata[0]?.actuaL_AC_NUMBER, // Set the real bank account number
                // });
                try {
                    // const bankAccountNumber
                    // const bankNumber = formData.BankAccountNumberReal
                    // form.setFieldsValue({
                    //     BankAccNumber: bankNumber
                    // })
                    await form.validateFields();
                    if (location?.state?.ScreenFlag === '8' && requestLetterFileList.length <= 0) {
                        confirm({
                            title: `Please attach request letter`,
                            centered: true,
                            cancelText: false,
                            cancelButtonProps: { className: 'd-none' },
                            width: 400,
                        })
                        return false;
                    }
                    if (location?.state?.ScreenFlag === '8' && panCardCopyFileList.length <= 0) {
                        confirm({
                            title: `Please attach PAN card`,
                            centered: true,
                            cancelText: false,
                            cancelButtonProps: { className: 'd-none' },
                            width: 400,
                        })
                        return false;
                    }
                    if (location?.state?.ScreenFlag === '8' && ciplaAgreementFileList.length <= 0) {
                        confirm({
                            title: `Please attach Cipla Agreement`,
                            centered: true,
                            cancelText: false,
                            cancelButtonProps: { className: 'd-none' },
                            width: 400,
                        })
                        return false;
                    }
                    if (location?.state?.ScreenFlag === '8' && formData.GSTReg === '186909' && gstCertificateFileList.length <= 0) {
                        confirm({
                            title: `Please attach GST certificates`,
                            centered: true,
                            cancelText: false,
                            cancelButtonProps: { className: 'd-none' },
                            width: 400,
                        })
                        return false;
                    }
                    if (location?.state?.ScreenFlag === '8' && formData.GSTReg !== '186909' && gstDeclarationFileList.length <= 0) {
                        confirm({
                            title: `Please attach GST declaration`,
                            centered: true,
                            cancelText: false,
                            cancelButtonProps: { className: 'd-none' },
                            width: 400,
                        })
                        return false;
                    }
                    if (location?.state?.ScreenFlag === '8' && cancelledCheckFileList.length <= 0) {
                        confirm({
                            title: `Please attach cancelled cheque/bank letter`,
                            centered: true,
                            cancelText: false,
                            cancelButtonProps: { className: 'd-none' },
                            width: 400,
                        })
                        return false;
                    }
                    if (location?.state?.ScreenFlag === '8' && msmeFileList.length <= 0) {
                        confirm({
                            title: `Please attach MSME Certificate`,
                            centered: true,
                            cancelText: false,
                            cancelButtonProps: { className: 'd-none' },
                            width: 400,
                        })
                        return false;
                    }
                    if (location?.state?.ScreenFlag === '8' && formData?.addressproof == "") {
                        confirm({
                            title: `Please select address proof`,
                            centered: true,
                            cancelText: false,
                            cancelButtonProps: { className: 'd-none' },
                            width: 400,
                        })
                        return false;
                    }
                    if (location?.state?.ScreenFlag === '8' && addressProofFileList.length <= 0) {
                        confirm({
                            title: `Please attach address proof copy`,
                            centered: true,
                            cancelText: false,
                            cancelButtonProps: { className: 'd-none' },
                            width: 400,
                        })
                        return false;
                    }


                    debugger;
                    let ContractData = {};
                    ContractData.Email = formData?.AssociationEmailAddress;
                    ContractData.Association_Name = formData?.AssociationName;
                    // ContractData.Deliverables = formData?.Deliverables;
                    ContractData.Deliverables = formData?.Deliverables.join(',');
                    ContractData.Amount = formData?.Amount;
                    ContractData.AdvAmount = formData?.AdvancedAmount;
                    ContractData.Vendorid = location?.state?.vendoR_ID;
                    ContractData.Flag = location?.state?.vendoR_ID == '' ? "I" : "U";
                    ContractData.Screenflag = location?.state?.ScreenFlag;
                    ContractData.Title = formData?.Title;
                    ContractData.VendorName = formData?.PanCard;
                    ContractData.Street = formData?.AddressLine1;
                    ContractData.Street2 = formData?.AddressLine2;
                    ContractData.Street3 = formData?.AddressLine3;
                    ContractData.District = formData?.District;
                    ContractData.State = formData?.State;
                    ContractData.City = formData?.City;
                    ContractData.Postalcode = formData?.PostalCode;
                    ContractData.GstReg = formData?.GSTReg;
                    ContractData.Gstno = formData?.GSTRegNo;
                    ContractData.Bankname = formData?.BankName;
                    ContractData.Ifsccode = formData?.IFSCCode;
                    ContractData.Accountno = location?.state.ScreenFlag == '9' ? "" : formData?.BankAccNumber;
                    ContractData.Holdername = formData?.AccHldNumber;
                    ContractData.Panno = formData?.panCardNo;
                    ContractData.AddrPrf = formData.addressproof;


                    ContractData.Panname = panCardCopyFileList.map(file => file.filename).join(', ');
                    ContractData.Panurl = panCardCopyFileList.map(file => file.imG_URL).join(', ');
                    ContractData.Gstcertificatename = gstCertificateFileList.map(file => file.filename).join(', ');
                    ContractData.GstCertificateurl = gstCertificateFileList.map(file => file.imG_URL).join(', ');
                    ContractData.GstDeclarationname = gstDeclarationFileList.map(file => file.filename).join(', ');
                    ContractData.GstDeclarationeurl = gstDeclarationFileList.map(file => file.imG_URL).join(', ');
                    ContractData.Chequename = cancelledCheckFileList.map(file => file.filename).join(', ');
                    ContractData.Chequeurl = cancelledCheckFileList.map(file => file.imG_URL).join(', ');
                    ContractData.VndrDeclarationname = vendorDeclarationFileList.map(file => file.filename).join(', ');
                    ContractData.VndrDeclarationeurl = vendorDeclarationFileList.map(file => file.imG_URL).join(', ');
                    // ContractData.AddrPrf = vendetDetails?.attchmntdata?.[0]?.addrproof ? vendetDetails?.attchmntdata?.[0]?.addrproof : formData.addressproof;
                    ContractData.AddrPrfName = addressProofFileList.map(file => file.filename).join(', ');
                    ContractData.AddrPrfUrl = addressProofFileList.map(file => file.imG_URL).join(', ');
                    ContractData.CiplaAgreementName = ciplaAgreementFileList.map(file => file.filename).join(', ');
                    ContractData.CiplaAgreementUrl = ciplaAgreementFileList.map(file => file.imG_URL).join(', ');
                    ContractData.MSMEName = msmeFileList.map(file => file.filename).join(', ');
                    ContractData.MSMEUrl = msmeFileList.map(file => file.imG_URL).join(', ');
                    ContractData.ReqLetterName = requestLetterFileList.map(file => file.filename).join(', ');
                    ContractData.ReqLetterUrl = requestLetterFileList.map(file => file.imG_URL).join(', ');
                    ContractData.IntvReqId = location?.state?.IntvReqId;
                    ContractData.IntvId = location?.state?.intvId;
                    ContractData.Status = location?.state?.mode == "REQ" ? "1" : location?.state?.mode == "EDT" ? "3" : location?.state?.mode == "RPT" ? "2" : "";
                    ContractData.Contractid = location?.state?.contracT_ID;

                    props.SaveAssociateContract(ContractData);

                }
                catch (error) {
                    console.log('error', error)
                    return dispatch(messageSerivce({ messageType: "error", messageContent: "All Fields are mandantory" }));
                }


            }
        }
    ]

    const saveData = async () => {
        console.log('ddddddde', form.validateFields())
        debugger
        // form.setFieldsValue({
        //     BankAccNumber: vendetDetails?.bankdata?.length > 0 ? vendetDetails?.bankdata[0]?.actuaL_AC_NUMBER : formData.BankAccNumber, // Show actual bank number
        //     // BankAccountNumberReal: data?.bankdata[0]?.actuaL_AC_NUMBER, // Set the real bank account number
        // });
        try {
            // const bankAccountNumber
            // const bankNumber = formData.BankAccountNumberReal
            // form.setFieldsValue({
            //     BankAccNumber: bankNumber
            // })
            // disabled={location?.state?.ScreenFlag === '9' ? true : false
            if (location?.state?.ScreenFlag === '9') {
                // Do nothing when ScreenFlag is '9'
            } else {
                // Perform form validation for other cases
                await form.validateFields();
            }
            const isValidThousand = /^(?:[1-9][0-9]*)000$/;
            const getFormUpdataData = form.getFieldValue()

            if (getFormUpdataData.Amount) {
                debugger
                if (!isValidThousand.test(getFormUpdataData.Amount)) {
                    // Show an alert if the amount is not in thousands
                    confirmMessage({
                        title: capitalizeWords("Amount should be mentioned in whole thousands only!")
                    });
                    return false; // Stop further execution
                }
            }
            if (getFormUpdataData.AdvancedAmount) {
                if (!isValidThousand.test(getFormUpdataData.AdvancedAmount)) {
                    // Show an alert if the amount is not in thousands
                    confirmMessage({
                        title: capitalizeWords("Advance Amount should be mentioned in whole thousands only!")
                    });
                    return false; // Stop further execution
                }

            }
            if (getFormUpdataData.AdvancedAmount > getFormUpdataData.Amount) {
                confirmMessage({
                    title: capitalizeWords("Advance amount should not be greater than the entered amount."),
                });
                return false; // Stop further execution
            }

            if (location?.state?.ScreenFlag === '8' && requestLetterFileList.length <= 0) {
                confirm({
                    title: `Please attach request letter`,
                    centered: true,
                    cancelText: false,
                    cancelButtonProps: { className: 'd-none' },
                    width: 400,
                })
                return false;
            }
            if (location?.state?.ScreenFlag === '8' && panCardCopyFileList.length <= 0) {
                confirm({
                    title: `Please attach PAN card`,
                    centered: true,
                    cancelText: false,
                    cancelButtonProps: { className: 'd-none' },
                    width: 400,
                })
                return false;
            }
            if (location?.state?.ScreenFlag === '8' && ciplaAgreementFileList.length <= 0) {
                confirm({
                    title: `Please attach Cipla Agreement`,
                    centered: true,
                    cancelText: false,
                    cancelButtonProps: { className: 'd-none' },
                    width: 400,
                })
                return false;
            }
            if (location?.state?.ScreenFlag === '8' && formData.GSTReg === '186909' && gstCertificateFileList.length <= 0) {
                confirm({
                    title: `Please attach GST certificates`,
                    centered: true,
                    cancelText: false,
                    cancelButtonProps: { className: 'd-none' },
                    width: 400,
                })
                return false;
            }
            if (location?.state?.ScreenFlag === '8' && formData.GSTReg !== '186909' && gstDeclarationFileList.length <= 0) {
                confirm({
                    title: `Please attach GST declaration`,
                    centered: true,
                    cancelText: false,
                    cancelButtonProps: { className: 'd-none' },
                    width: 400,
                })
                return false;
            }
            if (location?.state?.ScreenFlag === '8' && cancelledCheckFileList.length <= 0) {
                confirm({
                    title: `Please attach cancelled cheque/bank letter`,
                    centered: true,
                    cancelText: false,
                    cancelButtonProps: { className: 'd-none' },
                    width: 400,
                })
                return false;
            }
            if (location?.state?.ScreenFlag === '8' && msmeFileList.length <= 0) {
                confirm({
                    title: `Please attach MSME Certificate`,
                    centered: true,
                    cancelText: false,
                    cancelButtonProps: { className: 'd-none' },
                    width: 400,
                })
                return false;
            }
            if (location?.state?.ScreenFlag === '8' && formData?.addressproof == "") {
                confirm({
                    title: `Please select address proof`,
                    centered: true,
                    cancelText: false,
                    cancelButtonProps: { className: 'd-none' },
                    width: 400,
                })
                return false;
            }
            if (location?.state?.ScreenFlag === '8' && addressProofFileList.length <= 0) {
                confirm({
                    title: `Please attach address proof copy`,
                    centered: true,
                    cancelText: false,
                    cancelButtonProps: { className: 'd-none' },
                    width: 400,
                })
                return false;
            }


            debugger;
            let ContractData = {};
            console.log('2222222222222222', formData)

            ContractData.Email = formData?.AssociationEmailAddress;
            ContractData.Association_Name = formData?.AssociationName;
            // ContractData.Deliverables = formData?.Deliverables;
            ContractData.Deliverables = formData?.Deliverables.join(',');
            ContractData.Amount = formData?.Amount;
            ContractData.AdvAmount = formData?.AdvancedAmount;
            ContractData.Vendorid = location?.state?.vendoR_ID;
            ContractData.Flag = location?.state?.vendoR_ID == '' ? "I" : "U";
            ContractData.Screenflag = location?.state?.ScreenFlag;
            ContractData.Title = formData?.Title;
            ContractData.VendorName = formData?.PanCard;
            ContractData.Street = formData?.AddressLine1;
            ContractData.Street2 = formData?.AddressLine2;
            ContractData.Street3 = formData?.AddressLine3;
            ContractData.District = formData?.District;
            ContractData.State = formData?.State;
            ContractData.City = formData?.City;
            ContractData.Postalcode = formData?.PostalCode;
            ContractData.GstReg = formData?.GSTReg;
            ContractData.Gstno = formData?.GSTRegNo;
            ContractData.Bankname = formData?.BankName;
            ContractData.Ifsccode = formData?.IFSCCode;
            ContractData.Accountno = location?.state.ScreenFlag == '9' ? "" : formData?.BankAccNumber;
            ContractData.Holdername = formData?.AccHldNumber;
            ContractData.Panno = formData?.panCardNo;
            ContractData.AddrPrf = formData.addressproof;
            ContractData.Panname = panCardCopyFileList.map(file => file.filename).join(', ');
            ContractData.Panurl = panCardCopyFileList.map(file => file.imG_URL).join(', ');
            ContractData.Gstcertificatename = gstCertificateFileList.map(file => file.filename).join(', ');
            ContractData.GstCertificateurl = gstCertificateFileList.map(file => file.imG_URL).join(', ');
            ContractData.GstDeclarationname = gstDeclarationFileList.map(file => file.filename).join(', ');
            ContractData.GstDeclarationeurl = gstDeclarationFileList.map(file => file.imG_URL).join(', ');
            ContractData.Chequename = cancelledCheckFileList.map(file => file.filename).join(', ');
            ContractData.Chequeurl = cancelledCheckFileList.map(file => file.imG_URL).join(', ');
            ContractData.VndrDeclarationname = vendorDeclarationFileList.map(file => file.filename).join(', ');
            ContractData.VndrDeclarationeurl = vendorDeclarationFileList.map(file => file.imG_URL).join(', ');
            // ContractData.AddrPrf = vendetDetails?.attchmntdata?.[0]?.addrproof ? vendetDetails?.attchmntdata?.[0]?.addrproof : formData.addressproof;
            ContractData.AddrPrfName = addressProofFileList.map(file => file.filename).join(', ');
            ContractData.AddrPrfUrl = addressProofFileList.map(file => file.imG_URL).join(', ');
            ContractData.CiplaAgreementName = ciplaAgreementFileList.map(file => file.filename).join(', ');
            ContractData.CiplaAgreementUrl = ciplaAgreementFileList.map(file => file.imG_URL).join(', ');
            ContractData.MSMEName = msmeFileList.map(file => file.filename).join(', ');
            ContractData.MSMEUrl = msmeFileList.map(file => file.imG_URL).join(', ');
            ContractData.ReqLetterName = requestLetterFileList.map(file => file.filename).join(', ');
            ContractData.ReqLetterUrl = requestLetterFileList.map(file => file.imG_URL).join(', ');
            ContractData.IntvReqId = location?.state?.IntvReqId;
            ContractData.IntvId = location?.state?.intvId;
            ContractData.Status = location?.state?.mode == "REQ" ? "1" : location?.state?.mode == "EDT" ? "3" : location?.state?.mode == "RPT" ? "2" : "";
            ContractData.Contractid = location?.state?.contracT_ID;

            props.SaveAssociateContract(ContractData);

        }
        catch (error) {
            console.log('2222222222222222', formData)

            console.log('error', error)
            return dispatch(messageSerivce({ messageType: "error", messageContent: "All Fields are mandantory" }));
        }
    }
    const cancelModalData = () => {
        form.resetFields();
        setRequestLetterFileList([]);
        setPanCardCopyFileList([]);
        setCiplaAgreementFileList([]);
        setGstCertificateFileList([]);
        setGstDeclarationFileList([]);
        setCancelledCheckFileList([]);
        setMsmeFileList([]);
        setVendorDeclarationFileList([]);
        setAddressProofFileList([]);
        props.cancelAssVendorModal()
    }
    console.log('formData', formData, location?.state)
    return (
        <Modal open={props?.openAssVendor} onCancel={cancelModalData}
            className='paddingZeromodal colorHeadermodal fullmodal' centered
            width="100%" title="Create Association Contract"
            closeIcon={null}
            closable={false}
            footer={
                <div className=' row d-flex justify-content-center'>
                    <div className={`col-md-2 col-6`}>
                        <Button key="close" className='w-100'
                            onClick={saveData}
                        >
                            SAVE
                        </Button>
                    </div>
                    <div className={`col-md-2 col-6`}>
                        <Button key="close" className='w-100'
                            onClick={cancelModalData}
                        >
                            CANCEL
                        </Button>
                    </div>
                </div>
            }
        >

             {isgetCity && (<ModalLoader />)} 

            <Form form={form}
            >

                <div className="modalsegment overflow-auto">
                {(getAssociationDetailsFetching || getAssociationVendorDetailsFetching ) ? (
                        <FormSkeletonModal />
                    ) : (
                    <div className='container-fluid mt-2'>


                        <div className="boxcard mb-3">
                            <div className='box-title-card SubheaderModal'>
                                <p className='mb-0 box-title'> Association Details</p>
                            </div>
                            <div className='box-body'>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-md-8 mt-2">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6 col-md-6">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel FormStyleError" >Association Name <Asterisk /></label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        name: 'AssociationName',
                                                        required: true,
                                                        disabled: location?.state?.ScreenFlag === '9',
                                                        value: getInputfield.AssociationName,
                                                        maxLength: 100,
                                                        pattern: "^[a-zA-Z. ]+$",
                                                        onChange: (e) => {
                                                            let filteredValue = validateText(e.target.value, "[^a-zA-Z ]");
                                                            handleCommonChange('AssociationName', filteredValue);
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className={`FormStyle FormStyleError`}>
                                                    <label className="FormLabel FormStyleError" >Association Email Address <Asterisk /></label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        name: 'AssociationEmailAddress',
                                                        required: true,
                                                        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
                                                        value: getInputfield.AssociationEmailAddress,
                                                        onChange: (value) => {
                                                            handleCommonChange('AssociationEmailAddress', value.target.value);
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/*CONTRACTS DETAILS  */}
                            <div className='box-title-card SubheaderModal'>
                                <p className='mb-0 box-title'>CONTRACTS DETAILS
                                </p>
                            </div>
                            <div className='box-body'>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-md-8 mt-2">
                                        <div className="row justify-content-center align-items-center">
                                            <div className="col-lg-6 col-md-6 mb-2">

                                                <div className="FormStyle FormStyleError">
                                                    <div className="FormStyle FormStyleError">
                                                        <label htmlFor="textarea" className="FormLabel FormStyleError">Deliverables <Asterisk /></label>
                                                        <SelectComp
                                                            props={{
                                                                mode: 'single',
                                                                size: 'medium',
                                                                style: { width: '100%' },
                                                                required: true,
                                                                mode: 'multiple',
                                                                name: 'Deliverables',
                                                                optArray: deliverableData, setOptArray: setDeliverableData,
                                                                options: [
                                                                    { value: '0', label: 'Select', disabled: true },
                                                                    ...(deliverableData)
                                                                ],
                                                                value: getInputfield.Deliverables,
                                                                defaultValue: '0',
                                                                onChange: (value) => {
                                                                    handleCommonChange('Deliverables', value);
                                                                },
                                                            }}
                                                            validator={true} selectAll={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-2">
                                                <div className="FormStyle FormStyleError">
                                                    <label className="FormLabel FormStyleError" >Enter the Amount <Asterisk /></label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        name: 'Amount',
                                                        required: true,
                                                        value: getInputfield.Amount,
                                                        pattern: "^[0-9]+$",
                                                        onChange: (e) => {
                                                            let filteredValue = validateText(e.target.value, "[^0-9]");
                                                            // form.setFieldsValue({ 'Amount': filteredValue })
                                                            handleCommonChange('Amount', filteredValue);

                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-2">
                                                <div className="FormStyle FormStyleError">
                                                    <label className="FormLabel FormStyleError" >Enter the Advance Amount
                                                    </label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        name: 'AdvancedAmount',
                                                        value: getInputfield.AdvancedAmount,
                                                        pattern: "^[0-9]+$",
                                                        onChange: (e) => {
                                                            let filteredValue = validateText(e.target.value, "[^0-9]");
                                                            handleCommonChange('AdvancedAmount', filteredValue);
                                                            // form.setFieldsValue({ 'AdvancedAmount': filteredValue })
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6  mb-2">
                                                <div className="d-flex justify-content-between mt-4">
                                                    <div>
                                                        Request Letter <Asterisk />
                                                    </div>
                                                    <div>
                                                        <Badge className="cursor" onClick={() => handleDocument("requestletter")} count={requestLetterFileList?.length} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                        <div>
                                                            <CommonEasUpload
                                                                readOnlyFlg={location?.state?.ScreenFlag === '9' && (getAssociationDetails?.association?.length > 0 && getAssociationDetails?.association[0]?.requesT_URL?.length > 0) ? 'readonly' : ''} isCameraModalVisible={isRequestDetailModelVisible}
                                                                setisCameraModalVisible={setIsRequestDetailModelVisible}
                                                                fileList={requestLetterFileList} pageFlag={11}
                                                                setFileList={setRequestLetterFileList}
                                                                acceptFiles={["pdf", "jpeg", "jpg", "png"]} // Customize allowed extensions
                                                                onCancel={onCancel}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* VENDOR DETAILS */}
                            <div className='box-title-card SubheaderModal'>
                                <p className='mb-0 box-title'>VENDOR DETAILS</p>
                            </div>
                            <div className='box-body'>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-md-8 mt-2">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label htmlFor="textarea" className="FormLabel">Title <Asterisk /></label>
                                                    <SelectComp
                                                        props={{
                                                            mode: 'single',
                                                            size: 'medium',
                                                            style: { width: '100%' },
                                                            required: true,
                                                            disabled: location?.state?.ScreenFlag === '9',
                                                            name: 'Title',
                                                            options: [
                                                                { value: '', label: 'Select' }, // Default "Select" option
                                                                ...(getTitleData?.map(obj => ({
                                                                    value: obj.paramcode,
                                                                    label: obj.paramname,
                                                                })) || []),
                                                            ],
                                                            // disabled: true,
                                                            value: getInputfield.Title,
                                                            defaultValue: '',
                                                            onChange: (value) => {
                                                                handleCommonChange('Title', value);
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel" >Vendor Name As Per PAN Card <Asterisk /></label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        name: 'PanCard',
                                                        maxLength: 40,
                                                        required: true,
                                                        pattern: "^[a-zA-Z ]+$",
                                                        disabled: location?.state?.ScreenFlag === '9',
                                                        value: getInputfield.PanCard,
                                                        onChange: (value) => {
                                                            handleCommonChange('PanCard', value.target.value);
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ADDRESS DETAILS */}

                            <div className='box-title-card SubheaderModal'>
                                <p className='mb-0 box-title'>ADDRESS DETAILS</p>
                            </div>
                            <div className='box-body'>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-md-8 mt-2">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6 col-md-6">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel FormStyleError" >Address Line 1 <Asterisk /></label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        name: 'AddressLine1',
                                                        maxLength: 40,
                                                        required: true,
                                                        disabled: location?.state?.ScreenFlag === '9',
                                                        value: getInputfield.AddressLine1,
                                                        onChange: (value) => {
                                                            const filterData = validateText(value.target.value, /['"<>;:\\]/)
                                                            handleCommonChange('AddressLine1', filterData);
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel FormStyleError">Address Line 2 <Asterisk /></label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        name: 'AddressLine2',
                                                        maxLength: 60,
                                                        required: true,
                                                        disabled: location?.state?.ScreenFlag === '9',
                                                        value: getInputfield.AddressLine2,
                                                        onChange: (value) => {
                                                            const filterData = validateText(value.target.value, /['"<>;:\\]/)
                                                            handleCommonChange('AddressLine2', filterData);
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel" >Address Line 3
                                                        {/* <Asterisk /> */}
                                                    </label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        name: 'AddressLine3',
                                                        maxLength: 60,
                                                        // required: true,
                                                        disabled: location?.state?.ScreenFlag === '9',
                                                        value: getInputfield.AddressLine3,
                                                        onChange: (value) => {
                                                            const filterData = validateText(value.target.value, /['"<>;:\\]/)
                                                            handleCommonChange('AddressLine3', filterData);
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel FormStyleError" >District
                                                        {/* <Asterisk /> */}
                                                    </label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        name: 'District',
                                                        maxLength: 40,
                                                        disabled: location?.state?.ScreenFlag === '9',
                                                        value: getInputfield.District,
                                                        onChange: (value) => {
                                                            handleCommonChange('District', value.target.value);
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label htmlFor="textarea" className="FormLabel">Region/State <Asterisk /></label>
                                                    <SelectComp
                                                        props={{
                                                            mode: 'single',
                                                            size: 'medium',
                                                            style: { width: '100%' },
                                                            required: true,
                                                            name: 'State',
                                                            disabled: location?.state?.ScreenFlag === '9',
                                                            // options: [
                                                            //     { value: '', label: 'Select' }, // Default "Select" option
                                                            //     ...(stateData?.map(obj => ({
                                                            //         value: obj.paramcode,
                                                            //         label: obj.paramname,
                                                            //     })) || []),
                                                            // ],
                                                            options: [
                                                                { value: '', label: 'Select' }, // Default "Select" option
                                                                ...(
                                                                    stateData
                                                                        ?.filter((obj, index, self) =>
                                                                            self.findIndex(item => item.paramcode === obj.paramcode) === index // Keep the first occurrence of each paramcode
                                                                        )
                                                                        .map(obj => ({
                                                                            value: obj.paramcode,
                                                                            label: obj.paramname,
                                                                        })) || []
                                                                ),
                                                            ],

                                                            value: getInputfield.State,
                                                            defaultValue: '',
                                                            onChange: (value) => {
                                                                handleCommonChange('State', value);
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label htmlFor="textarea" className="FormLabel">City <Asterisk /></label>
                                                    <SelectComp
                                                        props={{
                                                            mode: 'single',
                                                            size: 'medium',
                                                            style: { width: '100%' },
                                                            required: true,
                                                            message: 'Please Select City',
                                                            name: 'City',
                                                            disabled: location?.state?.ScreenFlag === '9',
                                                            options: [
                                                                { value: '', label: 'Select' }, // Default "Select" option
                                                                ...(city?.map(obj => ({
                                                                    value: obj.PARAMCODE,
                                                                    label: obj.PARAMNAME,
                                                                })) || []),
                                                            ],
                                                            value: getInputfield.City,
                                                            defaultValue: '',
                                                            onChange: (value) => {
                                                                handleCommonChange('City', value);
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel " >Postal Code <Asterisk /></label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        name: 'PostalCode',
                                                        required: true,
                                                        disabled: location?.state?.ScreenFlag === '9',
                                                        value: getInputfield.PostalCode,
                                                        pattern: "^[0-9]+$",
                                                        maxLength: 6,
                                                        // onChange: (e) => {
                                                        //     let filteredValue = validateText(e.target.value, "[^0-9]");
                                                        //     handleCommonChange('AdvancedAmount', filteredValue);
                                                        //     // form.setFieldsValue({ 'AdvancedAmount': filteredValue })
                                                        // },
                                                        onChange: (e) => {
                                                            let filteredValue = validateText(e.target.value, "[^0-9]");
                                                            handleCommonChange('PostalCode', filteredValue);
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BANK DETAILS */}
                            <div className='box-title-card SubheaderModal'>
                                <p className='mb-0 box-title'>BANK DETAILS</p>
                            </div>
                            <div className='box-body'>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-md-8 mt-2">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6 col-md-6 mt-2">

                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label htmlFor="textarea" className="FormLabel">GST Registered <Asterisk /></label>
                                                    <SelectComp
                                                        props={{
                                                            mode: 'single',
                                                            size: 'medium',
                                                            style: { width: '100%' },
                                                            required: true,
                                                            readOnly: true,
                                                            disabled: location?.state?.ScreenFlag === '9',
                                                            message: 'Please Select GST Registered',
                                                            name: 'GSTReg',
                                                            options: [
                                                                { value: '', label: 'Select' }, // Default "Select" option
                                                                ...(getAssociationVendorDetails?.gstMaster?.map(obj => ({
                                                                    value: obj.paramcode,
                                                                    label: obj.paramname,
                                                                    paramsname: obj.paramsname
                                                                })) || []),
                                                            ],
                                                            value: getInputfield.GSTReg,
                                                            defaultValue: '',
                                                            onChange: (value, option) => {
                                                                handleCommonChange('GSTReg', value, option);
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {
                                                getParams == 'Y' ?
                                                    <div className="col-lg-6 col-md-6 mt-2">
                                                        <div className="FormStyle FormStyleError">
                                                            <label className={`FormLabel FormStyleError ${getParams === 'Y' &&
                                                                location?.state?.custtypeflag === 'A' &&
                                                                location?.state?.vendoR_ID &&
                                                                location?.state?.vendoR_ID !== "0" &&
                                                                parseInt(location?.state?.vendoR_ID) > 0 &&
                                                                bankData &&
                                                                bankData.length > 0 &&
                                                                bankData === "0" === '9' ? "disableLable" : ""}`}>GST Registered Number <Asterisk /></label>
                                                            <InputComp props={{
                                                                type: 'text',
                                                                size: 'medium',
                                                                name: 'GSTRegNo',
                                                                pattern: '^[a-zA-Z0-9]+$',
                                                                maxLength: 15,
                                                                required: true,
                                                                disabled:
                                                                    getParams === 'Y' &&
                                                                    location?.state?.custtypeflag === 'A' &&
                                                                    location?.state?.vendoR_ID &&
                                                                    location?.state?.vendoR_ID !== "0" &&
                                                                    parseInt(location?.state?.vendoR_ID) > 0 &&
                                                                    bankData &&
                                                                    bankData.length > 0 &&
                                                                    bankData === "0",
                                                                value: getInputfield.GSTRegNo,
                                                                onChange: (value) => {
                                                                    handleCommonChange('GSTRegNo', value.target.value);
                                                                },
                                                            }}
                                                            />
                                                        </div>
                                                    </div>
                                                    : <></>
                                            }


                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel FormStyleError" >Bank Name <Asterisk /></label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        size: 'medium',
                                                        required: true,
                                                        disabled: location?.state?.ScreenFlag === '9',
                                                        name: 'BankName',
                                                        value: getInputfield.BankName,
                                                        maxLength: 100,
                                                        // pattern: "^[a-zA-Z ]+$",
                                                        onChange: (e) => {
                                                            // let filteredValue = validateText(e.target.value, "[^a-zA-Z ]");
                                                            handleCommonChange('BankName', e.target.value);
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel FormStyleError" >Bank Key/Bank IFSC Code <Asterisk /></label>
                                                    <IfscCodeInput name='IFSCCode'
                                                        disabled={location?.state?.ScreenFlag === '9'}
                                                        readOnly={true}
                                                        required={true}
                                                        value={getInputfield.IFSCCode}
                                                        maxLength={15}
                                                        // pattern="^[a-zA-Z0-9]+$"
                                                        onChange={(value) => {
                                                            handleCommonChange('IFSCCode', value.target.value);
                                                        }}

                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel FormStyleError" >Bank Account Number <Asterisk /></label>
                                                    <BankAccountInput name='BankAccNumber'
                                                        pattern={location?.state?.ScreenFlag === '9' ? "" : "^[0-9]+$"}
                                                        disabled={location?.state?.ScreenFlag === '9'}
                                                        value={getInputfield.BankAccNumber}
                                                        required={true}
                                                        readOnly={true}
                                                        maxLength={18}
                                                        onChange={(e) => {
                                                            let filteredValue = validateText(e.target.value, "[^0-9]");
                                                            form.setFieldsValue({ 'BankAccNumber': filteredValue })
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel FormStyleError" >Account Holder Name <Asterisk /></label>
                                                    <InputComp props={{
                                                        type: 'text',
                                                        disabled: location?.state?.ScreenFlag === '9',
                                                        size: 'medium',
                                                        name: 'AccHldNumber',
                                                        maxLength: 60,
                                                        required: true,
                                                        value: getInputfield.AccHldNumber,
                                                        // pattern: "^[a-zA-Z ]+$",
                                                        pattern: "^[a-zA-Z0-9]+$",
                                                        onChange: (e) => {
                                                            let filteredValue = validateText(e.target.value, "[^a-zA-Z0-9 ]");
                                                            handleCommonChange('AccHldNumber', filteredValue);
                                                        },
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label className="FormLabel FormStyleError" >Pan Card Number <Asterisk /></label>
                                                    <PanCardInput name="panCardNo"
                                                        disabled={location?.state?.ScreenFlag === '9'}
                                                        value={getInputfield.panCardNo}
                                                        required={true}
                                                        maxLength={10}
                                                        onChange={(value) => {
                                                            handleCommonChange('panCardNo', value.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ATTACHMENTS DETAILS */}
                            <div className='box-title-card SubheaderModal'>
                                <p className='mb-0 box-title'>ATTACHMENTS</p>
                            </div>
                            <div className='box-body'>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-md-8 mt-2">
                                        <div className="row justify-content-center align-items-center">
                                            <div className="col-lg-6 col-md-6 my-3">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        Pan card Copy <Asterisk />
                                                    </div>
                                                    <div>
                                                        <Badge className="cursor" onClick={() => handleDocument('pancardcopy')} count={panCardCopyFileList?.length} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                        <div>
                                                            {/* <Button onClick={() => setIsModalVisible(true)}>Open File Upload Modal</Button> */}

                                                            <CommonEasUpload
                                                                readOnlyFlg={location?.state?.ScreenFlag === '9' ? 'readonly' : ''}
                                                                // readOnlyFlg='readonly'
                                                                isCameraModalVisible={isPancardCopyModelVisible}
                                                                setisCameraModalVisible={setIsPancardCopyModelVisible}
                                                                fileList={panCardCopyFileList} pageFlag={11}
                                                                setFileList={setPanCardCopyFileList}
                                                                acceptFiles={["pdf", "jpeg", "jpg", "png"]} // Customize allowed extensions
                                                                onCancel={onCancel}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 my-3">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        Cipla Agreement <Asterisk />
                                                    </div>
                                                    <div>
                                                        <Badge className="cursor" onClick={() => handleDocument('ciplaagreement')} count={ciplaAgreementFileList?.length} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                        <div>
                                                            <CommonEasUpload
                                                                readOnlyFlg={location?.state?.ScreenFlag === '9' ? 'readonly' : ''}
                                                                isCameraModalVisible={isCiplaAgreementModelVisible}
                                                                setisCameraModalVisible={setIsCiplaAgreementModelVisible}
                                                                fileList={ciplaAgreementFileList} pageFlag={11}
                                                                setFileList={setCiplaAgreementFileList}
                                                                acceptFiles={["pdf", "jpeg", "jpg", "png"]} // Customize allowed extensions
                                                                onCancel={onCancel}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {getParams == 'Y'
                                                ?
                                                (
                                                    <div className="col-lg-6 col-md-6 my-3">
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                GST Certificates <Asterisk />
                                                            </div>
                                                            <div>
                                                                <Badge className="cursor" onClick={() => handleDocument('gst')} count={gstCertificateFileList?.length} showZero>
                                                                    <MdOutlineAttachment className="fs-5" />
                                                                </Badge>
                                                                <div>
                                                                    <CommonEasUpload
                                                                        readOnlyFlg={location?.state?.ScreenFlag === '9' ? 'readonly' : ''}
                                                                        isCameraModalVisible={isGstCertificatesModalVisible}
                                                                        setisCameraModalVisible={setIsGstCertificatesModalVisible}
                                                                        fileList={gstCertificateFileList} pageFlag={11}
                                                                        setFileList={setGstCertificateFileList}
                                                                        acceptFiles={["pdf", "jpeg", "jpg", "png"]} // Customize allowed extensions
                                                                        onCancel={onCancel}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                getParams == 'N' ?
                                                    (

                                                        <div className="col-lg-6 col-md-6 my-3">
                                                            <div className="d-flex justify-content-between">
                                                                <div>
                                                                    GST Declaration <Asterisk />
                                                                </div>
                                                                <div>
                                                                    <Badge className="cursor" onClick={() => handleDocument('gstdeclaration')} count={gstDeclarationFileList?.length} showZero>
                                                                        <MdOutlineAttachment className="fs-5" />
                                                                    </Badge>
                                                                    <div>
                                                                        <CommonEasUpload
                                                                            readOnlyFlg={location?.state?.ScreenFlag === '9' ? 'readonly' : ''}
                                                                            isCameraModalVisible={isGstDeclarationModalVisible}
                                                                            setisCameraModalVisible={setIsGstDeclarationModalVisible}
                                                                            fileList={gstDeclarationFileList} pageFlag={11}
                                                                            setFileList={setGstDeclarationFileList}
                                                                            acceptFiles={["pdf", "jpeg", "jpg", "png"]} // Customize allowed extensions
                                                                            onCancel={onCancel}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    null
                                            }


                                            <div className="col-lg-6 col-md-6 my-3">
                                                <div className="d-flex justify-content-between">

                                                    <div>
                                                        Cancelled Cheque/Bank Letter  <Asterisk />
                                                    </div>
                                                    <div>
                                                        <Badge className="cursor" onClick={() => handleDocument('cancelcheque')} count={cancelledCheckFileList?.length} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                        <div>
                                                            <CommonEasUpload
                                                                readOnlyFlg={location?.state?.ScreenFlag === '9' ? 'readonly' : ''}
                                                                isCameraModalVisible={isCancelledCheckModalVisible}
                                                                setisCameraModalVisible={setIsCancelledCheckModalVisible}
                                                                fileList={cancelledCheckFileList} pageFlag={11}
                                                                setFileList={setCancelledCheckFileList}
                                                                acceptFiles={["pdf", "jpeg", "jpg", "png"]} // Customize allowed extensions
                                                                onCancel={onCancel}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 my-3">
                                                <div className="d-flex justify-content-between">

                                                    <div>
                                                        MSME Certificate <Asterisk />
                                                    </div>
                                                    <div>
                                                        <Badge className="cursor" onClick={() => handleDocument('msme')} count={msmeFileList?.length} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                        <div>
                                                            <CommonEasUpload
                                                                readOnlyFlg={location?.state?.ScreenFlag === '9' ? 'readonly' : ''}
                                                                isCameraModalVisible={isMsmeModalVisible}
                                                                setisCameraModalVisible={setIsMsmeModalVisible}
                                                                fileList={msmeFileList} pageFlag={11}
                                                                setFileList={setMsmeFileList}
                                                                acceptFiles={["pdf", "jpeg", "jpg", "png"]} // Customize allowed extensions
                                                                onCancel={onCancel}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 my-3">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        Vendor Declaration
                                                    </div>
                                                    <div>
                                                        <Badge className="cursor" onClick={() => handleDocument('venderdeclaration')} count={vendorDeclarationFileList?.length} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                        <div>
                                                            <CommonEasUpload
                                                                readOnlyFlg={location?.state?.ScreenFlag === '9' ? 'readonly' : ''}
                                                                isCameraModalVisible={isVendorDeclarationModalVisible}
                                                                setisCameraModalVisible={setIsVendorDeclarationModalVisible}
                                                                fileList={vendorDeclarationFileList} pageFlag={11}
                                                                setFileList={setVendorDeclarationFileList}
                                                                acceptFiles={["pdf", "jpeg", "jpg", "png"]} // Customize allowed extensions
                                                                onCancel={onCancel}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 my-2">
                                                <div className={`FormStyle FormStyleError ${location?.state?.ScreenFlag === '9' ? "disableLable" : ""}`}>
                                                    <label htmlFor="textarea" className="FormLabel">Address Proof <Asterisk /></label>
                                                    <SelectComp
                                                        props={{
                                                            mode: 'single',
                                                            size: 'medium',
                                                            style: { width: '100%' },
                                                            required: true,
                                                            message: 'Please Select Address Proof',
                                                            name: 'addressproof',
                                                            disabled: location?.state?.ScreenFlag === '9',
                                                            options: [
                                                                { value: '', label: 'Select' }, // Default "Select" option
                                                                ...(getAssociationVendorDetails?.addressProofMaster?.map(obj => ({
                                                                    value: obj.paramcode,
                                                                    label: obj.paramname,
                                                                })) || []),
                                                            ],
                                                            value: getInputfield.addressproof,
                                                            defaultValue: '',
                                                            onChange: (value) => {
                                                                handleCommonChange('addressproof', value);
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 my-2">
                                                <div className="d-flex justify-content-between mt-3">
                                                    <div>
                                                        Address Proof Copy  <Asterisk />
                                                    </div>
                                                    <div>
                                                        <Badge className="cursor" onClick={() => handleDocument('addressproof')} count={addressProofFileList?.length} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                        <div>
                                                            <CommonEasUpload
                                                                readOnlyFlg={location?.state?.ScreenFlag === '9' ? 'readonly' : ''}
                                                                isCameraModalVisible={isAddressProofModalVisible}
                                                                setisCameraModalVisible={setIsAddressProofModalVisible}
                                                                fileList={addressProofFileList} pageFlag={11}
                                                                setFileList={setAddressProofFileList}
                                                                acceptFiles={["pdf", "jpeg", "jpg", "png"]} // Customize allowed extensions
                                                                onCancel={onCancel}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 my-2"></div>
                                        </div>
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


AssociationModal.propTypes = {
    openAssVendor: PropTypes.object,
    cancelAssVendorModal: PropTypes.func,
    SaveAssociateContract: PropTypes.func
};