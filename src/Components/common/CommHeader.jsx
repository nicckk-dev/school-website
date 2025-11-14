import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons'
// import Search from 'antd/es/transfer/search';
import { Input } from 'antd';
import BackButton from './BackButton';
import { getPagePath } from '../../utils/common';
import { AES } from 'crypto-js';
import { getSessionStorage } from '../../utils/storageSecurity';
const { Search } = Input;


const CommHeader = (props) => {
    // console.log('props',props)
    const secretPass = "XkhZG4fW2t2W";
    const navigate = useNavigate();
    const location = useLocation();
    const statusData = JSON.parse(getSessionStorage("statusData"));
    //  const statusData = JSON.parse(AES.decrypt(sessionStorage.getItem("statusData") , secretPass).toString(enc.Utf8));
    // let statusData = null
    // if (statusData != null || undefined) {
    //     statusData = JSON.parse(AES.decrypt(sessionStorage.getItem("statusData"), secretPass).toString(enc.Utf8));
    // }
    // const statusData = statusSession.statusData;

    const summarry = (index) => {
        navigate(getPagePath({ moduleName: props.moduleName, pageName: "CalendarSummaryPage", queryString: "" }), { state: { ...location.state, calenderSummaryIndex: index, prevPath: location.pathname, prevSearch: location.search, url: location.state.url } });
    }
// console.log("props.queryString",props.queryString);
    const getReshceduleUrl = (mtpDate) => {

        navigate(getPagePath({ moduleName: props.moduleName, pageName: "ReschedulePage", queryString: "" }), { state: { ...location.state, url: mtpDate } });
        // if (props?.mtpDate) {         
        //     //return `/${props.moduleName}/ReschedulePage?date=${props.mtpDate}`
        //     const pageName="ReschedulePage";
        //     return `/${props.moduleName}/${pageName+"?"}`+ mtpDate
        // } else {
        //     return `/${props.moduleName}/ReschedulePage`
        // }
    }
    return (

    
            <header>
                <div className="subheader bg-transparent">
                    {/* <div className='leftArrow'><ArrowLeftOutlined onClick={() => navigate(-1, { state: { ...location.state, isUpdating: false } })} /><span className='ps-3'>{props.title}</span></div> */}
                    {/* <div className='leftArrow'><ArrowLeftOutlined onClick={() => navigate(`/${props?.moduleName}/${props?.pageName}/${props?.queryString}`, { state: { ...location.state, isUpdating: false } })} /><span className='ps-3'>{props.title}</span></div> */}

                    <BackButton title={props.title} redirectPath={props.queryString === undefined || props.queryString === "" ? props.backPath : props.backPath + "?"} queryString={(props.queryString === "" || props.queryString === undefined) ? location.search : AES.encrypt(JSON.stringify(props.queryString), secretPass).toString()} locationState={{ ...location.state, isUpdating: false, url: props.stateUrl }} />

                    {
                        props.isMutating && (statusData?.appstatus === "Rejected" || statusData?.appstatus === "Draft") &&
                        <>
                            <div className="Gicon text-dark d-inline-block" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='iconsClass'><PlusOutlined /></span>
                            </div>
                            <ul className="dropdown-menu dropdown-menu-end calendrdrop">
                                {
                                    props.moduleName === "MTP" && (props?.matrixCombination?.tothd === "Y" || props?.matrixCombination?.totfd === 'Y') &&
                                    // <li><div className="dropdown-item" role="button" onClick={() => navigate(`/${props.moduleName}/AddNCAPage?date=${props?.mtpDate}`, {

                                    <li><div className="dropdown-item"  role="button" onClick={() => navigate(getPagePath({ moduleName: props.moduleName, pageName: "AddNCAPage", queryString: "" }), {
                                        state: {
                                            isRedirectedFromGuide: location.state?.isRedirectedFromGuide,
                                            url: location.state?.url,
                                            dailyActivity: location.state.dailyActivity ? { ...location.state.dailyActivity } : null, missedDays: location.state.missedDays ? { ...location.state.missedDays } : null, missedPatch: location.state.missedPatch ? { ...location.state.missedPatch } : null, missedCall: location.state.missedCall ? { ...location.state.missedCall } : null, overLoaded: location.state.overLoaded ? { ...location.state.overLoaded } : null, underLoaded: location.state.underLoaded ? { ...location.state.underLoaded } : null, selectedPatch: location.state.selectedPatch ? { ...location.state.selectedPatch } : null, prevPath: location.pathname, prevSearch: location.search, isUpdating: false, ncaData: null, matrixCombination: props?.matrixCombination,
                                        }
                                    })}>PLAN NCA</div></li>
                                }
                                {
                                    props.moduleName === "MTP" && (props?.matrixCombination?.lhd === "Y" || props.matrixCombination?.lfd === "Y") &&
                                    <li><div className="dropdown-item" role="button" onClick={() => navigate(`/${props.moduleName}/AddLeavePage`, {
                                        state: {
                                            isRedirectedFromGuide: location.state?.isRedirectedFromGuide,
                                            url: `date=${props?.mtpDate}`,
                                            dailyActivity: location.state.dailyActivity ? { ...location.state.dailyActivity } : null, missedDays: location.state.missedDays ? { ...location.state.missedDays } : null, missedPatch: location.state.missedPatch ? { ...location.state.missedPatch } : null, missedCall: location.state.missedCall ? { ...location.state.missedCall } : null, overLoaded: location.state.overLoaded ? { ...location.state.overLoaded } : null, underLoaded: location.state.underLoaded ? { ...location.state.underLoaded } : null, selectedPatch: location.state.selectedPatch ? { ...location.state.selectedPatch } : null, prevPath: location.pathname, prevSearch: location.search, isUpdating: false, leaveData: null, matrixCombination: props?.matrixCombination,
                                        }
                                    })}>PLAN LEAVE</div></li>
                                }
                                {
                                    (props.matrixCombination !== undefined && props?.matrixCombination?.call === "Y" ? true : props.moduleName === "STP" ? true : false) &&
                                    <li><div className="dropdown-item" role="button" onClick={() => navigate(getPagePath({ moduleName: props.moduleName, pageName: "AddCustomersPage", queryString: "" }), {
                                        state: { isRedirectedFromGuide: location.state?.isRedirectedFromGuide, url: location.state.url, dailyActivity: location.state.dailyActivity ? { ...location.state.dailyActivity } : null, missedDays: location.state.missedDays ? { ...location.state.missedDays } : null, missedPatch: location.state.missedPatch ? { ...location.state.missedPatch } : null, missedCall: location.state.missedCall ? { ...location.state.missedCall } : null, overLoaded: location.state.overLoaded ? { ...location.state.overLoaded } : null, underLoaded: location.state.underLoaded ? { ...location.state.underLoaded } : null, selectedPatch: location.state.selectedPatch ? { ...location.state.selectedPatch } : null, prevPath: location.pathname, prevSearch: location.search, isUpdating: false }
                                    })}>PLAN CUSTOMERS</div></li>
                                }
                                {/* <li><div className="dropdown-item" role="button" onClick={() => dispatch(stpCustomerListModalActions.setModalState(true))}>PLAN CUSTOMERS</div></li> */}
                                <li><div className="dropdown-item" role="button" onClick={props.handleClick} >DELETE PLAN</div></li>
                            </ul>
                        </>
                    }

                    {
                        props.hasSubHeader &&
                        <div className='d-flex '>
                            <div className="Gicon text-white bg-color rounded-circle d-inline-block me-3" data-bs-toggle="dropdown" aria-expanded="false">
                                G
                            </div>
                            <ul className="dropdown-menu dropdown-menu-end calendrdrop">
                                {props?.summary.map((item, index) => (
                                    <li key={index} onClick={() => item.cnt === 0 ? null : summarry(index)} ><div role='button' className="dropdown-item"><span>{item.guidE_NAME}</span> <span className='sCount' style={{ backgroundColor: item.validatE_FLAG === 'Y' ? item.cnt > item.norM_VALUE ? "#dc3545" : "#7a7a7a" : item.cnt > item.norM_VALUE ? "#ffc107" : "#7a7a7a" }}>{item.cnt}</span></div></li>
                                ))}
                            </ul>
                            {
                                (statusData?.appstatus === "Rejected" || statusData?.appstatus === "Draft") &&
                                <>
                                    <div hidden={statusData?.appstatus === "Submitted" || statusData?.appstatus === "Approved"} className="Gicon text-dark d-inline-block" data-bs-toggle="dropdown" aria-expanded="false">
                                        <MoreOutlined className='fs-4' />
                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-end calendrdrop">

                                        <li><div tabIndex="0" className="dropdown-item" role="button" onClick={props.handleLoadClick}><span>LOAD FROM APPROVED STP</span> </div></li>
                                        <li><div tabIndex="0" className="dropdown-item" role="button"  onClick={() => getReshceduleUrl(`date=${props.mtpDate}`)}  ><span>RESCHEDULE</span></div></li>
                                        <li><div tabIndex="0" className="dropdown-item " role="button" onClick={props.handleClick}><span>RESET PLAN</span> </div></li>
                                    </ul>
                                </>
                            }

                        </div>
                    }
                    {
                        props?.isSearchVisible &&
                        
                            <div className='wrapserach'>
                                < Search
                                    placeholder="Search hear.."
                                    onChange={(e) => props?.setSearchQuery(e.target.value)}
                                />
                            </div>
                        
                    }
                </div>
            </header >
       
    )
}


// PropTypes for validation
CommHeader.propTypes = {
    title: PropTypes.string,
    queryString: PropTypes.string,
    backPath: PropTypes.string,
    stateUrl: PropTypes.string,
    moduleName: PropTypes.string,
    isMutating: PropTypes.bool,
    matrixCombination: PropTypes.object, 
    handleClick: PropTypes.func,
    handleLoadClick: PropTypes.func,
    mtpDate: PropTypes.string,
    hasSubHeader: PropTypes.bool,
    summary: PropTypes.arrayOf(PropTypes.object), 
    isSearchVisible: PropTypes.bool,
    setSearchQuery: PropTypes.func,
};

// Default props
CommHeader.defaultProps = {
    isMutating: false,
    hasSubHeader: false,
    isSearchVisible: false,
    summary: [],
};

export default CommHeader