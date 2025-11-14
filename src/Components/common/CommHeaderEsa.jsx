import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MoreOutlined, FilterFilled, DownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Image, Button } from 'antd';
import BackButton from './BackButton';
import { useForm } from 'antd/lib/form/Form';
import { messageSerivce } from '../../api/CommonApi';
import { useDispatch } from 'react-redux';
import BudgetModal from '../modules/Intervention/BudgetModal'
import excelImage from '../../assets/images/excel-image2.png';
import { FilterModal } from '../modules/Intervention/FilterModal';
import { IntvCss } from './GlobalStyle';
import { getSessionStorage } from '../../utils/storageSecurity';
import PropTypes from 'prop-types';
const { Search } = Input;


const CommHeaderEas = (props) => {
    const [form] = useForm();
    //const secretPass = "XkhZG4fW2t2W";
    const location = useLocation();
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(excelImage);
    const [filterModal, setFilterModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()    

    useEffect(() => {
        if (props.getBudgtData) {

            if (props.getBudgtData?.assignedbudget === null && props.getBudgtData?.availablebudget === null) {
                return dispatch(messageSerivce({ messageType: "error", messageContent: "No Data Found !" }));
            }
            else {
                form.setFieldsValue({
                    HOAssignedBudget: props.getBudgtData?.assignedbudget,
                    HOAvailableBudget: props.getBudgtData?.availablebudget,
                });
            }
        }
    }, [props.getBudgtData, form]);
    useEffect(() => {
        if (!props.isModalOpen) {
            form.setFieldsValue({
                year: '',
                month: '',
                HOAssignedBudget: '',
                HOAvailableBudget: '',
                bu: ''
            });
        }
    }, [props.isModalOpen, form]);

    const [inputField, setInputField] = useState({
        year: '',
        month: '',
        HOAssignedBudget: '',
        HOAvailableBudget: '',
        bu: ''
    })

    const handleCommonChange = (field, value) => {
        if (field === 'bu') {
            setInputField((prev) => ({
                ...prev,
                [field]: value,
            }));
            form.setFieldsValue({
                HOAssignedBudget: '',
                HOAvailableBudget: '',
                year: '',
                month: ''
            })
        }
        if (field === 'year') {
            setInputField((prev) => ({
                ...prev,
                [field]: value,
            }));
            form.setFieldsValue({
                HOAssignedBudget: '',
                HOAvailableBudget: '',
            })
        }
        else if (field === 'month') {
            setInputField((prev) => ({
                ...prev,
                [field]: value,
            }));
            form.setFieldsValue({
                year: '',
                HOAssignedBudget: '',
                HOAvailableBudget: '',
            })
        }

        setInputField((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const redirectNext = (page) => {
        if (page == "VendorLog") {
            navigate('/Intv/SearchVendor', { state: { ...location.state } });
        }
        else if (page == "AssoVendorLog") {
            navigate('/Intv/AssoSearchVendor', { state: { ...location.state } });
        }
    }
    const handleNewRequest = () => {
        let navObj = {
            "flag": "N",
            "mode": "REQ",
            "modeflag": "1",
            SalesFlag: props.salesFlagData
        }
        navigate('/Intv/InterventionRequest', { state: navObj });
    }
    const getArrayData = props.visitorEmpdata
    return (
        <header>
            <div className={`${IntvCss['easHeader']}`}>
                <BackButton title={props.title} redirectPath={props.backPath || '/Intv'}
                    locationState={{ ...location.state, isUpdating: false }} refreshPath={props?.refreshPath}
                />
                <div className='d-flex flex-row align-items-center'>
                    {
                        (props.pagename === 'Intv' || props.pagename === 'EmpAttendee' || props.pagename === 'SpeakersList' || props.pagename === 'VisitorTagging' || props.pagename === 'SpeakerDetails' || props.pagename === 'BrandAllocation' || props.pagename === 'VendorLog' || props.pagename === 'AssoVendorLog' || props.pagename === "SmartContract") &&
                        <div className='wrapserachwhite mx-3'>
                            <Search
                                value={props?.searchQuery}
                                placeholder="Search here..."
                                onChange={(e) => props?.handleSearch(e.target.value)}
                            />
                        </div>
                    }
                    {
                        props.pagename === 'Intv' && (
                            <>
                                <Button type="text" size="small" className='text-white' onClick={handleNewRequest}>
                                    NEW REQUEST
                                </Button>
                                <div>
                                    <div className="IntvDropdown mx-2 d-flex justify-content-center align-items-center">
                                        <span role="img">
                                            <FilterFilled className='fs-6 cursor' onClick={() => setFilterModal(true)} />
                                        </span>
                                        <div className='ms-3' data-bs-toggle="dropdown" aria-expanded="false">
                                            <MoreOutlined className={`fs-5 cursor  ${IntvCss['stroke-white']}`} />
                                        </div>
                                        <ul className="dropdown-menu dropdown-menu-end calendrdrop">
                                            <li onClick={() => setIsModalOpen(true)}><div role='button' className="dropdown-item"><span>Budget Guide</span></div></li>
                                        </ul>
                                    </div>
                                </div>
                                <FilterModal open={filterModal} setOpen={setFilterModal}
                                    intvData={props?.intvData} setIntvData={props?.setIntvData}
                                    statusData={props?.statusData}
                                />
                                <BudgetModal
                                    open={isModalOpen}
                                    onCancel={() => setIsModalOpen(false)}
                                    onFinish={props.handleOk}
                                    bu={inputField.bu}
                                    getBuData={props.getBuData}
                                    form={form}
                                    handleCommonChange={handleCommonChange}
                                    getBudgetDetails={props.getBudgetDetails}
                                    month={inputField.month}
                                    year={inputField.year}
                                    HOAssignedBudget={inputField.HOAssignedBudget}
                                    HOAvailableBudget={inputField.HOAvailableBudget}
                                    showBudgetFetch={props.showBudgetFetch}
                                />
                            </>
                        )
                    }

                    {props.pagename === "visitorCount" &&
                        <div>
                            <div className="IntvDropdown">
                                <span aria-label="more" className="anticon anticon-more fs-4" data-bs-toggle="dropdown" aria-expanded="false">
                                    <MoreOutlined className='fs-4' />
                                </span>
                                <ul className="dropdown-menu dropdown-menu-end calendrdrop">
                                    {
                                        props.vistorMaindata?.redirections.map(((obj, i) => {
                                            return (
                                                <li key={i}><div className="dropdown-item" role="button" onClick={() => props.getUrldata(obj.paramName)} ><span>{obj.paramName}</span> </div></li>
                                            )
                                        }))
                                    }
                                </ul>
                            </div>
                        </div>
                    }

                    {props.pagename === "vistorCountEmp" &&
                        <div>

                            <div className="IntvDropdown  ">

                                <span role="img" aria-label="more" className="anticon anticon-more fs-4" data-bs-toggle="dropdown" aria-expanded="false">
                                    <MoreOutlined className='fs-4' />
                                </span>

                                <ul className="dropdown-menu dropdown-menu-end calendrdrop">
                                    {
                                        getArrayData?.redirections.map(((obj, i) => {
                                            return (

                                                <li key={i}><div className="dropdown-item" role="button" onClick={() => props.getUrldata(obj.paramName)} ><span>{obj.paramName}</span> </div></li>
                                            )
                                        }))
                                    }
                                    {/* <li><div className="dropdown-item" role="button" onClick={props.getCustomersUrl} ><span>Add Employee</span></div></li> */}
                                    {/* <li><div className="dropdown-item " role="button" ><span>Add Unlisted Employee</span> </div></li> */}

                                </ul>
                            </div>
                        </div>
                    }
                    {props.pagename === "SpeakerDetails" &&
                        <div role='button' className='mx-2' onClick={props.downloadIcon}><DownloadOutlined className='fs-4' /></div>
                    }
                    {(props.pagename === "VendorLog" || props.pagename === 'AssoVendorLog') &&
                        <div onClick={() => redirectNext(props.pagename)}><PlusOutlined className='me-2 fs-4' /></div>
                    }
                    {(props.pagename === "VendorLog" || props.pagename === 'AssoVendorLog') &&
                        <div role='button' onClick={props.downloadIcon} className="d-flex justify-content-center ms-2">
                            <Image preview={imageSrc !== excelImage} src={excelImage} width={22} className='imgwhite' />
                        </div>
                    }
                    {props.pagename === "SpeakerDetails" &&
                        <div>
                            <div className="IntvDropdown">
                                <span role="img" aria-label="more" className="anticon anticon-more fs-4" data-bs-toggle="dropdown" aria-expanded="false">
                                    <MoreOutlined className='fs-4' />
                                </span>
                                <ul className="dropdown-menu dropdown-menu-end calendrdrop">
                                    <li><button className="dropdown-item" onClick={props.getuploadurl} ><span>Bulk Upload</span></button></li>
                                </ul>
                            </div>
                        </div>
                    }
                    {((props.pagename === "VisitorTagging" && props.locationData?.SalesFlag !== 1) || props.pagename === "SearchVendor" || props.pagename === "IntvPayment") &&
                        <button className='btnlink text-white' onClick={props.filterIcon}><FilterFilled className='fs-5 ' /></button>
                    }
                    {
                        props.pagename == 'compattendee' && (
                            <>
                                <div className='ms-2 mt-1' data-bs-toggle="dropdown" aria-expanded="false">
                                    <MoreOutlined className={`fs-5 cursor  ${IntvCss['stroke-white']}`} />
                                </div>
                                <ul className="dropdown-menu dropdown-menu-end calendrdrop">
                                    {
                                        props?.moreList?.map((item, index) => (
                                            <li key={item?.title.length + index}><div role='button' className="dropdown-item" onClick={item?.onListClick}><span>{item?.title}</span></div></li>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                    }
                    {props.pagename === "SmartContract" &&
                        <div>
                            <div className="IntvDropdown">
                                <span role="img" aria-label="more" className="anticon anticon-more fs-4" data-bs-toggle="dropdown" aria-expanded="false">
                                    <MoreOutlined className={`fs-5 cursor  ${IntvCss['stroke-white']}`} />
                                </span>
                                <ul className="dropdown-menu dropdown-menu-end calendrdrop">

                                    {
                                        (props.locationData?.AssnFlg === 'A' && props.locationData?.speakerwithevent === 'EWOD')
                                            ?
                                            <li><div className="dropdown-item" role="button" onClick={props.AddUlAssVendor} ><span>Unlisted Assoiciation Vendor</span></div></li>
                                            :
                                            <>
                                                {
                                                    props.locationData?.AssnFlg !== null && (
                                                        <li><div className="dropdown-item" role="button" onClick={props.AddUlAssVendor} ><span>Unlisted Assoiciation Vendor</span></div></li>
                                                    )
                                                }
                                                <li><div className="dropdown-item" role="button" onClick={props.HCPAdd} ><span>Add HCP Customer</span></div></li>
                                                {
                                                    props.locationData?.SalesFlag !== 1 && (

                                                        <li><div className="dropdown-item" role="button" onClick={props.BulkUploadFnt} ><span>Bulk Upload</span></div></li>
                                                    )
                                                }
                                            </>

                                    }
                                    {/* {
                                        props.locationData?.AssnFlg &&
                                            (
                                                (props.locationData.AssnFlg === 'A' && props.locationData.speakerwithevent === 'EWOD') ||
                                                props.locationData.AssnFlg !== null
                                            ) ? (
                                            <li>
                                                <div className="dropdown-item" role="button" onClick={props.AddUlAssVendor}>
                                                    <span>Unlisted Association Vendor</span>
                                                </div>
                                            </li>
                                        ) : (
                                            <>
                                                {props.locationData?.AssnFlg !== null && (
                                                    <li>
                                                        <div className="dropdown-item" role="button" onClick={props.AddUlAssVendor}>
                                                            <span>Unlisted Association Vendor</span>
                                                        </div>
                                                    </li>
                                                )}
                                                <li>
                                                    <div className="dropdown-item" role="button" onClick={props.HCPAdd}>
                                                        <span>Add HCP Customer</span>
                                                    </div>
                                                </li>
                                                {props.locationData?.SalesFlag !== 1 && (
                                                    <li>
                                                        <div className="dropdown-item" role="button" onClick={props.BulkUploadFnt}>
                                                            <span>Bulk Upload</span>
                                                        </div>
                                                    </li>
                                                )}
                                            </>
                                        )
                                    } */}

                                </ul>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </header >
    )
}

CommHeaderEas.defaultProps = {
    isMutating: false,
    hasSubHeader: false
}

CommHeaderEas.propTypes = {
    getBudgtData: PropTypes.any,
    isModalOpen: PropTypes.any,
    salesFlagData: PropTypes.any,
    visitorEmpdata: PropTypes.any,
    backPath: PropTypes.any,
    title: PropTypes.any,
    pagename: PropTypes.any,
    searchQuery: PropTypes.any,
    handleSearch: PropTypes.func,
    intvData: PropTypes.any,
    setIntvData: PropTypes.any,
    statusData: PropTypes.any,
    handleOk: PropTypes.any,
    getBuData: PropTypes.any,
    getBudgetDetails: PropTypes.any,
    showBudgetFetch: PropTypes.any,
    vistorMaindata: PropTypes.any,
    getUrldata: PropTypes.any,
    downloadIcon: PropTypes.any,
    getuploadurl: PropTypes.any,
    locationData: PropTypes.any,
    filterIcon: PropTypes.any,
    moreList: PropTypes.any,
    AddUlAssVendor: PropTypes.any,
    HCPAdd: PropTypes.any,
    BulkUploadFnt: PropTypes.any,
}

export default CommHeaderEas