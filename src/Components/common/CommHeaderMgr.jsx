import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons'
// import Search from 'antd/es/transfer/search';
import { Input } from 'antd';
import BackButton from './BackButton';
import { getPagePath, getPagemgrPath } from '../../utils/common';
import { AES } from 'crypto-js';
import { checkVisibility, convertYYYYMMDDToMMYYYY } from '../../utils/mgrMtp';
import { getSessionStorage } from '../../utils/storageSecurity';
import PropTypes from 'prop-types';
const { Search } = Input;


const CommHeaderMgr = (props) => {
    const secretPass = "XkhZG4fW2t2W";
    const navigate = useNavigate();
    const location = useLocation();
    // const statusData = JSON.parse(sessionStorage.getItem("statusData"));
    const statusData = JSON.parse(getSessionStorage("statusData"));
    const PlanDate = JSON.parse(getSessionStorage("PlanDate"));
    console.log("Location", location.search);

    const summarry = (index, item) => {
        navigate(getPagePath({ moduleName: props.moduleName, pageName: `CalendarSummaryPage`, queryString: "" }), { state: { ...location.state, calenderSummaryIndex: index, CodeNo: item.guidE_CODE, prevPath: location.pathname, prevSearch: location.search, url: AES.encrypt(JSON.stringify(`Code=${item.guidE_CODE}`), secretPass).toString() } });
    }

    // const getReshceduleUrl = () => {
    //     if (props?.mtpDate) {
    //         return `/${props.moduleName}/ReschedulePage?date=${props.mtpDate}`
    //     } else {
    //         return `/${props.moduleName}/ReschedulePage`
    //     }
    // }
    return (

        <header>
            <div className="subheader">

                <BackButton title={props.title} redirectPath={props.backPath} refreshPath={props?.refreshPath} queryString={props.queryString} locationState={{ ...location.state, isUpdating: false, url: props.stateUrl }} />
                {
                    props.isMutating && (statusData.appstatus === "Rejected" || statusData.appstatus === "Draft") && checkVisibility(convertYYYYMMDDToMMYYYY(PlanDate)) === true &&
                    <>
                        <div className="Gicon text-dark d-inline-block" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='iconsClass'><PlusOutlined /></span>
                        </div>
                        <ul className="dropdown-menu dropdown-menu-end calendrdrop">

                            {
                                props.moduleName === "PlanningManager" && (props?.matrixCombination?.tothd === "Y" || props?.matrixCombination?.totfd === 'Y') &&

                                <>
                                    <li><div className="dropdown-item" role="button" onClick={() => navigate(getPagemgrPath({ moduleName: props.moduleName, pageName: "AddNCAPage", queryString: "" }), {
                                        state: {
                                            isRedirectedFromGuide: location.state?.isRedirectedFromGuide,
                                            url: location.state.url,
                                            dailyActivity: location.state.dailyActivity ? { ...location.state.dailyActivity } : null, missedDays: location.state.missedDays ? { ...location.state.missedDays } : null, missedPatch: location.state.missedPatch ? { ...location.state.missedPatch } : null, missedCall: location.state.missedCall ? { ...location.state.missedCall } : null, overLoaded: location.state.overLoaded ? { ...location.state.overLoaded } : null, underLoaded: location.state.underLoaded ? { ...location.state.underLoaded } : null, selectedPatch: location.state.selectedPatch ? { ...location.state.selectedPatch } : null, prevPath: location.pathname, prevSearch: location.search, isUpdating: false, ncaData: null, matrixCombination: props?.matrixCombination

                                        }
                                    })}>PLAN NCA</div></li>
                                    <li><div className="dropdown-item" role="button" onClick={() => navigate(getPagemgrPath({ moduleName: props.moduleName, pageName: "ManagerHierarchy", queryString: "" }), {
                                        state: {
                                            isRedirectedFromGuide: location.state?.isRedirectedFromGuide, url: location.state.url,
                                            dailyActivity: location.state.dailyActivity ? { ...location.state.dailyActivity } : null, missedDays: location.state.missedDays ? { ...location.state.missedDays } : null, missedPatch: location.state.missedPatch ? { ...location.state.missedPatch } : null, missedCall: location.state.missedCall ? { ...location.state.missedCall } : null, overLoaded: location.state.overLoaded ? { ...location.state.overLoaded } : null, underLoaded: location.state.underLoaded ? { ...location.state.underLoaded } : null, selectedPatch: location.state.selectedPatch ? { ...location.state.selectedPatch } : null, prevPath: location.pathname, prevSearch: location.search, isUpdating: false, ncaData: null, matrixCombination: props?.matrixCombination,
                                        }
                                    })}>PLAN JOINT WORK</div></li>
                                </>
                            }
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
                            {props?.summary?.map((item, index) => (
                                <li key={index} onClick={() => item.cnt === 0 ? null : summarry(index, item)} ><div role='button' className="dropdown-item"><span>{item.guidE_NAME}</span> <span className='sCount' style={{ backgroundColor: item.validatE_FLAG === 'Y' ? item.cnt > item.norM_VALUE ? "#dc3545" : "#7a7a7a" : item.cnt > item.norM_VALUE ? "#ffc107" : "#7a7a7a" }}>{item.cnt}</span></div></li>
                            ))}
                        </ul>
                        {
                            (statusData.appstatus === "Rejected" || statusData.appstatus === "Draft") && checkVisibility(convertYYYYMMDDToMMYYYY(PlanDate)) === true &&
                            <>
                                <div hidden={statusData.appstatus === "Submitted" || statusData.appstatus === "Approved"} className="Gicon text-dark d-inline-block" data-bs-toggle="dropdown" aria-expanded="false">
                                    <MoreOutlined className='fs-4' />
                                </div>
                                <ul className="dropdown-menu dropdown-menu-end calendrdrop">
                                    {
                                        <>

                                            <li><div className="dropdown-item " role="button" onClick={props.handleClick}><span>RESET PLAN</span> </div></li> </>
                                    }



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

CommHeaderMgr.defaultProps = {
    isMutating: false,
    hasSubHeader: false
}

CommHeaderMgr.propTypes = {
    moduleName: PropTypes.any,
    title: PropTypes.any,
    backPath: PropTypes.any,
    refreshPath: PropTypes.any,
    queryString: PropTypes.any,
    stateUrl: PropTypes.any,
    isMutating: PropTypes.any,
    matrixCombination: PropTypes.any,
    handleClick: PropTypes.func,
    hasSubHeader: PropTypes.any,
    summary: PropTypes.any,
    isSearchVisible: PropTypes.any,
    setSearchQuery: PropTypes.func,
}



export default CommHeaderMgr