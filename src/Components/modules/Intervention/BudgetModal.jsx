
import { Button, Modal, Form } from 'antd';
import PropTypes from 'prop-types';
import { SelectComp } from "../../common/SelectComp";
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchProcQuery, GetBudgetDetails, ShowBudgetData } from '../../../api/EasApi';
import { Asterisk } from '../../../constants/AsteriskConstant';
import ModalLoader from '../../common/ModalLoader';
import { useEffect, useRef, useState } from 'react';

const BudgetModal = (props) => {
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);
    const [budgetData, setBudgetData] = useState({
        assignBudget: 0, availBudget: 0,
    })
    const formRef = useRef({
        Bu: '', month: '', year: '',
    });

    const { data: getBu = [], isFetching: isBUFetching } = useQuery({
        queryKey: ["GetBUData"],
        queryFn: () => fetchProcQuery({ choice: 'BU' }),
        enabled: props.open,
        select: response => {
            return response.data.resultSet?.budata;
        },
        onSuccess: (response) => {
            if (response?.length == 1) {
                props?.form?.setFieldsValue({ Bu: response[0].BUCODE })
                formRef.current.Bu = response[0].BUCODE
            }
        }
    });

    const { isFetching: isBudgetDetailsFetch } = useQuery({
        queryKey: ["getBudgetDetails"],
        queryFn: GetBudgetDetails,
        enabled: props.open,
        select: response => {
            return response.data.resultSet;
        },
        onSuccess: (response) => {
            setMonth(response?.month);
            setYear(response?.year);
            if (response?.month?.length == 1) {
                props?.form?.setFieldsValue({ month: response?.month[0]?.PARAMCODE })
                formRef.current.month = response?.month[0]?.PARAMCODE
            }
            else if (response?.year?.length == 1) {
                props?.form?.setFieldsValue({ month: response?.year[0]?.PARAMCODE })
                formRef.current.year = response?.year[0]?.PARAMCODE
            }
            else {
                props?.form?.setFieldsValue({ month: response?.month[0]?.DEFAULT_FLG, year: response?.year[0]?.DEFAULT_FLG })
                formRef.current.month = response?.month[0]?.DEFAULT_FLG
                formRef.current.year = response?.year[0]?.DEFAULT_FLG
            }
        }
    });

    const { mutateAsync: getBudgetData, isLoading: isBudgetDataLoading } = useMutation({
        mutationFn: (params) => ShowBudgetData(params),
        onSuccess: (response) => {
            let resData = response?.data?.resultSet?.budgetDetails
            if (resData != null) {
                setBudgetData({ assignBudget: resData[0]?.ASSIGNEDBUDGET, availBudget: resData[0]?.AVAILABLEBUDGET });
            }
        },
    });

    useEffect(() => {
        if (getBu?.length > 0 && month?.length > 0 && year?.length > 0) {
            getBudgetData(formRef.current)
        }
    }, [getBu, month, year]);

    const onFinish = (formdata) => {
        getBudgetData(formdata);
    }

    return (
        <Modal
            open={props.open}
            title="BUDGET DETAILS"
            onCancel={props.onCancel}
            footer={null} centered width={500}
            className='paddingZeromodal colorHeadermodal'
        >
            {(isBUFetching || isBudgetDetailsFetch || isBudgetDataLoading) && <ModalLoader />}
            <div className='container-fluid mb-2'>
                <Form
                    form={props.form}
                    name="form"
                    onFinish={onFinish}
                >
                    <div className='row'>
                        <div className={`col-6 ${getBu?.length > 1 ? 'd-block' : "d-none"}`}>
                            <div className={`FormStyle my-2 FormStyleError`}>
                                <label htmlFor="textarea" className="FormLabel">BU <Asterisk /></label>
                                <SelectComp
                                    key={'Bu'}
                                    props={{
                                        mode: 'single', size: 'medium', style: { width: '100%' }, name: 'Bu',
                                        required: getBu?.length > 1, message: 'Please Select BU',
                                        options:
                                            [{ value: '0', label: 'Select', disabled: true },
                                            ...(getBu?.map(obj => ({
                                                value: obj.BUCODE,
                                                label: obj.BUNAME,
                                            })) || [])],
                                        initialvalues: '0',
                                    }} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="FormStyle FormStyleError my-2">
                                <label htmlFor="textarea" className="FormLabel">Month <Asterisk /></label>
                                <SelectComp
                                    key={'month'}
                                    props={{
                                        mode: 'single', size: 'medium', style: { width: '100%' },
                                        required: true, message: 'Please Select Month', name: 'month',
                                        options: [
                                            { value: '0', label: 'Select', disabled: true },
                                            ...(month?.map(obj => ({
                                                value: obj.PARAMCODE,
                                                label: obj.PARAMNAME,
                                            })) || [])
                                        ],
                                        initialvalues: '0',
                                    }} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="FormStyle FormStyleError my-2">
                                <label htmlFor="textarea" className="FormLabel">Year <Asterisk /></label>
                                <SelectComp
                                    key={'year'}
                                    props={{
                                        mode: 'single', size: 'medium', style: { width: '100%' },
                                        required: true, message: 'Please Select Year', name: 'year',
                                        options: [
                                            { value: '0', label: 'Select', disabled: true },
                                            ...(year?.map(obj => ({
                                                value: obj.PARAMCODE,
                                                label: obj.PARAMNAME,
                                            })) || [])
                                        ],
                                        initialvalues: '0',
                                    }} />
                            </div>
                        </div>
                        <div className='col-6 d-flex flex-column justify-content-end'>
                            <div className="">
                                <Button htmlType="submit" type="primary" className='my-2 w-100'>
                                    SHOW
                                </Button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6 py-3'>
                                <span>Assinged Budget : {budgetData.assignBudget}</span>
                            </div>
                            <div className='col-6 py-3'>
                                <span>Available Budget : {budgetData.availBudget}</span>
                            </div>
                        </div>

                        {/* <div className='row'>
                                
                            </div> */}
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

BudgetModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
}

export default BudgetModal