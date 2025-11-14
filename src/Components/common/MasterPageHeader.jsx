import { Avatar, Card, Col, Divider, Drawer, Dropdown, Menu, Popover, Row, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import logoPic from '../../assets/images/phy_webbglogo.png';

import { CheckCircleOutlined, DoubleLeftOutlined, DoubleRightOutlined, EditOutlined, MailOutlined, MenuOutlined, PhoneOutlined } from '@ant-design/icons';

import useExpiryTime from '../../Hooks/Auth/useExpiryTime';
import { userSession } from '../../constants/UserConstant';
import { TbLogout, TbUserCircle } from "react-icons/tb";
import { FaUserCircle } from 'react-icons/fa';
import Expiration from './Expiration';
import PropTypes from 'prop-types';
import { Typography } from "antd";
import { FetchAllDivisions, FetchAllLocations, GetAllUserByRecode } from '../../api/MasterAdminApi';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import img1 from '../../assets/images/R.png'
const { Text } = Typography;

const userData = userSession.userData;
const Naimenu = sessionStorage.getItem('navigatemenu');

// console.log(userData , "userData");





const MasterPageHeader = (props) => {
    const navigate = useNavigate();
    const EditRedirection = () => {
        debugger;
        navigate('/userProfile/', { state: { flag: false } })
    }

    const items = [

        {
            label: (
                <button onClick={EditRedirection} className='py-2 btnlink' >Profile &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
            ),
            icon: (<TbUserCircle className='me-2 fs-6' />),
        },
        // {
        //     label: (
        //         <Link to="/ResetPassword" > Reset Password</Link>
        //     ),
        //     icon: (<TbKey className='me-2 fs-6' />),
        //     key: 'ChangePassword',
        // },
        {
            label: (
                <Link to="/" className='py-2' >Logout &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>

            ),
            icon: (<TbLogout className='me-2 fs-6' />),
            key: 'logout',
        },

    ];

    // const authState = useSelector(state => state.auth);
    // const menus = useSelector(state => state.menu.menus);
    // const expiryTime = useLoaderData();
    const expiryTime = useExpiryTime();
    // const [open, setOpen] = useState(false);
    // const [menuData, setMenuData] = useState();


    // const statusData = JSON.parse(getSessionStorage("statusData"));
    // const statusData = statusSession.statusData;

    // const carryFlag = sessionStorage.getItem('carryFlag');

    // const { data: menu, error, isLoading } = useQuery({
    //     queryKey: ["fetchMenus"],
    //     queryFn: fetchMenus,
    //     enabled: !carryFlag
    // });

    // const menus = [...menu?.data.resultSet]

    // useEffect(() => {
    //     setMenus(menu?.data.resultSet)
    // }, [menu?.data.resultSet]);

    const recursiveData = (item) => {
        return {
            key: item.menucode,
            label: item.title,
            icon: item.iconclass === null ? <i className="ti ti-player-record"></i> :
                <i style={{ fontSize: "18px" }} className={item.iconclass}></i>,
            // icon: <TbHome className='fw-bold' />,
            children: item.submenu && item.submenu.length > 0 ? item.submenu.map(recursiveData) : null
        }
    }

    /* temporary solution with encryption
     const autoLogin = () => {
         const loginCreds = {
             carryFlag: "mobile",
             data: {
                 CLIENTID: userData?.CLIENTID,
                 REPSNAME: "Aditya Test",
                 PWD: "aaaa",
             },
             stpFlag: "1",
             entryNo: 1415,
             txnEntryNo: "2887695",
         }
         sessionStorage.setItem('clientId', loginCreds.data.CLIENTID);
         const key = "MY SUPER SECRET KEY";
         const encodedUrl = CryptoJS.AES.encrypt(JSON.stringify(loginCreds), key).toString().replace(/\//g, '.');
         // navigate(`/auth/${encodedUrl}`);
         window.open(`http://localhost:3000/ReactApp/auth/${encodedUrl}`, "", "popup")
 
     } */


    //temporary solution with base64 encoding
    // const autoLogin = () => {
    //     const uidArr = [props.menus?.menucode, "Admin", "Admin", `${userData?.CLIENTID}`, "1855", "Aug-2023", "2888145", JSON.stringify(location)];
    //     sessionStorage.setItem('clientId', userData?.CLIENTID);
    //     const b64EncodedUID = uidArr.map(item => string_to_b64(item)).join().replace(/,/g, '^');
    //     window.open(`${window.location.origin}/ReactApp/?HF=N&UID=${b64EncodedUID}`, "", "popup")
    // }

    // const handleMenuItemClick = (e) => {
    //     const menuItem = findNestedObject(props.menus, e.key);
    //     setMenuData(menuItem);
    //     let q_string;
    //     let stateObject = {};
    //     let first_path;

    //     if (menuItem?.path === null) {
    //         return navigate('/home');
    //     }
    //     else {
    //         q_string = menuItem?.path?.split('?');
    //         first_path = q_string?.shift();

    //         q_string[0]?.split('&')?.forEach((str) => {
    //             stateObject[str?.split('=')[0]] = str?.split('=')[1]
    //         })

    //         return (


    //             menuItem?.path?.includes('?') ? navigate(first_path, { state: stateObject }) : navigate(menuItem.path),
    //             setOpen(false)
    //         );
    //     }

    // }

    // Mock profile data
    const mockProfile = {
        name: "Prakash Patil",
        role: "Field Sales Officer",
        phone: "9046461976",
        email: "prakashpatil@xyz.com",
        empId: "E125474",
        joiningDate: "22 September 2016",
        division: "Zoltan Max",
        taskforce: "Taskforce 1",
        reportingTo: "Advik Sharma",
        workingAt: "Mumbai 1098",
        avatar: "https://static.vecteezy.com/system/resources/thumbnails/053/630/749/small/a-beautiful-young-business-woman-in-a-suit-and-tie-photo.jpeg" // You can replace with real image URL
    };

    const [getProfileData, setProfileData] = useState(null)
    const [locationData, setLocationData] = useState({});
    const [divisionData, setDivisionData] = useState([]);
    const [userByRepcode, setuserByRepcode] = useState([]);
    const [hierarchicalData, setHierarchicalData] = useState([]);

    const { isFetching: getAllUserByRecodeLoad } = useQuery({
        queryFn: () => GetAllUserByRecode(),
        queryKey: ['getAllUserByRecode'],
        select: (response) => response.data,
        // enabled: !!getConfigData.length,
        onSuccess: (response) => {
            if (response?.data?.length > 0) {
                const user = response.data[0];
                console.log('sssssss111111', user)
                setProfileData(user)
                setuserByRepcode(user)

            }
        }

    });

    const { isFetching: isFetchAllLocations } = useQuery({
        queryFn: () => FetchAllLocations(userByRepcode),
        queryKey: ['FetchAllLocations'],
        select: (response) => response.data,
        enabled: !!userByRepcode && Object.keys(userByRepcode).length > 0,
        onSuccess: (response) => {
            // debugger
            if (response) {
                let locaData = Array.isArray(response?.data) ? response?.data?.map((item) => ({
                    PARAMNAME: item.name,
                    PARAMCODE: item.code,
                    reportingTo: item.reportingTo,
                    taskforces: Array.isArray(item?.taskforce)
                        ? item.taskforce.map(tf => ({ taskforce: tf.name }))
                        : item?.taskforce?.name
                            ? [{ taskforce: item.taskforce.name }]
                            : []
                })) : []
                setLocationData(locaData);
            }
        }
    })
    const { isFetching: isFetchAllDivisions } = useQuery({
        queryFn: () => FetchAllDivisions(userByRepcode),
        queryKey: ['FetchAllDivisions'],
        select: (response) => response.data,
        enabled: !!userByRepcode && Object.keys(userByRepcode).length > 0,
        onSuccess: (response) => {
            // // // debugger
            if (response) {
                setDivisionData(response?.data || []);
            }
        }
    })

    useEffect(() => {
        // // debugger;
        if (locationData?.length && userByRepcode) {
            const userDivisionCodes = userByRepcode?.orgpositioncode
                ? userByRepcode?.orgpositioncode.split(",").map(c => parseInt(c))
                : [];

            const userDivisionNames = userByRepcode?.orgpositioncodename
                ? userByRepcode?.orgpositioncodename.split(",")
                : [];

            const userGeoCodes = userByRepcode?.geocode
                ? userByRepcode?.geocode.split(",").map(c => parseInt(c))
                : [];

            const filteredDivisions = divisionData.length
                ? divisionData.filter(div => userDivisionCodes.includes(div.PARAMCODE))
                : [];

            const filteredLocations = locationData.filter(loc =>
                userGeoCodes.includes(loc.PARAMCODE)
            );

            const salesData = transformDivisionLocationData(filteredDivisions, filteredLocations, userByRepcode);

            const nonSalesData = userDivisionCodes
                .map((code, idx) => {
                    const existsInDiv = divisionData?.some(d => d.PARAMCODE === code);
                    if (!existsInDiv) {
                        return {
                            department: userByRepcode?.deptcodename,
                            orgposition: userDivisionNames[idx],
                            reportingTo: locationData[0]?.reportingTo?.name
                        };
                    }
                    return null;
                })
                .filter(Boolean);

            const finalData = [...salesData, ...nonSalesData];
            setHierarchicalData(finalData);
        }
    }, [divisionData, locationData, userByRepcode]);
    const transformDivisionLocationData = (divisions, locations, userByRepcode) => {
        debugger
        const userDivisionCodes = userByRepcode?.orgpositioncode
            ? userByRepcode?.orgpositioncode?.split(",")?.map(c => parseInt(c))
            : [];
        const userGeoCodes = userByRepcode?.geocode
            ? userByRepcode?.geocode?.split(",")?.map(c => parseInt(c))
            : [];

        return divisions
            .filter(div => userDivisionCodes.includes(div.PARAMCODE))
            .map((div, index) => {
                const matchedLocations = locations?.filter(
                    loc => userGeoCodes.includes(loc.PARAMCODE)
                );

                if (matchedLocations.length > 0) {
                    debugger
                    //SALES USER
                    return {
                        division: div.PARAMNAME,
                        divisioncode: div.PARAMCODE,
                        locations: matchedLocations?.map((loc, locIndex) => ({
                            geoname: loc?.PARAMNAME,
                            taskforces: loc?.taskforce
                                ? loc.taskforce.map(tf => ({
                                    taskforce: tf.name
                                }))
                                : [],
                            reportingTo: loc?.reportingTo?.name || "N/A"
                        }))
                    };
                } else {
                    //NON-SALES USER
                    return {
                        department: div.PARAMNAME,
                        orgposition: "Division Head",
                        reportingTo: div.reportingTo?.name || "N/A"
                    };
                }
            });
    };
    console.log('hierarchicalData', hierarchicalData, getProfileData)
    // const ProfileCard = () => (
    //     <Card className="profile-card">
    //         {/* Header */}
    //         <div className="profile-header">
    //             <div className="profile-avatar-wrapper" onClick={EditRedirection}>
    //                 <Avatar src={getProfileData?.upimgurl} size={90} />
    //                 <div className="edit-icon">
    //                     <EditOutlined />
    //                 </div>
    //             </div>
    //         </div>

    //         {/* Name & Role */}
    //         <div className="profile-info">
    //             <Text strong>
    //                 {getProfileData?.repname || "-"}{" "}
    //                 <CheckCircleOutlined style={{ color: "#4caf50" }} />
    //             </Text>
    //             <br />
    //             <Text type="secondary">{mockProfile?.desgcodename || "-"}</Text>
    //         </div>

    //         {/* Contact */}
    //         <Divider className="profile-divider" />
    //         <Space size="small" className="profile-contact">
    //             <Link
    //                 href={`tel:${getProfileData?.offmobileno || ""}`}
    //                 className="profile-value2"
    //             >
    //                 <PhoneOutlined /> {getProfileData?.offmobileno || "-"}
    //             </Link>
    //             <Link
    //                 href={`mailto:${getProfileData?.offmailid || ""}`}
    //                 className="profile-value2"
    //             >
    //                 <MailOutlined /> {getProfileData?.offmailid || "-"}
    //             </Link>
    //         </Space>

    //         {/* Details */}
    //         <Divider className="profile-divider" />
    //         <Row>
    //             {/* Employee ID */}
    //             <Col span={12}>
    //                 <Text className="profile-label">Emp Id</Text>
    //             </Col>
    //             <Col span={12}>
    //                 <Link className="profile-value">
    //                     {getProfileData?.empcode || "-"}
    //                 </Link>
    //             </Col>

    //             {/* DOJ */}
    //             <Col span={12}>
    //                 <Text className="profile-label">Date of Joining</Text>
    //             </Col>
    //             <Col span={12}>
    //                 <Link className="profile-value">
    //                     {getProfileData?.doj
    //                         ? dayjs(getProfileData?.doj).format("DD-MM-YYYY")
    //                         : "N/A"}
    //                 </Link>
    //             </Col>

    //             {/* Hierarchical Data */}
    //             {hierarchicalData?.map((division, index) => (
    //                 <React.Fragment key={index}>
    //                     {division.locations?.map((location, locIndex) => (
    //                         <div key={locIndex} className="location-block">
    //                             {/* Location Title */}
    //                             <div className="location-title">
    //                                 Location {locIndex + 1}: {location?.geoname || "-"}
    //                             </div>

    //                             {/* Division */}
    //                             <div className="location-row">
    //                                 <span className="profile-label">Division:</span>
    //                                 <span className="profile-value">
    //                                     {division?.division || "-"}
    //                                 </span>
    //                             </div>

    //                             {/* Working at */}
    //                             <div className="location-row">
    //                                 <span className="profile-label">Working at:</span>
    //                                 <span className="profile-value">
    //                                     {location?.geoname || "-"}
    //                                 </span>
    //                             </div>

    //                             {/* Taskforce */}
    //                             <div className="location-row">
    //                                 <span className="profile-label">Taskforce:</span>
    //                                 <span className="profile-value">
    //                                     {location?.taskforces?.length
    //                                         ? location.taskforces.map((tf) => tf.taskforce).join(", ")
    //                                         : "-"}
    //                                 </span>
    //                             </div>

    //                             {/* Reporting To */}
    //                             <div className="location-row">
    //                                 <span className="profile-label">Reporting To:</span>
    //                                 <span className="profile-value">
    //                                     {location?.reportingTo || "-"}
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     ))}
    //                 </React.Fragment>
    //             ))}
    //         </Row>
    //     </Card>
    // );

    const ProfileCard = () => (
        <div className="new-profile-container">

            <Card className="new-profile-card">
                {/* Header */}
                <div className="new-avatar-wrapper" onClick={EditRedirection}>
                    <Avatar
                        size={100}
                        src={getProfileData?.upimgurl || img1}
                        className="new-avatar"
                    />
                    <div className="edit-icon">
                        <EditOutlined />
                    </div>
                </div>
                {/* <div className="profile-header">
                    <div className="profile-avatar-wrapper" onClick={EditRedirection}>
                        <Avatar src={getProfileData?.upimgurl} size={90} />
                        <div className="edit-icon">
                            <EditOutlined />
                        </div>
                    </div>
                </div> */}

                {/* Name & Role */}
                <div className="profile-info mt-1">
                    <Text strong>
                        {getProfileData?.repname || "-"}{" "}
                        <CheckCircleOutlined style={{ color: "#4caf50" }} />
                    </Text>
                    <br />
                    <Text type="secondary">{getProfileData?.desgcodename || "-"}</Text>
                </div>

                {/* Contact */}
                <Divider className="profile-divider" />
                <Space size="small" className="profile-contact d-flex justify-content-between">
                    <Link
                        href={`tel:${getProfileData?.offmobileno || ""}`}
                        className="profile-value2"
                    >
                        <PhoneOutlined /> {getProfileData?.offmobileno || "-"}
                    </Link>
                    <Link
                        href={`mailto:${getProfileData?.offmailid || ""}`}
                        className="profile-value2"
                    >
                        <MailOutlined /> {getProfileData?.offmailid || "-"}
                    </Link>
                </Space>

                <Divider className="profile-divider" />
                <Space size="small" className="profile-contact d-flex justify-content-between">
                    <div>
                        <Text className="profile-label">Emp Id</Text>
                    </div>
                    <div>
                        {getProfileData?.empcode || "-"}
                    </div>
                </Space>
                <Divider className="profile-divider" />
                <Space size="small" className="profile-contact d-flex justify-content-between">
                    <div>
                        <Text className="profile-label">Date of Joining</Text>
                    </div>
                    <div>
                        {getProfileData?.doj
                            ? dayjs(getProfileData?.doj).format("DD-MM-YYYY")
                            : "N/A"}
                    </div>
                </Space>
                <Divider className="profile-divider" />
                {/* <Row> */}
                {/* Employee ID */}
                {/* <Col span={12}>
                        <Text className="profile-label">Emp Id</Text>
                    </Col>
                    <Col span={12}>
                        <Link className="profile-value">
                            {getProfileData?.empcode || "-"}
                        </Link>
                    </Col> */}

                {/* DOJ */}
                {/* <Col span={12}>
                        <Text className="profile-label">Date of Joining</Text>
                    </Col>
                    <Col span={12}>
                        <Link className="profile-value">
                            {getProfileData?.doj
                                ? dayjs(getProfileData?.doj).format("DD-MM-YYYY")
                                : "N/A"}
                        </Link>
                    </Col> */}

                {/* Hierarchical Data */}
                {hierarchicalData?.map((division, index) => (
                    <React.Fragment key={index}>
                        {division.locations?.map((location, locIndex) => (
                            <div key={locIndex} className="location-block">
                                {/* Location Title */}
                                <div className="location-title">
                                    Location {locIndex + 1}: {location?.geoname || "-"}
                                </div>

                                {/* Division */}
                                <div className="d-flex justify-content-between">
                                    <span className="profile-label">Division:</span>
                                    <span className="profile-value">
                                        {division?.division || "-"}
                                    </span>
                                </div>
                                <Divider className="profile-divider" />

                                {/* Working at */}
                                <div className="d-flex justify-content-between">
                                    <span className="profile-label">Working at:</span>
                                    <span className="profile-value">
                                        {location?.geoname || "-"}
                                    </span>
                                </div>
                                <Divider className="profile-divider" />
                                {/* Taskforce */}
                                <div className="d-flex justify-content-between">
                                    <span className="profile-label">Taskforce:</span>
                                    <span className="profile-value">
                                        {location?.taskforces?.length
                                            ? location.taskforces.map((tf) => tf.taskforce).join(", ")
                                            : "-"}
                                    </span>
                                </div>
                                <Divider className="profile-divider" />

                                {/* Reporting To */}
                                <div className="d-flex justify-content-between">
                                    <span className="profile-label">Reporting To:</span>
                                    <span className="profile-value">
                                        {location?.reportingTo || "-"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
                {/* </Row> */}
            </Card>
        </div>
    );


    return (
        <>
            {!!props.menus &&
                <div className='mobileMenu'>

                    <Drawer
                        title={<div className='DHeader text-center'>
                            <img src={userData.LogoImage} onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = logoPic;
                            }}
                                height={45} alt="Client Logo" /></div>}
                        placement={'left'}
                        width={280}
                        bodyStyle={{ padding: '10px' }}
                        onClose={() => props.setOpen(false)}
                        open={props.open}
                        className='MenuDrawer'
                    >
                        <Menu mode="inline" defaultSelectedKeys={[Naimenu]} onClick={props.handleMenuItemClick} inlineIndent={5} theme='transprent' className='SideBar1 menuScroll' items={props.menus.map(recursiveData)} />
                    </Drawer>
                </div>
            }
            {!!props.menus &&
                <div className="headerTop justify-content-between">
                    <div className='SideMenuIcon' onClick={() => props.setOpen(true)}>
                        <MenuOutlined />
                    </div>
                    {/* ajit sir */}
                    {/* {props.isHorizontal && <div
                            className='iconmenu p-3'
                            onClick={props.toggleCollapsed}
 
                        >
                            {props.collapsed ? <CloseOutlined className='fs-5' /> : <AlignLeftOutlined className='fs-5' />}
 
                            <img src={userData.LogoImage} />
                        </div>} */}
                    {/* adding By dimple */}
                    {props.isHorizontal && (
                        <button
                            className="iconmenu d-flex align-items-center btnlink"
                            onClick={props.toggleCollapsed}
                        >
                            <div className='btncoll'><MenuOutlined className="me-3 fs-5" /></div>
                            {/* Icon on the left */}
                            {/* {props.collapsed ? (
                                    // <AlignLeftOutlined className="fs-5 me-2" />
                                    <button className='btncoll'><MenuOutlined className="fs-6 me-3" /></button>
                                    // <RightOutlined className="fs-5 me-2" />
 
 
 
                                ) : (
                                    // <CloseOutlined className="fs-5 me-2" />
                                    <button className='btncoll'><MenuOutlined className="fs-6 me-3" /></button>
                                    // <LeftOutlined className="fs-5 me-2" />
 
 
 
                                )} */}

                            {/* Logo */}
                            {/* <img
                                    src={userData.LogoImage}
                                    alt="Logo"
                                    className="logo-image"
                                /> */}
                        </button>
                    )}



                    {/* {props.isHorizontal  ? <div></div> : */}
                    <div className='menuLogo'>
                        {/* adding by dimple */}
                        <img src={userData.LogoImage}
                            alt="Logo" />

                        {/* <Link to="/home"> <img src={logoPic} alt="logo" /></Link> */}
                    </div>
                    {/* } */}
                    {props.isHorizontal === false &&
                        <div className='headmenu'>
                            {/* <Menu
                                    mode="horizontal" onClick={props.handleMenuItemClick} defaultSelectedKeys={['1']}
                                    theme='transprent' className='border-none MainMenuTop' items={props.menus.map(recursiveData)} /> */}
                        </div>}
                    <div className='NavRight'>
                        {/*<div className='pt-3 px-2 deskiconheader1'><SettingOutlined className='fs-5' onClick={() => props.setThemeDopen(true)} /></div>
                             <div className='pt-3 px-2 deskiconheader'><SettingOutlined className='fs-5' onClick={props.OnSwitchChange} /></div> */}
                        <span className='d-none1 '>
                            {
                                // userData?.ROLECODE === 3 &&
                                // <Button style={{ height: 'inherit', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }} size='small' onClick={() => autoLogin()}>Auto Login</Button>
                            }
                            {/* <Expiration expiryTime={expiryTime} /> */}

                        </span>
                        {/* <Dropdown menu={{ items: items }} trigger={['click']} className='TopDrop'>
                                <Link onClick={(e) => e.preventDefault()}>
                                ssss<FaUserCircle  className='topavtaricon' />
 
                                    <img src={profImg} alt="userimage" width="30px" />
                                     arrow={{ pointAtCenter: false, }}  <span className='ms-2 text-dark'>Admin</span>
                                </Link>
                            </Dropdown> */}
                        {/* adding by dimple */}
                        <Dropdown menu={{ items: items }} trigger={['click']} className='TopDrop'>
                            {/* <Popover content={<ProfileCard />} trigger="hover" placement="bottomRight" getPopupContainer={() => document.body} overlayClassName="topPopoverOverride"
                            > */}
                            <div className='cursor-pointer d-flex align-items-center'>
                                {
                                    getProfileData?.upimgurl !== null ?

                                        <div>
                                            <Avatar
                                                size={30}
                                                src={getProfileData?.upimgurl}
                                                className='mx-2'
                                            />
                                        </div>
                                        :
                                        <FaUserCircle className='topavtaricon me-2' />
                                }
                                <span className='textcolorBlack'>{getProfileData?.repname || userData?.ROLESNAME || "Admin"}</span>
                            </div>
                            {/* </Popover> */}
                        </Dropdown>
                    </div>
                </div>

            }
        </>
    )
}

export default MasterPageHeader;

MasterPageHeader.propTypes = {
    menus: PropTypes.any,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    handleMenuItemClick: PropTypes.func,
    isHorizontal: PropTypes.any,
    toggleCollapsed: PropTypes.func,
    collapsed: PropTypes.bool

}


