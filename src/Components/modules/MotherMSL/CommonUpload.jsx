import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Upload, List } from 'antd';
import PropTypes from 'prop-types';
import excelImg from '../../../assets/images/excelImage1.png';
import pdfImg from '../../../assets/images/pdficon.jpg';
import img1 from '../../../assets/images/img_placeholder.png';
import { DeleteFilled, DownloadOutlined } from "@ant-design/icons";
import { BlobUploadData, CommonBlobDetails, UploadSasWise } from "../../../api/CommonMethodsApi";
import { userSession } from "../../../constants/UserConstant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { messageSerivce } from "../../../api/CommonApi";
import { useDispatch } from "react-redux";
import ModalLoader from "../../common/ModalLoader";
import { PDFViewer } from "../../common/CommonPdfViewer";
import { confirmMessage, generateFileName, monthNames } from "../../../utils/common";

export const CommonUpload = (props) => {
    const userData = userSession.userData;
    const { fileList, setisCameraModalVisible, onOk, onCancel,
        isCameraModalVisible, limit, containerName, readOnlyFlg,
        setFileList, acceptFiles, fileSize, multiple, pageFlag,
    } = props

    const dispatch = useDispatch();
    const { confirm } = Modal;
    const [previewImage, setPreviewImage] = useState("");
    const [pdfViewer, setPdfViewer] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [sasWiseUpload, setSasWiseUpload] = useState(0);
    const [originBlob, setOriginBlob] = useState("");
    const fileObjRef = useRef(null);

    const { data: getBolbData = [], isFetching: isgetBolbDataFetch } = useQuery({
        queryKey: ['getBolbData', pageFlag],
        queryFn: () => CommonBlobDetails(pageFlag),
        select: (response) => {
            if (response.data?.resultSet != null) {
                return response.data.resultSet?.bolbDetails;
            }
        },
        onSuccess: (response) => {
            setSasWiseUpload(response[0]?.AUTH_TYPE);
            let tempstr = '';
            let fullStr = response?.[0]?.BASE_URL || '';
            if (response?.[0]?.PRIORITY_STR) {
                const prioritySeq = response[0]?.PRIORITY_STR.split('-');
                for (const seq of prioritySeq) {
                    switch (seq) {
                        case 'C':
                            tempstr += (response[0]?.CLIENT_ID == '0' ? `${userData.CLIENTID?.toLowerCase()}/` : '');
                            break;
                        case 'CN':
                            tempstr += `${response[0]?.CONTAINER_NAME}/`;
                            break;
                        case 'Y':
                            tempstr += (response[0]?.YEAR_FLAG == '0' ? `${new Date().getFullYear()}/` : '');
                            break;
                        case 'M':
                            tempstr += (response[0]?.MONTH_FLAG === '0' ? `${monthNames[new Date().getMonth()]}/` : '');
                            break;
                        case 'D': {
                            let currentDate = new Date().getDate();
                            let formattedDate = currentDate < 10 ? `0${currentDate}` : `${currentDate}`;
                            let datePart = response[0]?.DATE_FLAG == '0' ? `${formattedDate}/` : '';
                            tempstr += datePart;
                            break;
                        }
                        case 'MY': {
                            let currentMonth = new Date().getMonth() + 1;
                            let formattedMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
                            let year = new Date().getFullYear();
                            let monthYearPart = response[0]?.MNTHYR_FLAG == '0' ? `${formattedMonth}${year}/` : '';
                            tempstr += monthYearPart;
                            break;
                        }
                        case 'R':
                            tempstr += (response[0]?.REPCODE_FLAG == '0' ? `${userData.REPCODE}/` : '');
                            break;
                        default:
                            break;
                    }
                }
                fullStr += tempstr;
                if (props.manualUrl && props.manualUrl.current !== undefined) {
                    props.manualUrl.current = fullStr;
                }
                else {
                    setOriginBlob(fullStr);
                }
            }
        }
    });

    const { mutate: UploadData, isLoading: UploadFetching } = useMutation({
        mutationFn: (params) => BlobUploadData(params),
        onSuccess: (response, params) => {
            let { FileData } = params
            let resData = response?.data?.resultSet;
            setFileList((prevFileList) => [
                ...prevFileList,
                {
                    filename: resData?.originFile,
                    imG_URL: resData?.fileName,
                    flag: 'uploaded',
                    ...FileData
                }
            ]);
        }
    });

    const { mutate: SasWiseUpload, isLoading: SasWiseUploadFetching } = useMutation({
        mutationFn: (params) => UploadSasWise(params),
        onSuccess: (response, params) => {
            let { FileData } = params
            let resData = response?.data?.resultSet;
            if (resData && resData?.resultSet == 1) {
                setFileList((prevFileList) => [
                    ...(Array.isArray(prevFileList) ? prevFileList : []),
                    {
                        filename: params?.originFile,
                        imG_URL: params?.Filename,
                        flag: 'uploaded',
                        ...FileData
                    }
                ]);
            }
            else {
                dispatch(messageSerivce({ messageType: 'error', messageContent: 'Failed To Upload' }));
            }
        }
    });

    const handleDownload = async () => {
        try {
            if (fileObjRef.current) {
                let fileUrl = `${originBlob}${fileObjRef.current.imG_URL}`;
                const filename = fileObjRef.current.filename;

                const response = await fetch(fileUrl);
                if (!response.ok) {
                    throw new Error("Failed To Fetch The File From The Server.");
                }
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
            }
            else {
                confirmMessage({ title: 'Please Select Image To Download' })
            }
        }
        catch (error) {
            confirmMessage({ title: 'Failed To Download The File.' })
        }
    }

    useEffect(() => {
        if (!!isCameraModalVisible && fileList?.length == 1) {
            handlePreview(fileWiseImage(`${originBlob}${fileList[0]?.imG_URL}`));
        }
    }, [isCameraModalVisible]);

    useEffect(() => {
        if (fileList?.length > 0) {
            handlePreview(props?.fileList[0])
        }
    }, []);

    const formatvalidation = (val) => {
        const extensions = acceptFiles.map(ext => ext.replace('.', ''));
        const regex = new RegExp(`\\.(${extensions.join('|')})$`, 'i');
        return regex.test(val);
    }

    const handleFileChange = async (info) => {
        const file = info.file;

        if ((limit && info?.fileList?.length <= limit) || !limit) {
            if ((file.size <= fileSize) || !fileSize) {
                if (formatvalidation(file?.name)) {
                    await handleUploadCustomRequest(file);
                }
                else {
                    dispatch(messageSerivce({ messageType: "error", messageContent: `This File Format Is Not Allowed` })) //'This File Format Is Not Allowed'
                }
            }
            else {
                dispatch(messageSerivce({ messageType: 'error', messageContent: 'Please Upload File Upto 5 MB' }));
            }
        }
        else {
            dispatch(messageSerivce({ messageType: 'error', messageContent: `You Can Upload Only ${limit} files` }))
        }
    };

    const handleUploadCustomRequest = async (options) => {
        const fileExtension = options?.name?.split('.')?.pop()?.toLowerCase();
        let generatedFileName = generateFileName(fileExtension, props?.pageFlag, props?.fileNameStr || "");
        let filesObj = {
            BlobUrl: getBolbData[0]?.BASE_URL,
            Filename: generatedFileName,
            originFile: options?.name,
            container: containerName || `${getBolbData[0]?.CONTAINER_NAME}/`,
            SasToken: getBolbData[0]?.BLOB_CON_STRING,
            FileData: {
                originFileObj: options
            }
        }
        if (sasWiseUpload == 1) {
            const sasblobUrlData = `${originBlob}${generatedFileName}${getBolbData[0]?.BLOB_SAS_TOKEN}`;
            SasWiseUpload({ ...filesObj, BlobUrl: sasblobUrlData });
        }
        else {
            UploadData(filesObj)
        }
    }

    const handleOk = () => {
        if (onOk) {
            onOk();
        }
        setisCameraModalVisible(false);
        setPreviewImage(null);
    }

    const handlePreview = (file) => {
        debugger;
        let fileUrl = `${originBlob}${file?.imG_URL}`;
        const fileExtension = fileUrl?.split('.')?.pop()?.toLowerCase();
        if (acceptFiles.includes(fileExtension)) {
            if (fileExtension?.toLowerCase() == 'jpeg' || fileExtension?.toLowerCase() == 'jpg' || fileExtension?.toLowerCase() == 'bmp' || fileExtension?.toLowerCase() == 'png' || fileExtension?.toLowerCase() == 'gif') {
                setPreviewImage(fileUrl);
            }
            if (fileExtension?.toLowerCase() == 'xls' || fileExtension?.toLowerCase() == 'xlsx' || fileExtension?.toLowerCase() == 'xlsb' || fileExtension?.toLowerCase() == 'csv') {
                setPreviewImage(excelImg);
            }
            if (fileExtension?.toLowerCase() == 'pdf') {
                setPreviewImage(pdfImg);
            }
            fileObjRef.current = file;
        } else {
            setPreviewImage(null);
            fileObjRef.current = null;
        }
    };

    const handleDeleteFile = (fileIndex) => {
        confirm({
            title: `Are You Sure You Want To Delete This File?`,
            centered: true,
            okText: 'YES',
            cancelText: 'NO',
            width: 400,
            icon: null,
            onOk() {
                let updatedFiles = fileList.filter((_, index) => index != fileIndex)
                setFileList(updatedFiles);
                setPreviewImage(null);
            }
        });
    }

    const fileWiseImage = (file) => {
        const fileExtension = file?.split('.')?.pop()?.toLowerCase();
        if (fileExtension?.toLowerCase() == 'jpeg' || fileExtension?.toLowerCase() == 'jpg' || fileExtension?.toLowerCase() == 'bmp' || fileExtension?.toLowerCase() == 'png' || fileExtension?.toLowerCase() == 'gif') {
            return file
        }
        if (fileExtension?.toLowerCase() == 'xls' || fileExtension?.toLowerCase() == 'xlsx' || fileExtension?.toLowerCase() == 'xlsb' || fileExtension?.toLowerCase() == 'csv') {
            return excelImg
        }
        if (fileExtension?.toLowerCase() == 'pdf') {
            return pdfImg
        }
        return img1
    }

    const renderFileList = () => {
        return (
            <div className='Modalscroll' style={{ height: '110px' }}>
                <div className='modalimgList'>
                    {fileList.map((attachment, index) => (
                        <button className={`singleimg cursor-pointer border-0 bg-transparent ${(fileObjRef.current?.imG_URL == attachment.imG_URL) ? 'singleimg_active' : ""}`}
                            style={{ height: '100px' }}
                            onClick={() => handlePreview(attachment)} key={`${attachment?.filename}~${index}`}
                        >
                            <div className="text-end justify-content-end d-flex">
                            <button className={`me-1 text-end cursor   btnlink ${readOnlyFlg != 'readonly' ? 'd-block' : 'd-none'}`}
                                onClick={(e) => {
                                    handleDeleteFile(index)
                                    e.stopPropagation();
                                }}
                            >
                                <DeleteFilled />
                            </button>
                            </div>
                            <img alt="attachment" src={fileWiseImage(`${originBlob}${attachment?.imG_URL}`)} />
                            <span className='filename'>{attachment.filename}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    const handleModalCancel = () => {
        if (onCancel) {
            onCancel()
        }
        setisCameraModalVisible(false);
        setPreviewImage(null);
    }

    return (
        <>
            <Modal
                title={
                    <div className='d-flex justify-content-between align-items-center '>
                        <div>
                            <span>{readOnlyFlg == 'readonly' ? 'View Documents' : 'Upload Documents'}</span>
                        </div>
                        <div className={`${readOnlyFlg == 'readonly' ? 'd-none' : 'd-block'}`}>
                            <Upload
                                onChange={handleFileChange}
                                showUploadList={false}
                                beforeUpload={(file) => props?.handleBeforeUpload(file)}
                                fileList={fileList}
                                multiple={multiple}
                                accept={acceptFiles.map((ext) => `.${ext}`).join(',')}
                            >
                                <Button className={`uploadbtn`}>
                                    BROWSE & UPLOAD
                                </Button>
                            </Upload>
                        </div>
                        <DownloadOutlined className={`fs-4 ms-3 cursor ${readOnlyFlg == 'readonly' ? 'd-block' : 'd-none'}`} onClick={handleDownload} />
                    </div>
                }
                centered
                width={700}
                open={isCameraModalVisible}
                onCancel={handleModalCancel}
                closeIcon={null}
                closable={false}
                className='paddingZeromodal colorHeadermodal uploadModal'
                footer={[
                    <div className=' row d-flex justify-content-center' key={'1'}>
                        <div className='col-md-3 col-6'>
                            <Button key="close" className='w-100' onClick={handleModalCancel}>
                                CANCEL
                            </Button>
                        </div>
                        <div className={`col-md-3 col-6 ${readOnlyFlg == 'readonly' ? 'd-none' : 'd-block'}`}>
                            <Button key="close" className='w-100' onClick={handleOk}>
                                DONE
                            </Button>
                        </div>
                    </div>
                ]}
            >
                {
                    (isgetBolbDataFetch || UploadFetching || SasWiseUploadFetching) && <ModalLoader />
                }
                {previewImage ?
                    (
                        <div>
                            <div className='ShowContents'>
                                <img src={previewImage} alt="" className='w-100 cursor-pointer' />
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='ShowContents'><img src={img1} alt="" width="100%" className='w-100 cursor-pointer' />
                        </div>
                    )
                }
                <div className='p-3 py-1'>
                </div>

                <div className='p-3 py-1'>
                    {
                        props?.fileList?.length > 0 ?
                            <List>{renderFileList()}</List> : null
                    }

                </div>
            </Modal>
            <PDFViewer
                pdfUrl={pdfUrl} setPdfUrl={setPdfUrl}
                isModalVisible={pdfViewer}
                setModalVisible={setPdfViewer}
                setPrevModal={setisCameraModalVisible}
            />
        </>
    )
}

CommonEasUpload.propTypes = {
    fileList: PropTypes.array,
    setFileList: PropTypes.func,
    isCameraModalVisible: PropTypes.bool,
    setisCameraModalVisible: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    limit: PropTypes.number,
    containerName: PropTypes.string,
    readOnlyFlg: PropTypes.string,
    acceptFiles: PropTypes.array,
    fileSize: PropTypes.number,
    multiple: PropTypes.bool,
    pageFlag: PropTypes.number,
    fileNameStr: PropTypes.string,
    handleBeforeUpload: PropTypes.func,
    manualUrl: PropTypes.any,
}
