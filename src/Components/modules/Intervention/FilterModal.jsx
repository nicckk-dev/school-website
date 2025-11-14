import { Button, Form, Modal } from "antd"
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { handleValidationErrors } from "../../../utils/errorMessage";
import { messageSerivce } from "../../../api/CommonApi";
import { SelectComp } from "../../common/SelectComp";
import { Asterisk } from "../../../constants/AsteriskConstant";

export const FilterModal = (props) => {
    const [filterForm] = Form.useForm();
    const dispatch = useDispatch();
    const handleFilterCancel = (flag) => {
        if (flag == 'cancel') {
            props?.setOpen(false);
        }
        filterForm.resetFields();
    }

    const approvalData = [
        { value: '-99', label: 'Select All' },
        { value: 'REQ_STATUS', label: 'Request' },
        { value: 'SMART_CONTRACT_STATUS', label: 'Smart Contract' },
        { value: 'DOCTOR_STATUS', label: 'Doctor Status' },
        { value: 'REPORT_STATUS', label: 'Report' },
    ]

    const handleFilterShow = async () => {
        try {
            await filterForm.validateFields();
            const filterFormData = filterForm.getFieldsValue();
            let filteredData = [];
            if (filterFormData?.ApprovalType == '-99') {
                const statusValue = filterFormData?.Status === '4' ? '0' : filterFormData?.Status;
                let approvalKeys = approvalData.map(item => item?.value)?.filter(item => item != '-99')
                filteredData = props?.intvData.filter(item =>
                    approvalKeys.some(key => item[key] == statusValue)
                );
            }
            else {
                filteredData = props?.intvData.filter(item => {
                    const itemValue = item[filterFormData?.ApprovalType];
                    return (
                        itemValue !== undefined &&
                        String(itemValue) == String(filterFormData?.Status == '4' ? 0 : filterFormData?.Status)
                    );
                });
            }
            props?.setIntvData(filteredData);
            props?.setOpen(false);
        }
        catch (error) {//
            handleValidationErrors(error, dispatch, messageSerivce)
        }
    }

    return (
        <Modal open={props?.open} onCancel={() => handleFilterCancel('cancel')}
            className='paddingZeromodal colorHeadermodal'
            centered width={500} title="Filter"
            footer={
                <div className=' row d-flex justify-content-center'>
                    <div className='col-md-3 col-6'>
                        <Button key="close" className='w-100' onClick={handleFilterCancel}>
                            CLEAR
                        </Button>
                    </div>
                    <div className={`col-md-3 col-6`}>
                        <Button key="close" className='w-100' onClick={handleFilterShow}>
                            SHOW
                        </Button>
                    </div>
                </div>
            }
        >
            <div className='container-fluid mb-2'>
                <Form form={filterForm} autoComplete='off'>
                    <div className="FormStyle FormStyleError">
                        <label className="FormLabel" htmlFor='ApprovalType'>Approval Type <Asterisk /></label>
                        <SelectComp
                            props={{
                                mode: 'single',
                                size: 'middle',
                                className: 'w-100',
                                required: true,
                                name: 'ApprovalType',
                                options: [
                                    { value: '', label: 'Select', disabled: true },
                                    ...(approvalData)
                                ],
                                initialvalues: '',
                            }}
                            validator={true}
                        />
                    </div>
                    <div className="FormStyle FormStyleError">
                        <label className="FormLabel" htmlFor='Status'>Status <Asterisk /></label>
                        <SelectComp
                            props={{
                                mode: 'single',
                                size: 'middle',
                                className: 'w-100',
                                required: true,
                                name: 'Status',
                                options: [
                                    { value: '0', label: 'Select', disabled: true },
                                    ...(Array.isArray(props?.statusData) ? props.statusData.map(item => ({
                                        value: item?.PARAMCODE,
                                        label: item?.PARAMNAME,
                                    })) : [])
                                ],
                                initialvalues: '0',
                            }}
                            validator={true}
                        />
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

FilterModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    intvData: PropTypes.array.isRequired,
    setIntvData: PropTypes.func.isRequired,
    statusData: PropTypes.arrayOf(
        PropTypes.shape({
            PARAMCODE: PropTypes.string.isRequired,
            PARAMNAME: PropTypes.string.isRequired,
        })
    ).isRequired,
};