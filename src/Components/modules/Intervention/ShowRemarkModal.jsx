import { Modal } from "antd";
import PropTypes from "prop-types";

export const ShowRemarkModal = (props) => {
    return (
        <Modal
            title={props?.title || `Rejection Remark`}
            open={props?.remarkModal}
            onCancel={() => props?.setRemarkModal(false)}
            footer={null} width={400}
            className='paddingZeromodal colorHeadermodal'
            centered
        >
            <div className="p-3">
                {
                    !props?.customString ? (
                        Object.keys(props?.remarkData).map((item, index) => (
                            <div className="mb-2" key={`${item}~${index}`}>
                                <b>{item}</b> : {props?.remarkData[item]}
                            </div>
                        ))
                    ) :
                        (
                            <div>{props?.customString}</div>
                        )
                }
            </div>
        </Modal>
    )
}
ShowRemarkModal.propTypes = {
    remarkModal: PropTypes.bool.isRequired,
    setRemarkModal: PropTypes.func.isRequired,
    remarkData: PropTypes.object.isRequired,
    customString: PropTypes.string,
    title: PropTypes.any,
}