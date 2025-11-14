import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const HeaderLayer = (props) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (props?.onBack) {
      props?.onBack();
    }
    if (props?.refreshPath) {
      let url = `/homewidget`;
      window.location.href = url;
      return;
    }
    if (props?.redirectPath) {
      navigate(props?.redirectPath, { state: props?.stateObj });
    } else {
      navigate(-1);
    }
  };
  return (
    <>
      {/* <header>
                <div className="headerColor">
                    <div className='leftArrow fs-16'>
                        <ArrowLeftOutlined onClick={handleBack} />
                        <span className='ps-3'>{props.title}</span>
                    </div>
                    {
                        props.customJsx && props?.customJsx()
                    }
                </div>
            </header> */}
      <div className="page-header pe-0">
        <div className="leftArrow fs-16 d-flex">
          {!props.hideBackArrow && <ArrowLeftOutlined onClick={handleBack} />}
          {/* <span className='ps-3'>{props.title}</span> */}
          <h6 className={`m-0 fw-bold ${!props.hideBackArrow ? "ps-3" : ""}`}>
            {props.title}
          </h6>
        </div>
        <div className="text-end d-flex align-items-center">
          {props.onAddClick && (
            // props?.addBtn ? (
            //     <button
            //         onClick={props?.onAddClick}
            //         className={"btnlink addlinkbtn me-3"}
            //     >
            //         <PlusOutlined /> ADD
            //     </button>
            // )
            //     :
            //     (
            //         <button className="btnlink ms-auto"><PlusOutlined onClick={props?.onAddClick} className="fs-4 text-black fr" /></button>
            //     )
            <button
              onClick={props?.onAddClick}
              className={"btnlink addlinkbtn"}
            >
              <PlusOutlined /> ADD
            </button>
          )}
          {props.customJsx && props?.customJsx}
        </div>
      </div>
    </>
  );
};

HeaderLayer.propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.any,
  redirectPath: PropTypes.any,
  stateObj: PropTypes.any,
  refreshPath: PropTypes.any,
  customJsx: PropTypes.any,
  hideBackArrow: PropTypes.any,
  onAddClick: PropTypes.any,
  addBtn: PropTypes.any,
};

HeaderLayer.defaultValues = {
  hideBackArrow: false,
};
