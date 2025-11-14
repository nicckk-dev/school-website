import React, { useState } from 'react';
import { Button, message } from 'antd';
import ImgModal from '../../../common/ImgModal';
import { useMutation } from '@tanstack/react-query';
import { UploadFileUrl } from '../../../../api/MasterAdminApi'; // adjust path as needed
import { userSession } from '../../../../constants/UserConstant';
import { CameraOutlined } from '@ant-design/icons';
const userData = userSession.userData;

const ImgFileUploadSurvey = ({ question, form, onQuestionChange }) => {
    const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    console.log('question', question)
    const { mutate: uploadFile, isLoading } = useMutation({
        mutationFn: (data) => UploadFileUrl(data),
        onSuccess: (res) => {
            debugger

            if (res?.data?.data) {
                const url = res?.data?.data;

                // setFileUrl(url); // save locally
                // ✅ just call parent with file URL only
                const responsePayload = {
                    id: question.id,
                    identity: question.identity,
                    pageId: question.pageId,
                    mainQuestion: question.mainQuestion,
                    answerData: question?.selectedType,
                    valuesData: {
                        fileUrl: url,
                    },
                };

                onQuestionChange?.(question.identity, responsePayload);
            }
            message.success('File uploaded successfully');
            console.log('Upload Success:', res);
        },
        onError: (error) => {
            message.error('Upload failed');
            console.error('Upload Error:', error);
        },
    });

    const handleCameraModalCancel = () => {
        setIsCameraModalVisible(false);
    };
    const handleCameraModalSave = async (file, extension) => {
        debugger;
        setUploadedImage(file);
        setIsCameraModalVisible(false);

        try {
            // Convert file to base64 (remove prefix)
            const base64Content = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result;
                    resolve(base64data.split(',')[1]); // only the base64 string part
                };
                reader.onerror = () => reject("File reading failed");
                reader.readAsDataURL(file);
            });

            const fileData = [
                {
                    clientid: userData.CLIENTID,
                    repcode: userData.REPCODE,
                    fileName: file.name,
                    fileType: file.type,
                    fileData: base64Content,
                },
            ];

            // Trigger mutation with final object
            uploadFile(fileData);

        } catch (error) {
            console.error("❌ Error converting file to base64:", error);
        }
    };



    const getFileExtension = (fileName) => {
        return fileName.split('.').pop();
    };

    return (
        <div className="text-center">
            {/* <Button type="primary" onClick={() => setIsCameraModalVisible(true)} className='mx-2'>
        {isLoading ? 'Uploading...' : 'Upload Image'}
      </Button>

      {uploadedImage && (
        <div className="mt-2 text-success">
          <strong>Uploaded File Name:</strong> {uploadedImage}
        </div>
      )} */}

            <Button type="primary" onClick={() => setIsCameraModalVisible(true)} >
                <div className='mx-2'>
                    {isLoading ? 'Uploading...' : 'Upload Image'}
                    <CameraOutlined className='fs-4 mx-2 justify-content-center' onClick={() => setIsCameraModalVisible(true)} />
                </div>
            </Button>
            {uploadedImage && (
                <div className="mt-3">
                    <p><strong>Uploaded File Name:</strong> {uploadedImage.name}</p>
                </div>
            )}
            {question?.valuesData?.instructionMessage && (
                <div className="text-muted mt-2">
                    <small>{question.valuesData.instructionMessage}</small>
                </div>
            )}
            {/* {uploadedImage && (
        <div className="mt-3">
          <p>Uploaded Preview:</p>
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="uploaded"
            style={{ maxWidth: '100%' }}
          />
        </div>
      )} */}

            <ImgModal
                isCameraModalVisible={isCameraModalVisible}
                handleCameraModalCancel={handleCameraModalCancel}
                handleCameraModalSave={handleCameraModalSave}
                getFileExtension={getFileExtension}
                defaultFile={uploadedImage}
                acceptFiles={(question?.valuesData?.allowedFileTypes || []).map(type => type.toLowerCase())}
                maxSizeMB={question?.valuesData?.fileSize || 5}  // default to 5MB if not provided
            />

        </div>
    );
};

export default ImgFileUploadSurvey;
