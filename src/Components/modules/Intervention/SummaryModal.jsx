import { Badge, Form, Modal } from "antd"
import { useEffect, useState } from "react";
import { GetVendorDetail } from "../../../api/EasApi";
import { useMutation } from "@tanstack/react-query";
import ModalLoader from "../../common/ModalLoader";
import { MdOutlineAttachment } from "react-icons/md";
import { CommonEasUpload } from "./CommonEasUpload";
import PropTypes from 'prop-types';  // Import PropTypes after installation
import FormSkeletonModal from "../../skeletons/FormSkeletonModal";
import SummaryModalSkeleton from "../../skeletons/SummaryModalSkeleton";


export const SummaryModal = (props) => {
    //const location = useLocation();
    //const dispatch = useDispatch(); // Call useDispatch at the top level
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([])
    const [vendorDetails, setVendorDetails] = useState(null)
    const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
    useEffect(() => {
        if (props.sepakerRecord) {
            getAssociationVendorDetails(props.sepakerRecord)
        }
    }, [props])
    const { mutate: getAssociationVendorDetails, isLoading: getAssociationVendorDetailsFetching } = useMutation(
        (data) => GetVendorDetail({
            intvId: props.location?.intvId,
            reqId: props.location?.IntvReqId,
            pcode: data?.pcode,
            Vendorid: data?.vendoR_ID,
            ScreenFlag: '1',
            entryno: data?.entryno,
            custtypeflg: data?.custtypeflag,
        }), // The mutation function
        {
            onSuccess: (data) => {
                const dataList = data?.data?.resultSet
                if (dataList !== null) {
                    setVendorDetails(dataList)
                }
            },
            onError: (error) => {
                console.error('Error fetching obligation data:', error);
            },
        }
    );

    // const handleDocument = (record) => {
    //     if (record === 'VisitingCopy') {
    //         setIsCameraModalVisible(true);
    //         if (Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails?.attchmntdata[0]?.pancarD_URL) {
    //             const fileNames = vendorDetails?.attchmntdata[0]?.visitinG_CARD_NAME?.split(',') || [];
    //             const fileUrls = vendorDetails?.attchmntdata[0]?.visitinG_CARD_URL?.split(',') || [];

    //             if (fileNames.length === fileUrls.length) {
    //                 setFileList(
    //                     fileNames.map((name, index) => ({
    //                         filename: name,
    //                         imG_URL: fileUrls[index],
    //                         flag: 'uploaded',
    //                     }))
    //                 );
    //             }
    //         }
    //     }
    //     else if (record === 'pancardcopy') {
    //         if (Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails?.attchmntdata[0]?.pancarD_URL) {
    //             const fileNames = vendorDetails?.attchmntdata[0]?.pancarD_NAME?.split(',') || [];
    //             const fileUrls = vendorDetails?.attchmntdata[0]?.pancarD_URL?.split(',') || [];

    //             if (fileNames.length === fileUrls.length) {
    //                 setFileList(
    //                     fileNames.map((name, index) => ({
    //                         filename: name,
    //                         imG_URL: fileUrls[index],
    //                         flag: 'uploaded',
    //                     }))
    //                 );
    //             }
    //         }
    //         setIsCameraModalVisible(true);
    //     }
    //     else if (record === 'ciplaagreement') {
    //         setIsCameraModalVisible(true);
    //         if (Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails?.attchmntdata[0]?.ciplaagreemenT_URL) {
    //             const fileNames = vendorDetails?.attchmntdata[0]?.ciplaagreemenT_NAME?.split(',') || [];
    //             const fileUrls = vendorDetails?.attchmntdata[0]?.ciplaagreemenT_URL?.split(',') || [];

    //             if (fileNames.length === fileUrls.length) {
    //                 setFileList(
    //                     fileNames.map((name, index) => ({
    //                         filename: name,
    //                         imG_URL: fileUrls[index],
    //                         flag: 'uploaded',
    //                     }))
    //                 );
    //             }
    //         }
    //     }
    //     else if (record === 'gst') {
    //         setIsCameraModalVisible(true);
    //         if (Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails?.attchmntdata[0]?.gsT_CERTIFICATE_URL) {
    //             const fileNames = vendorDetails?.attchmntdata[0]?.gsT_CERTIFICATE_NAME?.split(',') || [];
    //             const fileUrls = vendorDetails?.attchmntdata[0]?.gsT_CERTIFICATE_URL?.split(',') || [];

    //             if (fileNames.length === fileUrls.length) {
    //                 setFileList(
    //                     fileNames.map((name, index) => ({
    //                         filename: name,
    //                         imG_URL: fileUrls[index],
    //                         flag: 'uploaded',
    //                     }))
    //                 );
    //             }
    //         }
    //     }
    //     else if (record === 'cancelcheque') {
    //         setIsCameraModalVisible(true);
    //         if (Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails?.attchmntdata[0]?.chequE_URL) {
    //             const fileNames = vendorDetails?.attchmntdata[0]?.chequE_NAME?.split(',') || [];
    //             const fileUrls = vendorDetails?.attchmntdata[0]?.chequE_URL?.split(',') || [];

    //             if (fileNames.length === fileUrls.length) {
    //                 setFileList(
    //                     fileNames.map((name, index) => ({
    //                         filename: name,
    //                         imG_URL: fileUrls[index],
    //                         flag: 'uploaded',
    //                     }))
    //                 );
    //             }
    //         }
    //     }
    //     else if (record === 'CVCopy') {
    //         setIsCameraModalVisible(true);
    //         if (Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails?.attchmntdata[0]?.cV_COPY_URL) {
    //             const fileNames = vendorDetails?.attchmntdata[0]?.cV_COPY_NAME?.split(',') || [];
    //             const fileUrls = vendorDetails?.attchmntdata[0]?.cV_COPY_URL?.split(',') || [];

    //             if (fileNames.length === fileUrls.length) {
    //                 setFileList(
    //                     fileNames.map((name, index) => ({
    //                         filename: name,
    //                         imG_URL: fileUrls[index],
    //                         flag: 'uploaded',
    //                     }))
    //                 );
    //             }
    //         }
    //     }
    //     else if (record === 'venderdeclaration') {
    //         setIsCameraModalVisible(true);
    //         if (Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails?.attchmntdata[0]?.vendoR_DECLARATION_URL) {
    //             const fileNames = vendorDetails?.attchmntdata[0]?.vendoR_DECLARATION_NAME?.split(',') || [];
    //             const fileUrls = vendorDetails?.attchmntdata[0]?.vendoR_DECLARATION_URL?.split(',') || [];

    //             if (fileNames.length === fileUrls.length) {
    //                 setFileList(
    //                     fileNames.map((name, index) => ({
    //                         filename: name,
    //                         imG_URL: fileUrls[index],
    //                         flag: 'uploaded',
    //                     }))
    //                 );
    //             }
    //         }
    //     }
    //     else if (record === 'addressproof') {
    //         setIsCameraModalVisible(true);
    //         if (Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails?.attchmntdata[0]?.addrprooF_URL) {
    //             const fileNames = vendorDetails?.attchmntdata[0]?.addrprooF_NAME?.split(',') || [];
    //             const fileUrls = vendorDetails?.attchmntdata[0]?.addrprooF_URL?.split(',') || [];

    //             if (fileNames.length === fileUrls.length) {
    //                 setFileList(
    //                     fileNames.map((name, index) => ({
    //                         filename: name,
    //                         imG_URL: fileUrls[index],
    //                         flag: 'uploaded',
    //                     }))
    //                 );
    //             }
    //         }
    //     }
    //     else if (record === 'MsMeCertificate') {
    //         setIsCameraModalVisible(true);
    //         if (Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails?.attchmntdata[0]?.msmE_URL) {
    //             const fileNames = vendorDetails?.attchmntdata[0]?.msmE_NAME?.split(',') || [];
    //             const fileUrls = vendorDetails?.attchmntdata[0]?.msmE_URL?.split(',') || [];

    //             if (fileNames.length === fileUrls.length) {
    //                 setFileList(
    //                     fileNames.map((name, index) => ({
    //                         filename: name,
    //                         imG_URL: fileUrls[index],
    //                         flag: 'uploaded',
    //                     }))
    //                 );
    //             }
    //         }
    //     }
    //     else if (record === 'GSTDecleration') {
    //         setIsCameraModalVisible(true);
    //         if (Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails?.attchmntdata[0]?.gsT_DECLARATION_URL) {
    //             const fileNames = vendorDetails?.attchmntdata[0]?.gsT_DECLARATION_NAME?.split(',') || [];
    //             const fileUrls = vendorDetails?.attchmntdata[0]?.gsT_DECLARATION_URL?.split(',') || [];

    //             if (fileNames.length === fileUrls.length) {
    //                 setFileList(
    //                     fileNames.map((name, index) => ({
    //                         filename: name,
    //                         imG_URL: fileUrls[index],
    //                         flag: 'uploaded',
    //                     }))
    //                 );
    //             }
    //         }
    //     }
    // }

    const handleDocument = (record) => {
        const handleAttachment = (nameKey, urlKey) => {
            if (
                Array.isArray(vendorDetails?.attchmntdata) &&
                vendorDetails.attchmntdata.length > 0 &&
                vendorDetails?.attchmntdata[0]?.[urlKey]
            ) {
                const fileNames = vendorDetails?.attchmntdata[0]?.[nameKey]?.split(',') || [];
                const fileUrls = vendorDetails?.attchmntdata[0]?.[urlKey]?.split(',') || [];

                if (fileNames.length === fileUrls.length) {
                    setFileList(
                        fileNames.map((name, index) => ({
                            filename: name,
                            imG_URL: fileUrls[index],
                            flag: 'uploaded',
                        }))
                    );
                }
            }
        };

        setIsCameraModalVisible(true);

        switch (record) {
            case 'VisitingCopy':
                handleAttachment('visitinG_CARD_NAME', 'visitinG_CARD_URL');
                break;
            case 'pancardcopy':
                handleAttachment('pancarD_NAME', 'pancarD_URL');
                break;
            case 'ciplaagreement':
                handleAttachment('ciplaagreemenT_NAME', 'ciplaagreemenT_URL');
                break;
            case 'gst':
                handleAttachment('gsT_CERTIFICATE_NAME', 'gsT_CERTIFICATE_URL');
                break;
            case 'cancelcheque':
                handleAttachment('chequE_NAME', 'chequE_URL');
                break;
            case 'CVCopy':
                handleAttachment('cV_COPY_NAME', 'cV_COPY_URL');
                break;
            case 'venderdeclaration':
                handleAttachment('vendoR_DECLARATION_NAME', 'vendoR_DECLARATION_URL');
                break;
            case 'addressproof':
                handleAttachment('addrprooF_NAME', 'addrprooF_URL');
                break;
            case 'MsMeCertificate':
                handleAttachment('msmE_NAME', 'msmE_URL');
                break;
            case 'GSTDecleration':
                handleAttachment('gsT_DECLARATION_NAME', 'gsT_DECLARATION_URL');
                break;
            default:
                console.warn('Unsupported record type:', record);
        }
    };

    return (
        <Modal open={props?.openSummary} onCancel={props.cancelSummaryModal}
            className='paddingZeromodal colorHeadermodal p-0' centered
            width={700}
            title="Vendor"
            footer={false}>
            {/* {getAssociationVendorDetailsFetching && (<ModalLoader />)} */}
            <main>
                <Form form={form}>
                    <div className='EasmBodyHeight'>
                        {(getAssociationVendorDetailsFetching) ? (
                            <SummaryModalSkeleton showArry={8} />
                        ) : (
                            <div>
                                {/* <div className="boxcard mb-3"> */}
                                <div className='box-title-card SubheaderModal'>
                                    <p className='mb-0 box-title'>VENDOR DETAILS</p>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 col-md-10">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6 col-md-6 my-2">
                                                <div>Title</div>
                                                <div className="fw-bold">
                                                    {(Array.isArray(vendorDetails?.vendordt) && vendorDetails.vendordt[0]?.titlename) ?? '-'}
                                                    {/* {vendorDetails?.vendordt[0]?.titlename} */}
                                                </div>

                                            </div>
                                            <div className="col-lg-6 col-md-6 my-2">
                                                <div>Vendor Name As Per PAN Card</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.vendordt[0]?.vendoR_NAME} */}

                                                    {(Array.isArray(vendorDetails?.vendordt) && vendorDetails.vendordt[0]?.vendoR_NAME) ?? '-'}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* address details */}
                                <div className='box-title-card SubheaderModal'>
                                    <p className='mb-0 box-title'>ADDRESS DETAILS</p>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 col-md-10 mt-2">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>Address Line 1</div>
                                                <div className="fw-bold">
                                                    {(Array.isArray(vendorDetails?.addressdata) && vendorDetails.addressdata[0]?.street) ?? '-'}
                                                    {/* {vendorDetails?.addressdata[0]?.address ? vendorDetails?.addressdata[0]?.address : "-"} */}
                                                </div>

                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>Address Line 2</div>
                                                <div className="fw-bold">
                                                    {(Array.isArray(vendorDetails?.addressdata) && vendorDetails.addressdata[0]?.streeT2) ?? '-'}

                                                    {/* {vendorDetails?.addressdata[0]?.streeT2 ? vendorDetails?.addressdata[0]?.streeT2 : "-"} */}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>Address Line 3</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.addressdata[0]?.streeT3 ? vendorDetails?.addressdata[0]?.streeT3 : "-"} */}
                                                    {(Array.isArray(vendorDetails?.addressdata) && vendorDetails.addressdata[0]?.streeT3) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>District</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.addressdata[0]?.district ? vendorDetails?.addressdata[0]?.district : "-"} */}
                                                    {(Array.isArray(vendorDetails?.addressdata) && vendorDetails.addressdata[0]?.district) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>Region/State</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.addressdata[0]?.statename ? vendorDetails?.addressdata[0]?.statename : "-"} */}
                                                    {(Array.isArray(vendorDetails?.addressdata) && vendorDetails.addressdata[0]?.statename) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>City</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.addressdata[0]?.cityname ? vendorDetails?.addressdata[0]?.cityname : "-"} */}

                                                    {(Array.isArray(vendorDetails?.addressdata) && vendorDetails.addressdata[0]?.cityname) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2 mb-2">
                                                <div>Postal Code</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.addressdata[0]?.postaL_CODE ? vendorDetails?.addressdata[0]?.postaL_CODE : "-"} */}
                                                    {(Array.isArray(vendorDetails?.addressdata) && vendorDetails.addressdata[0]?.postaL_CODE) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* address details */}
                                <div className='box-title-card SubheaderModal'>
                                    <p className='mb-0 box-title'>BANK DETAILS</p>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 col-md-10 mt-2">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>GST Registered</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.bankdata[0]?.gsT_REGISTEREDNAME ? vendorDetails?.bankdata[0]?.gsT_REGISTEREDNAME : "-"} */}
                                                    {(Array.isArray(vendorDetails?.bankdata) && vendorDetails.bankdata[0]?.gsT_REGISTEREDNAME) ?? '-'}

                                                </div>

                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>GST Registered Number</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.bankdata[0]?.gstin ? vendorDetails?.bankdata[0]?.gstin : "-"} */}
                                                    {(Array.isArray(vendorDetails?.bankdata) && vendorDetails.bankdata[0]?.gstin) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>Bank Name</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.bankdata[0]?.bank ? vendorDetails?.bankdata[0]?.bank : "-"} */}
                                                    {(Array.isArray(vendorDetails?.bankdata) && vendorDetails.bankdata[0]?.bank) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>Bank Key/Bank IFSC Code</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.bankdata[0]?.ifsc ? vendorDetails?.bankdata[0]?.ifsc : "-"} */}
                                                    {(Array.isArray(vendorDetails?.bankdata) && vendorDetails.bankdata[0]?.ifsc) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>Bank Account Number</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.bankdata[0]?.accounT_NUM ? vendorDetails?.bankdata[0]?.accounT_NUM : "-"} */}
                                                    {(Array.isArray(vendorDetails?.bankdata) && vendorDetails.bankdata[0]?.accounT_NUM) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                                <div>Account Holder Name</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.bankdata[0]?.holdeR_NAME ? vendorDetails?.bankdata[0]?.holdeR_NAME : "-"} */}
                                                    {(Array.isArray(vendorDetails?.bankdata) && vendorDetails.bankdata[0]?.holdeR_NAME) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2 mb-2">
                                                <div>PAN Card Number</div>
                                                <div className="fw-bold">
                                                    {/* {vendorDetails?.bankdata[0]?.pancard ? vendorDetails?.bankdata[0]?.pancard : "-"} */}
                                                    {(Array.isArray(vendorDetails?.bankdata) && vendorDetails.bankdata[0]?.pancard) ?? '-'}

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mt-2">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='box-title-card SubheaderModal'>
                                    <p className='mb-0 box-title'>ATTACHMENTS</p>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 col-md-10">
                                        <div className="row justify-content-center">
                                            {Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails.attchmntdata[0]?.pancarD_NAME && (

                                                <div className="col-lg-6 col-md-6 my-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>PAN Card Copy *</div>
                                                        <Badge className="cursor" onClick={() => handleDocument("pancardcopy")} count={vendorDetails?.attchmntdata[0]?.pancarD_NAME?.split(',')?.length || 0} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )}

                                            {/* {
                                            vendorDetails?.attchmntdata[0]?.visitinG_CARD_NAME !== null && ( */}
                                            {Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails.attchmntdata[0]?.visitinG_CARD_NAME && (
                                                <div className="col-lg-6 col-md-6 my-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>Visiting Card *</div>
                                                        <Badge className="cursor" onClick={() => handleDocument("VisitingCopy")} count={vendorDetails?.attchmntdata[0]?.visitinG_CARD_NAME?.split(',')?.length || 0} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                        {/* <MdOutlineAttachment className="fs-5" onClick={() => handleDocument("VisitingCopy")} /> */}
                                                    </div>
                                                </div>
                                            )}
                                            {/* {
                                            vendorDetails?.attchmntdata[0]?.gsT_CERTIFICATE_NAME !== null && ( */}
                                            {Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails.attchmntdata[0]?.gsT_CERTIFICATE_NAME && (

                                                <div className="col-lg-6 col-md-6 my-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>GST Certificates *</div>
                                                        {/* <MdOutlineAttachment className="fs-5" onClick={() => handleDocument("gst")} /> */}
                                                        <Badge className="cursor" onClick={() => handleDocument("gst")} count={vendorDetails?.attchmntdata[0]?.gsT_CERTIFICATE_NAME?.split(',')?.length || 0} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )
                                            }
                                            {/* {
                                            vendorDetails?.attchmntdata[0]?.gsT_DECLARATION_NAME !== null && ( */}
                                            {Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails.attchmntdata[0]?.gsT_DECLARATION_NAME && (

                                                <div className="col-lg-6 col-md-6 my-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>GST Decleration *</div>
                                                        {/* <MdOutlineAttachment className="fs-5" onClick={() => handleDocument("venderdeclaration")} /> */}
                                                        <Badge className="cursor" onClick={() => handleDocument("GSTDecleration")} count={vendorDetails?.attchmntdata[0]?.vendoR_DECLARATION_NAME?.split(',')?.length || 0} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )

                                            }
                                            {/* {
                                            vendorDetails?.attchmntdata[0]?.chequE_NAME !== null && ( */}
                                            {Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails.attchmntdata[0]?.chequE_NAME && (

                                                <div className="col-lg-6 col-md-6 my-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>Cancelled Cheque/Bank Letter *</div>
                                                        <Badge className="cursor" onClick={() => handleDocument("cancelcheque")} count={vendorDetails?.attchmntdata[0]?.chequE_NAME?.split(',')?.length || 0} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                        {/* <MdOutlineAttachment className="fs-5" onClick={() => handleDocument("cancelcheque")} /> */}
                                                    </div>
                                                </div>
                                            )}
                                            {/* {
                                            vendorDetails?.attchmntdata[0]?.cV_COPY_NAME !== null && ( */}
                                            {Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails.attchmntdata[0]?.cV_COPY_NAME && (

                                                <div className="col-lg-6 col-md-6 my-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>CV Copy *</div>
                                                        {/* <MdOutlineAttachment className="fs-5" onClick={() => handleDocument("CVCopy")} /> */}
                                                        <Badge className="cursor" onClick={() => handleDocument("CVCopy")} count={vendorDetails?.attchmntdata[0]?.cV_COPY_NAME?.split(',')?.length || 0} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )}
                                            {/* {
                                            vendorDetails?.attchmntdata[0]?.vendoR_DECLARATION_NAME !== null && ( */}
                                            {Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails.attchmntdata[0]?.vendoR_DECLARATION_NAME && (

                                                <div className="col-lg-6 col-md-6 my-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>Vendor Declaration</div>
                                                        {/* <MdOutlineAttachment className="fs-5" onClick={() => handleDocument("venderdeclaration")} /> */}
                                                        <Badge className="cursor" onClick={() => handleDocument("venderdeclaration")} count={vendorDetails?.attchmntdata[0]?.vendoR_DECLARATION_NAME?.split(',')?.length || 0} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )}
                                            {/* {
                                            vendorDetails?.attchmntdata[0]?.ciplaagreemenT_NAME !== null && ( */}
                                            {Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails.attchmntdata[0]?.ciplaagreemenT_NAME && (

                                                <div className="col-lg-6 col-md-6 my-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>Cipla Agreement</div>
                                                        {/* <MdOutlineAttachment className="fs-5" onClick={() => handleDocument("venderdeclaration")} /> */}
                                                        <Badge className="cursor" onClick={() => handleDocument("CiplaAgreement")} count={vendorDetails?.attchmntdata[0]?.ciplaagreemenT_NAME?.split(',')?.length || 0} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )}
                                            {/* {
                                            vendorDetails?.attchmntdata[0]?.msmE_NAME !== null && ( */}
                                            {Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails.attchmntdata[0]?.msmE_NAME && (

                                                <div className="col-lg-6 col-md-6 my-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>MSME Certificate</div>
                                                        {/* <MdOutlineAttachment className="fs-5" onClick={() => handleDocument("venderdeclaration")} /> */}
                                                        <Badge className="cursor" onClick={() => handleDocument("MsMeCertificate")} count={vendorDetails?.attchmntdata[0]?.msmE_NAME?.split(',')?.length || 0} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )}

                                            {/* {
                                            vendorDetails?.attchmntdata[0]?.addrproofname !== null && ( */}
                                            {Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata.length > 0 && vendorDetails.attchmntdata[0]?.addrproofname && (

                                                <div className="col-lg-6 col-md-6 my-3">
                                                    <div className="d-flex justify-content-between">
                                                        <div>Address Proof Copy</div>
                                                        {/* <MdOutlineAttachment className="fs-5" onClick={() => handleDocument("addressproof")} /> */}
                                                        <Badge className="cursor" onClick={() => handleDocument("addressproof")} count={vendorDetails?.attchmntdata[0]?.addrproofname?.split(',')?.length || 0} showZero>
                                                            <MdOutlineAttachment className="fs-5" />
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="col-lg-6 col-md-6 mb-3 mt-1">
                                                {/* <div className="d-flex justify-content-between"> */}
                                                <div>Address Proof</div>
                                                <div className="fw-bold">
                                                    {(Array.isArray(vendorDetails?.attchmntdata) && vendorDetails.attchmntdata[0]?.addrproofname) ?? '-'}
                                                </div>
                                                {/* </div> */}
                                            </div>
                                            <div className="col-md-6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* </div> */}
                </Form>
            </main>



            <CommonEasUpload
                multiple={false}
                isCameraModalVisible={isCameraModalVisible}
                setisCameraModalVisible={setIsCameraModalVisible}
                fileList={fileList} setFileList={setFileList}
                acceptFiles={['jpg', 'jpeg', 'png', 'pdf']} pageFlag={2}
                // limit={parseInt(fetchPreDocList?.[0]?.IMGCOUNT, 2) || 0}
                fileSize={10485760}
                onOk={false}
                onCancel={false}
                readOnlyFlg={"readonly"}
            />
        </Modal>
    )
}

SummaryModal.propTypes = {
    sepakerRecord: PropTypes.object,
    openSummary: PropTypes.object,
    cancelSummaryModal: PropTypes.func,
    location: PropTypes.object
};