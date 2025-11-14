import { Modal } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

function CommModal(props) {
    // console.log("common modal props: ", props)
    return (
        <Modal className='paddingZeromodal' centered width="400" {...props.modalProps}>
            {props?.content}
        </Modal>
    )
}



export default CommModal

CommModal.propTypes = {
    modalProps: PropTypes.any,
    content: PropTypes.any,
}