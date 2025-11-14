import { DownloadOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import imgexcl from '../../assets/images/excelImage1.png';
import nopreview from '../../assets/images/img_placeholder.png'
import ModalLoader from "./ModalLoader";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import PropTypes from "prop-types";
// import { pdfjs } from 'react-pdf';
export const PDFViewer = (props) => {
    const { pdfUrl, isModalVisible, setModalVisible, filename, setPrevModal } = props;
    const [loading, setLoading] = useState(true);
    //pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

    // pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';



    const handleCancel = () => {
        setModalVisible(false);
        if (setPrevModal) {
            setPrevModal(true);
        }
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = filename;
        link.click();
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            if (!loading) clearTimeout(timer);
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [pdfUrl]);

    return (
        <Modal
            title={
                <div className="d-flex justify-content-between align-items-center me-3">
                    <span>Preview</span>
                    <DownloadOutlined className="fs-5" onClick={handleDownload} />
                </div>
            }
            className="paddingZeromodal colorHeadermodal"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width={800}
            centered
        >
            <div className="unlistedModal pdfDiv">
                {loading ? (<ModalLoader />
                    // <div className="">
                    //     <Skeleton.Button
                    //         active
                    //         size="large"
                    //         shape="square"
                    //         block
                    //         className="mb-1 h-100"

                    //     />
                    // </div>
                ) : (pdfUrl?.endsWith(".pdf") ? (
                    // <iframe
                    //     key={pdfUrl}
                    //     src={`https://docs.google.com/viewer?url=${pdfUrl}&embedded=true&cacheBust=${new Date().getTime()}`}
                    //     width="100%"
                    //     height="98%"
                    // />
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={pdfUrl} />

                    </Worker>

                    // <iframe
                    //     src={pdfUrl}
                    //     title="PDF Viewer"
                    // />
                ) : pdfUrl?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <img
                        key={pdfUrl}
                        src={pdfUrl}
                        alt="Image Attachment"
                        className="hightPdf"

                    />
                ) : pdfUrl?.match(/\.(xls|xlsx|csv)$/i) ? (
                    <div className="textAlignWithPad">
                        <img
                            src={imgexcl}
                            alt="Excel File"
                            className="hightPdf"
                        //onLoad={handleImageLoad}
                        />
                    </div>
                ) : (
                    <div className="textAlignWithPad">
                        <img
                            src={nopreview}
                            alt="No preview"
                            className="hightPdf"
                        />
                    </div>
                )
                )}

            </div>
        </Modal>
    );
};

PDFViewer.propTypes = {
    pdfUrl: PropTypes.any,
    isModalVisible: PropTypes.any,
    setModalVisible: PropTypes.any,
    filename: PropTypes.any,
    setPrevModal: PropTypes.any,
}
