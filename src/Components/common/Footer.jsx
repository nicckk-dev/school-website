import React from 'react'
import { userSession } from '../../constants/UserConstant';
import PropTypes from 'prop-types';
const Footer = ({ footerBtnProps, comfooterClass }) => {
  // const userData = JSON.parse(sessionStorage.getItem("userData"));
  // const userData= JSON.parse(getSessionStorage("userData"));
  // const userData = userSession.userData;

  return (

    <footer>
      <div className={`footer1 ${comfooterClass ? "comfooter" : ""} bg-transparent border-none shadow-none`}>

        <div className="container-fluid">
          <div className="row justify-content-center">

            {/* {
                footerBtnProps &&
                footerBtnProps.map((item) => (

                  item.isVisible === true ? (

                    <div key={item.title} className={userData.ROLECODE === 1 ? "text-center white col-md-3 col-12" : "text-center white col-md-3 col-6 footstyle"}>
                      <div className="footbtn" onClick={item.handleClick}>{item.title}</div>
                    </div>
                  ) : ""
                ))
              } */}
            {
              footerBtnProps && footerBtnProps.map((btn, index) => (
                <React.Fragment key={index}>
                  {
                    btn.isVisible &&
                    < div className="text-center white col-md-2 col-6 footstyle">
                      <div className={btn.isDisabled === true ? "footbtn  disablebtn" : "footbtn"} onClick={btn.handleClick}>{btn.title}</div>
                    </div>
                  }
                </React.Fragment>
              ))
            }

          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer

Footer.propTypes = {
  comfooterClass: PropTypes.bool,
  footerBtnProps: PropTypes.any,
}