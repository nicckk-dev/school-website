// ... imports remain same
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Modal, Button, Upload, message, Slider, Switch } from 'antd';
import { DeleteFilled, UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';

import imgPlaceholder from '../../assets/images/img_placeholder.png';
import excelImg from '../../assets/images/excelImage1.png';
import pdfImg from '../../assets/images/pdficon.jpg';
import docImg from '../../assets/images/pdficon.jpg';

const ImgCropModal = ({
    isCameraModalVisible,
    handleCameraModalCancel,
    handleCameraModalSave,
    getFileExtension,
    acceptFiles,
    maxSizeMB,
    defaultFile,
}) => {
    const fileInputRef = useRef(null);
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // crop states
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [enableCrop, setEnableCrop] = useState(false);
    const [squareCrop, setSquareCrop] = useState(false);

    const getFilePreviewIcon = (filename) => {
        const ext = getFileExtension(filename).toLowerCase();
        if (['jpg', 'jpeg', 'bmp', 'png', 'gif'].includes(ext)) return previewImage;
        if (['xls', 'xlsx', 'csv'].includes(ext)) return excelImg;
        if (['doc', 'docx'].includes(ext)) return docImg;
        if (ext === 'pdf') return pdfImg;
        return imgPlaceholder;
    };

    const validateFile = (file) => {
        const ext = getFileExtension(file.name).toLowerCase();
        if (!acceptFiles.includes(ext)) {
            message.error(`File format .${ext} not supported.`);
            return false;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            message.error(`File size must be under ${maxSizeMB}MB.`);
            return false;
        }
        return true;
    };

    const handleUpload = (info) => {
        const file = info.file;
        if (!validateFile(file)) return;

        const previewUrl = URL.createObjectURL(file);
        setSelectedFile(file);
        setPreviewImage(previewUrl);
        setFileList([
            {
                filename: file.name,
                fileObj: file,
                imG_URL: previewUrl,
            },
        ]);
    };

    const handleDeleteFile = () => {
        debugger
        setPreviewImage(null);
        setSelectedFile(null);
        setFileList([]);
        setEnableCrop(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        debugger
        // if (!selectedFile) return;

        const ext = getFileExtension(selectedFile.name)?.toLowerCase();

        if (enableCrop && croppedAreaPixels) {
            const croppedImageBlob = await getCroppedImg(previewImage, croppedAreaPixels);
            const croppedFile = new File([croppedImageBlob], selectedFile.name, { type: selectedFile.type });
            handleCameraModalSave(croppedFile, ext);
        } else {
            handleCameraModalSave(selectedFile, ext);
        }
        handleModalClose();
    };

    const handleModalClose = () => {
        setSelectedFile(null);
        setFileList([]);
        setPreviewImage(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setEnableCrop(false);
        setSquareCrop(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
        handleCameraModalCancel();
    };

    const getCroppedImg = (imageSrc, pixelCrop) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = pixelCrop.width;
                canvas.height = pixelCrop.height;
                const ctx = canvas.getContext('2d');

                ctx.drawImage(
                    image,
                    pixelCrop.x,
                    pixelCrop.y,
                    pixelCrop.width,
                    pixelCrop.height,
                    0,
                    0,
                    pixelCrop.width,
                    pixelCrop.height
                );

                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }
                    resolve(blob);
                }, 'image/jpeg');
            };
            image.onerror = (error) => reject(error);
        });
    };

    // useEffect(() => {
    //     if (isCameraModalVisible && defaultFile) {
    //         const previewUrl = URL.createObjectURL(defaultFile);
    //         setSelectedFile(defaultFile);
    //         setPreviewImage(previewUrl);
    //         setFileList([
    //             {
    //                 filename: defaultFile.name,
    //                 fileObj: defaultFile,
    //                 imG_URL: previewUrl,
    //             },
    //         ]);
    //     }
    // }, [isCameraModalVisible, defaultFile, getFileExtension]);

    useEffect(() => {
        if (isCameraModalVisible && defaultFile) {
            // ✅ Case 1: defaultFile comes from DB
            if (defaultFile.src) {
                setSelectedFile(null); // No actual File object from DB
                setPreviewImage(defaultFile.src);
                setFileList([
                    {
                        filename: defaultFile.name,
                        fileObj: null,
                        imG_URL: defaultFile.src,
                    },
                ]);
            }
            // ✅ Case 2: defaultFile is a File object (local upload)
            else if (defaultFile instanceof File) {
                const previewUrl = URL.createObjectURL(defaultFile);
                setSelectedFile(defaultFile);
                setPreviewImage(previewUrl);
                setFileList([
                    {
                        filename: defaultFile.name,
                        fileObj: defaultFile,
                        imG_URL: previewUrl,
                    },
                ]);
            }
        }
    }, [isCameraModalVisible, defaultFile, getFileExtension]);


    return (
        <Modal
            open={isCameraModalVisible}
            onCancel={handleModalClose}
            centered
            width={750}
            closable={false}
            className='paddingZeromodal'
            title={
                <div className="d-flex justify-content-between align-items-center">
                    <span>Upload Document</span>
                    <div className="d-flex align-items-center gap-3">
                        {/* Show crop switch ONLY if previewImage exists */}
                        {/* {previewImage && (
              <>
                <span>Enable Crop</span>
                <Switch checked={enableCrop} onChange={setEnableCrop} />
              </>
            )} */}
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleUpload}
                            accept={acceptFiles.map((ext) => `.${ext}`).join(',')}
                        >
                            <Button icon={<UploadOutlined />} className="uploadbtn">
                                BROWSE & UPLOAD
                            </Button>
                        </Upload>
                    </div>
                </div>
            }
            footer={[
                <div className="row justify-content-center" key="footer">
                    <div className="col-6 col-md-3">
                        <Button className="w-100" onClick={handleModalClose}>
                            CANCEL
                        </Button>
                    </div>
                    <div className="col-6 col-md-3">
                        <Button
                            className="w-100"
                            type="primary"
                            onClick={handleSave}
                            // disabled={!selectedFile}
                        >
                            DONE
                        </Button>
                    </div>
                </div>,
            ]}
        >
            <div className='ShowContents' style={{ position: 'relative', width: '100%', height: 270, }}>
                {previewImage ? (
                    enableCrop ? (
                        <Cropper
                            image={previewImage}
                            crop={crop}
                            zoom={zoom}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={handleCropComplete}
                        />
                    ) : (
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-100 h-100"
                            style={{ objectFit: 'contain' }}
                        />
                    )
                ) : (
                    <img
                        src={imgPlaceholder}
                        alt="Preview"
                        className="w-100"
                        style={{ maxHeight: '270px', objectFit: 'contain' }}
                    />
                )}
            </div>


            <div className="p-2 px-3 d-flex justify-content-between align-items-center">
                {previewImage && (
                    <div className='d-flex'>
                        <span className='pe-3'> Enable Crop</span>
                        <Switch checked={enableCrop} onChange={setEnableCrop} />
                    </div>
                )}
                {enableCrop && (
                    <div className='col-md-4'>
                        <div className='d-flex align-items-center '>
                            <span className='me-2'>Zoom:</span>
                            <Slider min={1} max={3} step={0.1} value={zoom} className=' w-100' onChange={setZoom} />
                        </div>
                    </div>
                )}
                {/* <div>
            <span style={{ marginRight: 8 }}>Square Crop</span>
            <Switch checked={squareCrop} onChange={setSquareCrop} />
          </div> */}
                
            </div>


            <div className="p-3 py-1">
                {fileList?.length > 0 && (
                    <div className="d-flex mt-3">
                        {fileList?.map((file, index) => (
                            <div
                                key={`${file.filename}-${index}`}
                                className="position-relative text-center me-3 w-100px"
                            >
                                <img
                                    src={getFilePreviewIcon(file.filename)}
                                    alt="thumb"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        border: previewImage === file.imG_URL ? '2px solid #000' : '1px solid #ccc',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setPreviewImage(file.imG_URL);
                                        setSelectedFile(file.fileObj);
                                    }}
                                />
                                <div className="filename">{file.filename}</div>
                                <DeleteFilled
                                    onClick={handleDeleteFile}
                                    className="text-dark position-absolute end-0 cursor-pointer"
                                    style={{ background: 'white', top: "-20px", borderRadius: '50%', padding: '2px' }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};

ImgCropModal.propTypes = {
    isCameraModalVisible: PropTypes.bool.isRequired,
    handleCameraModalCancel: PropTypes.func.isRequired,
    handleCameraModalSave: PropTypes.func.isRequired,
    getFileExtension: PropTypes.func.isRequired,
    acceptFiles: PropTypes.array,
    maxSizeMB: PropTypes.number,
    defaultFile: PropTypes.object,
};

export default ImgCropModal;
