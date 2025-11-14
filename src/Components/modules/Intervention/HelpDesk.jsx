
import { Modal } from 'antd';
import { TableComp } from "../../common/FormComponent";
import { QuestionCircleFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { IntvCss } from '../../common/GlobalStyle';

const HelpDeskModal = (props) => {
    console.log('props', props)
    const columns = [
        {
            title: 'Category',
            dataIndex: 'CATEGORY',
            key: 'CATEGORY',
        },
        {
            title: 'Name',
            dataIndex: 'NAME',
            key: 'NAME',
        },
        {
            title: 'Designation',
            dataIndex: 'DESIGNATION',
            key: 'DESIGNATION',
        },
        {
            title: 'Phone',
            dataIndex: 'PHONE',
            key: 'PHONE',
        },
        {
            title: 'Email',
            dataIndex: 'EMAIL',
            key: 'EMAIL',
        }
    ];
    return (
        <>

            <button className='border-0 p-0 bg-transparent' size="small" onClick={props.showModal}>
                <QuestionCircleFilled className='fs-5 text-color' />
            </button>
            <Modal
                open={props.open}
                title="HELP DESK"
                onCancel={props.onCancel}
                footer={null}
                className='paddingZeromodal colorHeadermodal'
                centered
                width={700}

            >
                <div className='p-2' >
                <div className={`${IntvCss['intvTable']}`}>
                    <TableComp props={{
                        columns: columns,
                        dataSource: props?.getHelpDeskData,
                        pagination: false,
                        size: 'small',
                        className: `common_table `,
                        bordered: true,
                    }}
                    />
                    </div>
                </div>

            </Modal>
        </>
    )
}

HelpDeskModal.propTypes = {
    showModal: PropTypes.any,
    open: PropTypes.any,
    onCancel: PropTypes.any,
    getHelpDeskData: PropTypes.any,
};

export default HelpDeskModal