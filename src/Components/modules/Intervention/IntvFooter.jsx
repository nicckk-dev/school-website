import React, { useState } from 'react';
import '../../../assets/css/Intervention.module.scss';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import { AppRejInterventionReq, SubmitData } from '../../../api/EasApi';
import MasterLoader from '../../common/MasterLoader';
import { messageSerivce } from '../../../api/CommonApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RejectRemarkModal from '../../common/RejectRemarkModal';
import { handleValidationErrors } from '../../../utils/errorMessage';
import { Form } from 'antd';
import { capitalizeWords, confirmMessage } from '../../../utils/common';

export const IntvFooter = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [openModal, setOpenModal] = useState(false);
    const [form1] = Form.useForm();
    const falseFlag = props?.showBack === false && props?.showSave === false && props?.showSubmit === false && props?.showNext === false && props?.showCancel === false && props?.showApprove === false && props?.showReject === false;
    const { mutateAsync: SubmitEas, isLoading: isSubmitEas } = useMutation({
        mutationFn: (params) => SubmitData(params),
        onSuccess: (response, params) => {
            let resData = response?.data?.resultSet;
            if (resData) {
                dispatch(messageSerivce({ messageType: resData?.flag == '0' ? 'success' : 'error', messageContent: resData?.msg }))
                if (resData?.flag == '0') {
                    setTimeout(() => {
                        navigate('/Intv');
                    }, 1000);
                }
            }
        }
    })

    const { mutateAsync: EasApproveReject, isLoading: ApproveRejectLoading } = useMutation({
        mutationFn: (params) => AppRejInterventionReq(params),
        onSuccess: (response, params) => {
            let resData = response?.data?.resultSet;
            if (resData && resData?.flag == 1) {
                dispatch(messageSerivce({ messageType: 'success', messageContent: `Record ${params?.Action == 'A' ? 'Approved' : 'Rejected'} SuccessFully` }))
                navigate(location.state?.backPath);
            }
            else {
                let approveStr = params?.Action == 'A' ? 'Approve' : 'Reject';
                confirmMessage({ title: resData?.flag != null ? capitalizeWords(resData?.flag) : `Failed To ${approveStr}` })
            }
        }
    })

    const footerBtnProps = [
        {

            title: 'BACK',
            isVisible: props.showBack == undefined ? true : props.showBack,
            handleClick: () => {
                handleAction(0)
            }
        },
        {
            title: 'SAVE',
            isVisible: props.showSave == undefined ? true : props.showSave,
            handleClick: () => {
                handleSave(2)
            },
        },
        {
            title: 'SUBMIT',
            isVisible: props.showSubmit == undefined ? true : props.showSubmit,
            handleClick: () => {
                handleSubmit(3)
            },
        },
        {

            title: 'NEXT',
            isVisible: props.showNext == undefined ? true : props.showNext,
            handleClick: () => {
                handleAction(1);
            },
        },
        {

            title: 'APPROVE',
            isVisible: props.showApprove,
            handleClick: () => {
                handleApproval('A');
            },
        },
        {

            title: 'REJECT',
            isVisible: props.showReject,
            handleClick: () => {
                handleApproval("R");
            },
        },
        {

            title: 'CANCEL',
            isVisible: props.showCancel,
            handleClick: () => {
                navigate('/Intv');
            },
        }
    ]

    const handleSave = (flag) => {
        props?.onSaveFromParent(flag);
    }

    const handleSubmit = async (flag) => {
        try {
            const isSaveSuccessful = await props?.onSaveFromParent(flag);
            if (isSaveSuccessful) {
                await SubmitEas(props?.objState);
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    }

    const handleAction = async (flag) => {
        if (!props?.onAction || await props?.onAction() === true) {
            if (await props?.onSaveFromParent(flag)) {
                setTimeout(() => {
                    navigate(
                        flag == 0 ? props?.backObj?.pagename : props?.nextObj?.pagename, { state: flag == 0 ? props?.backObj?.stateObj : props?.nextObj?.stateObj }
                    );
                }, 1000);
            }
        }
    }

    const handleApproval = (apprFlag) => {
        if (apprFlag === 'R') {
            setOpenModal(true);
        }
        else {
            handleApprCall(apprFlag, null);
        }
    }

    const handleApprCall = (apprFlag, remarkValue) => {
        EasApproveReject({
            Txnentryno: location.state?.TXNENTRYNO,
            App_entryno: location.state?.APP_ENTRYNO,
            DocType: location.state?.DOCTYPE,
            Action: apprFlag,
            Remark: remarkValue
        })
    }

    const handleOnOk = async () => {
        try {
            await form1.validateFields();
            const formData = form1.getFieldsValue();
            handleApprCall('R', formData?.remarks);
            handleOnCancel();
        }
        catch (error) {
            handleValidationErrors(error, dispatch, messageSerivce)
        }
    };

    const handleOnCancel = () => {
        form1.resetFields();
        setOpenModal(false);
    };

    console.log(falseFlag, 'FaleFlag');

    return (
        <footer>
            {
                (isSubmitEas || ApproveRejectLoading) && <MasterLoader />
            }
            {
                falseFlag ? <></> : (
                    <div className="commfooter py-2" style={{ backgroundColor: props?.bgcolor === "#fff" ? "#fff" : "#777070" }}>
                        <div className="container-fluid">
                            <div className="d-flex justify-content-center align-items-center">
                                {
                                    // (props?.pagename === "SpeakersList" || props?.pagename === "Intv" || props?.pagename === "AddUnlistedCustomer" || props?.pagename === "VisitorTagging" || props?.pagename === "AddEmpoyee" || props?.pagename === "VendorLog" || props?.pagename === "attendeeList") &&
                                    (props?.formBtns || footerBtnProps).map((btn, index) => (
                                        <React.Fragment key={index}>
                                            {btn.isVisible && (
                                                <div className="text-center text-white mx-4 cursor">
                                                    <div className={`${(props?.formBtns || footerBtnProps).length === 1 ? 'footbtn px-3' : ''}`} onClick={btn.handleClick}>
                                                        {btn.title}
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                            <div>
                                <RejectRemarkModal
                                    open={openModal}
                                    title="Enter the remarks"
                                    okText="SUBMIT"
                                    cancelText="CANCEL"
                                    layout="vertical"
                                    width={320}
                                    name="remarks"
                                    cancelButtonProps={{ className: "d-none" }}
                                    form={form1}
                                    onOk={handleOnOk}
                                    onCancel={handleOnCancel}
                                    initialValues={{ remarks: '' }}
                                    textAreaRows={3}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </footer>
    )
}

IntvFooter.propTypes = {
    pagename: PropTypes.string,
    onSaveFromParent: PropTypes.func,
    objState: PropTypes.object,
    nextObj: PropTypes.object,
    backObj: PropTypes.object,
    formBtns: PropTypes.array,
    onAction: PropTypes.func,
    showBack: PropTypes.bool,
    showSave: PropTypes.bool,
    showSubmit: PropTypes.bool,
    showNext: PropTypes.bool,
    showCancel: PropTypes.bool,
    showApprove: PropTypes.bool,
    showReject: PropTypes.bool,
    bgcolor: PropTypes.any,
}

IntvFooter.defaultValues = {
    showCancel: false,
    showReject: false,
    showApprove: false,
}