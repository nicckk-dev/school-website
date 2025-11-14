import { ArrowLeftOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
//import { useBasename } from '../../Hooks/Common/useBaseName';
const BackButton = (props) => {
  const navigate = useNavigate();
  //const baseUrlName = useBasename();
  const handleBack = async () => {
    debugger;
    if (props?.onBackClick) {
      const shouldProceed = await props.onBackClick();
      if (!shouldProceed) return; // Stop navigation if onBackClick resolves to false
    }
    if (props?.refreshPath) {
      let url = `/homewidget`;
      window.location.href = url;
      return;
    }
    if (props?.redirectPath) {
      const targetUrl = props?.queryString
        ? `${props.redirectPath}${props.queryString}`
        : props.redirectPath;
      navigate(targetUrl, { state: props?.locationState });
      return;
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="leftArrow">
      <ArrowLeftOutlined onClick={handleBack} />
      <span className="ps-3">{props?.title}</span>
    </div>
  );
};
export default BackButton;

BackButton.propTypes = {
  refreshPath: PropTypes.any,
  redirectPath: PropTypes.any,
  queryString: PropTypes.any,
  locationState: PropTypes.any,
  title: PropTypes.any,
};
