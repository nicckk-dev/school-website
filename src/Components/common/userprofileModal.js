import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Upload, message } from 'antd';
import { DeleteFilled, UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import imgPlaceholder from '../../assets/images/img_placeholder.png';
import excelImg from '../../assets/images/excelImage1.png';
import pdfImg from '../../assets/images/pdficon.jpg';
import docImg from '../../assets/images/pdficon.jpg';

const ImgModal = ({
  isCameraModalVisible,
  handleCameraModalCancel,
  handleCameraModalSave,
  getFileExtension,
  acceptFiles,
  maxSizeMB,
  // acceptFiles = ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'xlsx'],
  // maxSizeMB = 5,
  defaultFile
}) => {
  const fileInputRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
    setPreviewImage(null);
    setSelectedFile(null);
    setFileList([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = () => {
    if (selectedFile) {
      const ext = getFileExtension(selectedFile.name);
      handleCameraModalSave(selectedFile, ext);
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    setSelectedFile(null);
    setFileList([]);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    handleCameraModalCancel();
  };

  useEffect(() => {
    if (isCameraModalVisible && defaultFile) {
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
  }, [isCameraModalVisible, defaultFile]);


  return (
    <Modal
      open={isCameraModalVisible}
      onCancel={handleModalClose}
      centered
      width={700}
      closable={false}
      title={
        <div className="d-flex justify-content-between align-items-center">
          <span>Upload Document</span>
          <Upload
            showUploadList={false}
            beforeUpload={() => false} // prevent auto-upload
            onChange={handleUpload}
            accept={acceptFiles.map((ext) => `.${ext}`).join(',')}
          >
            <Button icon={<UploadOutlined />} className="uploadbtn">
              BROWSE & UPLOAD
            </Button>
          </Upload>
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
              disabled={!selectedFile}
            >
              DONE
            </Button>
          </div>
        </div>,
      ]}
    >
      <div className="ShowContents">
        <img
          src={previewImage || imgPlaceholder}
          alt="Preview"
          className="w-100"
          style={{ maxHeight: '300px', objectFit: 'contain' }}
        />
      </div>

      <div className="p-3 py-1">
        {fileList.length > 0 && (
          <div className="d-flex mt-3">
            {fileList.map((file, index) => (
              <div
                key={`${file.filename}-${index}`}
                className="position-relative text-center me-3"
              >
                <img
                  src={getFilePreviewIcon(file.filename)}
                  alt="thumb"
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    border: previewImage === file.imG_URL ? '2px solid blue' : '1px solid #ccc',
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
                  className="text-danger position-absolute top-0 end-0 cursor-pointer"
                  style={{ background: 'white', borderRadius: '50%', padding: '2px' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

ImgModal.propTypes = {
  isCameraModalVisible: PropTypes.bool.isRequired,
  handleCameraModalCancel: PropTypes.func.isRequired,
  handleCameraModalSave: PropTypes.func.isRequired,
  getFileExtension: PropTypes.func.isRequired,
  acceptFiles: PropTypes.array,
  maxSizeMB: PropTypes.number,
  defaultFile: PropTypes.object,
};

export default ImgModal;
