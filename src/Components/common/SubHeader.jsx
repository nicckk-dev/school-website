import { DeleteFilled, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import React from "react";
import BackButton from "./BackButton";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import Search from "antd/es/input/Search";

const SubHeader = (props) => {
  const location = useLocation();
  return (
    <header>
      <div className="headerColor">
        <BackButton
          title={props.title}
          redirectPath={props.backPath}
          onBackClick={props?.onBackClick}
          locationState={{ ...location.state, isUpdating: false }}
        />
        {/* <div className='leftArrow'><ArrowLeftOutlined onClick={props.onBack} /><span className='ps-3'>{props.title}</span></div> */}
        <div className="d-flex flex-row align-items-center">
          {props?.isSearchVisible && (
            <div className="wrapserachwhite">
              <Search
                placeholder="Search hear.."
                onChange={(e) => props?.handleSearch(e.target.value)}
              />
            </div>
          )}
          {props.pagename === "brandmaster" && (
            <button
              className="text-white small me-3 btnlink"
              onClick={props.handleProperties}
            >
              PROPERTIES{" "}
            </button>
          )}
          {props.pagename === "landBrandMaster" && (
            <button
              className="text-white small me-3 btnlink"
              onClick={props.handleProperties}
            >
              Default Groups{" "}
            </button>
          )}
          {(props.pagename === "MasterLevel" ||
            props.pagename === "brandmaster" || props.pagename === "landBrandMaster") && (
            <button className="btnlink" onClick={props.handleAdd}>
              <PlusOutlined className="fs-4 text-white" />
            </button>
          )}
          {props.pagename === "deptForm" && (
            <button className="btnlink" onClick={props.handleDelete}>
              <DeleteFilled className="fs-5 text-white" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

SubHeader.propTypes = {
  title: PropTypes.any,
  backPath: PropTypes.any,
  handleAdd: PropTypes.any,
  pagename: PropTypes.any,
  handleProperties: PropTypes.any,
  handleDelete: PropTypes.any,
};

export default SubHeader;
