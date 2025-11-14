import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Checkbox, Card, Upload, List, Skeleton } from 'antd';
import { CheckOutlined, MenuOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { InputComp } from "../../common/FormComponent";
import { SelectComp } from "../../common/SelectComp";
import pdfIcon from '../../../assets/images/pdficon.jpg'
import img1 from '../../../assets/images/img_placeholder.png'
import MasterLoader from "../../common/MasterLoader";
 
const { Search } = Input;
 
export const ImgModal = (props) => {
    const [form] = Form.useForm();
    const [getInputfield, setInputField] = useState({
        Name: '',
        roleType: ''
    })
    const resetFormBeforeModal = () => {
        props.showJoinWorkModal()
    }
    const handleToAdd = () => {
        const formValues = form.getFieldsValue();
        console.log('formValues', formValues)
        props.addToJoinWork(formValues)
    }
    const handleCommonChange = (field, value) => {
        setInputField((prev) => ({
            ...prev,
            [field]: value,
        }));
    }
    const handleButtonClick = () => {
        // Execute your custom logic here
        console.log('Button clicked');
    };
    const handleUploadCustomRequestData = (options) => {
        console.log('optionsoptions', options);
    }
    const [image, setImage] = useState(null);
 
    const handleUpload = (file) => {
        // Your logic for handling file upload goes here
        console.log('File uploaded:', file);
        setImage(file); // Set the upPd image to state
        return false; // Return false to prevent automatic upload
    };
    const handleFileChange = (info) => {
        // Your logic for handling file change goes here
        console.log('File change:', info.file);
        props.handleUploadCustomRequest(info.file)
        // You can update fileList state if needed
        // setFileList(info.fileList);
    };
    return (
        <>
            {/* <div onClick={resetFormBeforeModal}>UNPLANNED</div> */}
            <Modal
                title={
                    <div className='d-flex justify-content-between align-items-center me-3'>
                        <span>Upload Documents</span>
                        {/* props.handleUploadCustomRequest(options) */}
                        <Upload
                            onChange={handleFileChange}
                            // customRequest={() => console.log('Dummy function called')}
                            // customRequest={(options) => handleUploadCustomRequestData(options)}
                            showUploadList={false}
                            beforeUpload={(file) => props?.handleBeforeUpload(file)}
                            accept='.jpg, .png, .gif,.jpeg'
                        // beforeUpload={(file, options) => props.beforeUpload(file, options)}
                        >
                            {props.getUploadLoader ?
                                <div key={"browUpload"} className="col-md-3 col-6">
                                    <h5 className="fw-bold"><Skeleton.Button active={"active"} block={true} size={"large"} shape={"square"} style={{ height: "35px", width: "150px" }} /></h5>
                                </div> :
                                <Button className={`uploadbtn ${props?.txnEntryNo ? "d-none" : "d-block"}`}
                                // onClick={(options) => props.handleUploadCustomRequest(options)}
                                >BROWSE & UPLOAD</Button>
                            }
                        </Upload>
                        {/* <Button onClick={(options) => props.handleUploadCustomRequest(options)}>Upload Files</Button> */}
                    </div>
                }
                centered
 
                width={700}
                open={props.isCameraModalVisible}
                // onOk={handleCameraOk}
                onCancel={props.handleCameraModalCancel}
                className='paddingZeromodal colorHeadermodal'
                closeIcon={props.getUploadLoader ? false : true}
                footer={props?.txnEntryNo ? null : [
 
                    <div className=' row d-flex justify-content-center '>
                        {props.getUploadLoader ?
                            <div key={"1"} className="col-md-3 col-6">
                                <h5 className="fw-bold"><Skeleton.Button active={"active"} block={true} size={"large"} shape={"square"} style={{ height: "45px", width: "150px" }} /></h5>
                            </div> :
                            <div className='col-md-3 col-6'>
                                <Button key="close" className='w-100' onClick={props.handleCameraModalCancel}>
                                    CANCEL
                                </Button>
                            </div>
                        }
                        {props.getUploadLoader ?
                            <div key={"2"} className="col-md-3 col-6">
                                <h5 className="fw-bold"><Skeleton.Button active={"active"} block={true} size={"large"} shape={"square"} style={{ height: "45px", width: "150px" }} /></h5>
                            </div> :
                            <div className='col-md-3 col-6'>
                                <Button key="save" className='w-100' type="primary" onClick={props.handleCameraModalSave}>
                                    SAVE
                                </Button>
                            </div>
                        }
                    </div>
 
                ]}
 
            >
                {props.previewImage ? (
                    <div>
                        {props.getFileExtension(props.previewImage) === 'pdf' ? (
                            <div className='ShowContents'>
                                <img src={pdfIcon} className='cursor-pointer' preview={false} onClick={() => props.handleDownloadPDF(props.previewImage)} />
                            </div>
                        ) : (
                            <div className='ShowContents'>
                                <img src={props.previewImage} className='w-100 cursor-pointer' preview={false} />
                            </div>
                        )}
                    </div>
                )
                    :
 
                    <div className='ShowContents'><img src={img1} width="100%" className='w-100 cursor-pointer' preview={false} /></div>
                }
                <div className='p-3 py-1'>
                    {/* {matchedData?.exp_Attachments?.split(',').length > 0 ? (
                        <>
                            <p>Total Photos ({matchedData?.exp_Attachments && matchedData?.exp_Attachments !== '' ? matchedData?.exp_Attachments.split(',').length : 0})</p>
                            <List>{props.renderFileList()}</List>
                        </>
                    ) : null} */}
                </div>
 
                <div className='p-3 py-1'>
                    {/* {
                        props?.fileList?.length > 0 ? */}
                    <>
                        {/* <p>Total Photos ({matchedData?.exp_Attachments?.split(',')?.length})</p> */}
                        {props.getUploadLoader ? <div className='mt-0'>
                            {Array.from({ length: 1 }).map((_, index) => (
                                <div key={index} className="col-md-6 col-6 mb-0">
                                    <h5 className="fw-bold"><Skeleton.Button active={"active"} block={true} size={"large"} shape={"square"} style={{ height: "80px", width: "120px" }} /></h5>
 
                                </div>
 
                            ))}
 
                        </div> : <List>{props.renderFileList()}</List>}
 
                    </>
                    {/* :
                            null
                    } */}
 
                </div>
            </Modal>
        </>
    )
}
 