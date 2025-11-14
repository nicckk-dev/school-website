import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const CommFooter = (props) => {
    return (
        <footer>
            <div className="footerMain">
                <div className="container-fluid">
                    <div className="row align-items-center">
                       {props?.previousBtn &&  <div className='col-md-1'><Tooltip title="Previous"><button onClick={props?.previousBtn} className='btnNav'><LeftOutlined /></button></Tooltip> </div>}

                        <div className='col-md-12 d-flex justify-content-end'>
                            {
                                props?.footerBtnProps.map((btn, index) => (
                                    <React.Fragment key={`${btn.title}_${index}`}>
                                        {
                                            btn.isVisible &&
                                            < div className="text-end white  footstyle">
                                                <button className="footbtnfooter  w-100" onClick={btn.handleClick}>{btn.title}</button>
                                            </div>
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </div>

                       {props?.nextBtn &&  <div className='col-md-1'><Tooltip title="Next" className='float-end '><button onClick={props?.nextBtn} className='btnNav '><RightOutlined /></button> </Tooltip> </div>}
                    </div>
                </div>
            </div>
        </footer >
    )
}

CommFooter.propTypes = {
    footerBtnProps: PropTypes.any,
    nextBtn: PropTypes.func,
    previousBtn: PropTypes.func,

}

export default CommFooter
