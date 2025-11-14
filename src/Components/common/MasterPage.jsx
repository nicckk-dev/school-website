import {
    Button,
    ConfigProvider,
    Drawer,
    Input,
    Layout,
    Menu,
    message,
    Popover,
    Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import MasterPageHeader from "./MasterPageHeader";
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { insertEnt } from "../../api/AuthApi";
import { findNestedObject } from "../../utils/menu";
import logoPic from "../../assets/images/phy_webbglogo.png";
import logoiconColor from "../../assets/images/logoiconColor.png";
// import { Footer } from 'antd/es/layout/layout';
import MenuMasterLoader from "./MenuMasterLoader";
import { userSession } from "../../constants/UserConstant";
import axios from "axios";
import PropTypes from "prop-types";
import { getSessionStorage } from "../../utils/storageSecurity";
import { useGlobal } from "../../utils/GlobalContext";
import { LuSparkles } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

const MasterPage = (props) => {
    const userData = userSession.userData;
    console.log("userData", userData);
    // const isLoading = useSelector(state => state.loader.loading);
    const messageApiState = useSelector((state) => state.messageApi);
    const [messageApi, contextHolder] = message.useMessage();
    const carryFlag = sessionStorage.getItem("carryFlag");
    const [themeDopen, setThemeDopen] = useState(false);
    const Naimenu = sessionStorage.getItem("navigatemenu");
    const responsiveFlg = getSessionStorage("responsiveFlag");
    const { isMasterGlobal, setIsMasterGlobal } = useGlobal();
    const [phyziiChatData, setPhyziiChatData] = useState([]);
    const [chatText, setChatText] = useState("");
    const [menuData, setMenuData] = useState();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [phyziiChatText, setPhyziiChatText] = useState("");
    const [phyziiData, setPhyziiData] = useState([
        {
            data: "📥 You have 21 new content items to download.",
            button: "Download",
            sender: "bot",
        },
        {
            data: "🎁 Please have 25 qty of samples for Brand A Prox , B Prox & C Prox for the day for distribution.",
            button: "",
            sender: "bot",
        },
        {
            data: "⚠️ 12 Action points are overdue for the doctors planned today. Please check.",
            button: "",
            sender: "bot",
        },
        {
            data: "✨ New brand (Z1) has been added and Promotogram has changed for (Cardiologist) - please review their playlist.",
            button: "Review Playlist",
            sender: "bot",
        },
        {
            data: "What's my plan for today?",
            button: "",
            sender: "user",
        },
        {
            data: "You have 8 doctor visits scheduled today. Starting with Dr. Sharma at 10 AM, followed by Dr. Patel at 11:30 AM. Would you like to see the complete schedule?",
            button: "",
            sender: "bot",
        },
        {
            data: "Show me insights for Dr. Sharma",
            button: "",
            sender: "user",
        },
        {
            data: "Dr. Sharma prefers Brand X and Y. Last visit: 15 days ago. Recommended talking points: New clinical study results for Brand X. Remember to follow up on the sample request from last visit.",
            button: "",
            sender: "bot",
        },
    ]);
    const location = useLocation();
    const handleChatToggle = () => {
        setIsChatOpen((prev) => !prev);
    };

    const chatContainerData = [
        {
            MenuID: "92",

            MenuName: "Campaign",

            List: [
                {
                    Title: "Call Verification 1",

                    Discription:
                        "Your ASM reported 3 calls today – Did they assist you during the first call? Y/N?",

                    Objective: "Verify ASM participation",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "1",

                    Reminder: "0",
                },

                {
                    Title: "Call Verification 2",

                    Discription:
                        "Your ASM reported 3 calls today – Did they assist you during the second call? Y/N?",

                    Objective: "Confirm ASM involvement",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "1",

                    Reminder: "1",
                },

                {
                    Title: "Call Verification 3",

                    Discription:
                        "Your ASM reported 3 calls today – Did they assist you during the third call? Y/N?",

                    Objective: "Validate ASM support",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "0",

                    Reminder: "0",
                },

                {
                    Title: "Call Feedback",

                    Discription:
                        "Was the ASM's support effective during today's calls? Y/N?",

                    Objective: "Evaluate ASM performance",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "2",

                    Reminder: "1",
                },
            ],
        },

        {
            MenuID: "93",

            MenuName: "Feedback",

            List: [
                {
                    Title: "Support Quality 1",

                    Discription:
                        "Did the ASM provide clear guidance in the first call? Y/N?",

                    Objective: "Assess guidance quality",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "2",

                    Reminder: "1",
                },

                {
                    Title: "Support Quality 2",

                    Discription:
                        "Was the ASM's feedback helpful in the second call? Y/N?",

                    Objective: "Evaluate feedback effectiveness",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "1",

                    Reminder: "0",
                },

                {
                    Title: "Support Timeliness",

                    Discription:
                        "Was the ASM prompt in addressing your queries today? Y/N?",

                    Objective: "Check ASM responsiveness",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "1",

                    Reminder: "1",
                },

                {
                    Title: "Overall Satisfaction",

                    Discription: "Are you satisfied with the ASM's support today? Y/N?",

                    Objective: "Gauge overall satisfaction",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "2",

                    Reminder: "0",
                },
            ],
        },

        {
            MenuID: "94",

            MenuName: "Training",

            List: [
                {
                    Title: "Training Session 1",

                    Discription:
                        "Did the ASM conduct the first training module today? Y/N?",

                    Objective: "Confirm training delivery",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "0",

                    Reminder: "0",
                },

                {
                    Title: "Training Session 2",

                    Discription: "Was the second training module completed today? Y/N?",

                    Objective: "Verify training progress",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "1",

                    Reminder: "1",
                },

                {
                    Title: "Training Effectiveness",

                    Discription: "Was the training content relevant to your needs? Y/N?",

                    Objective: "Assess training relevance",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "2",

                    Reminder: "0",
                },

                {
                    Title: "Training Engagement",

                    Discription: "Was the ASM engaging during the training session? Y/N?",

                    Objective: "Evaluate trainer engagement",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "1",

                    Reminder: "1",
                },
            ],
        },

        {
            MenuID: "95",

            MenuName: "Follow-Up",

            List: [
                {
                    Title: "Action Item 1",

                    Discription: "Did the ASM follow up on the first action item? Y/N?",

                    Objective: "Track action item progress",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "1",

                    Reminder: "1",
                },

                {
                    Title: "Action Item 2",

                    Discription: "Was the second action item addressed by the ASM? Y/N?",

                    Objective: "Verify action item completion",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "0",

                    Reminder: "0",
                },

                {
                    Title: "Follow-Up Timeliness",

                    Discription: "Was the ASM's follow-up prompt and effective? Y/N?",

                    Objective: "Assess follow-up efficiency",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "2",

                    Reminder: "1",
                },

                {
                    Title: "Follow-Up Clarity",

                    Discription: "Were the ASM's follow-up instructions clear? Y/N?",

                    Objective: "Evaluate communication clarity",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "1",

                    Reminder: "0",
                },
            ],
        },

        {
            MenuID: "96",

            MenuName: "Performance Review",

            List: [
                {
                    Title: "Feedback Delivery 1",

                    Discription: "Did the ASM provide feedback on your first task? Y/N?",

                    Objective: "Confirm feedback delivery",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "2",

                    Reminder: "0",
                },

                {
                    Title: "Feedback Delivery 2",

                    Discription: "Was feedback provided for your second task today? Y/N?",

                    Objective: "Verify feedback consistency",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "1",

                    Reminder: "1",
                },

                {
                    Title: "Feedback Quality",

                    Discription: "Was the ASM's feedback constructive and clear? Y/N?",

                    Objective: "Assess feedback quality",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "2",

                    Reminder: "0",
                },

                {
                    Title: "Performance Goals",

                    Discription: "Did the ASM discuss performance goals with you? Y/N?",

                    Objective: "Confirm goal-setting",

                    ButtonTitle: "PageAdded",

                    Link: "",

                    LikeButton: "1",

                    DislikeButton: "1",

                    Importance: "1",

                    Reminder: "1",
                },
            ],
        },
    ];

    const handleSend = () => {
        setPhyziiChatData([...phyziiChatData, { Discription: chatText }]);
    };
    const handleSendButton = () => {
        setPhyziiData([...phyziiData, { sender: "user", data: phyziiChatText, button: "" }]);
        setPhyziiChatText("");
    };
    useEffect(() => {
        const menuCode = menuData?.menucode;
        const filterData = chatContainerData?.filter(
            (data) => data?.MenuID == menuCode
        );
        setPhyziiChatData(filterData[0]?.List || []);
    }, [menuData]);

    if (location.pathname == "/homewidget") {
        setIsMasterGlobal(true);
    }
    // const { data: menu, isFetching: isMenusFetching } = useQuery({
    //     queryKey: ["fetchMenus"],
    //     queryFn: fetchMenus,
    //     enabled: !carryFlag,
    // });

    const headerStyle = {
        color: "#fff",
        height: "auto",
        paddingInline: 0,
        lineHeight: "inherit",
        backgroundColor: "transparent",
    };

    //console.log("Message Api state: ", messageApiState, responsiveFlg);

    useEffect(() => {
        if (
            messageApiState.messageType !== "" &&
            messageApiState.messageContent !== ""
        ) {
            messageApi.open({
                type: messageApiState.messageType,
                content: messageApiState.messageContent,
            });
        }
    }, [messageApi, messageApiState.messageContent, messageApiState.messageType]);

    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    // icon: item.iconclass === null ? <i className="ti ti-player-record"></i> :
    // <i style={{ fontSize: "18px" }} className={item.iconclass}></i>,
    // const recursiveData = (item) => {
    //     return {
    //         key: item.menucode,
    //         label: item.title,
    //         icon: item.iconclass === null ? <i className="ti ti-player-record"></i> :
    //             <i className={`${item.iconclass} fs18`}></i>,
    //         children: item.submenu && item.submenu.length > 0 ? item.submenu.map(recursiveData) : null
    //     }

    // }
    const recursiveData = (item) => {
        return {
            key: item.menucode,
            label: item.title,
            icon:
                item.iconclass === null ? (
                    <i className="ti ti-player-record"></i>
                ) : (
                    <i className={`${item.iconclass} fs18`}></i>
                ),
            children:
                item.submenu && item.submenu.length > 0
                    ? item.submenu
                        .sort((a, b) => a.sequence - b.sequence) // ✅ sort by sequence
                        .map(recursiveData)
                    : null,
        };
    };

    console.log("menuData", menuData);

    // const recursiveData = (item) => {
    //     return {
    //         key: item.menucode,
    //         label: item.title,
    //         // For the parent item, use the icon if available, else show the BsCircle
    //         icon: item.iconclass === null
    //             ? <BsCircle style={{fontSize: "6px"}} />
    //             : item.iconclass,
    //         // For submenu items, map them and assign the BsCircle icon if they have children
    //         children: item.submenu && item.submenu.length > 0
    //             ? item.submenu.map(subItem => ({
    //                 key: subItem.menucode,
    //                 label: subItem.title,
    //                 icon: <BsCircle style={{fontSize: "7px"}} />, // Assign the circle icon to all submenu items
    //                 children: subItem.submenu && subItem.submenu.length > 0
    //                     ? subItem.submenu.map(recursiveData)
    //                     : null
    //               }))
    //             : null
    //     };
    // };
    function detectBrowser() {
        const userAgent = navigator.userAgent;
        let browserName = "Unknown Browser";
        let browserVersion = "";

        if (userAgent.includes("Firefox")) {
            browserName = "Firefox";
            const versionMatch = userAgent.match(/Firefox\/([\d.]+)/);
            browserVersion = versionMatch
                ? versionMatch[1]?.split(".")[0]
                : "Unknown Version";
        } else if (userAgent.includes("Edg")) {
            browserName = "Edge";
            const versionMatch = userAgent.match(/Edg\/([\d.]+)/);
            browserVersion = versionMatch
                ? versionMatch[1]?.split(".")[0]
                : "Unknown Version";
        } else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
            browserName = "Chrome";
            const versionMatch = userAgent.match(/Chrome\/([\d.]+)/);
            browserVersion = versionMatch
                ? versionMatch[1]?.split(".")[0]
                : "Unknown Version";
        } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
            browserName = "Safari";
            const versionMatch = userAgent.match(/Version\/([\d.]+)/);
            browserVersion = versionMatch
                ? versionMatch[1]?.split(".")[0]
                : "Unknown Version";
        } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
            browserName = "Explorer";
            const versionMatch = userAgent.match(/(MSIE\s|rv:)([\d.]+)/);
            browserVersion = versionMatch ? versionMatch[2] : "Unknown Version";
        }

        return `${browserName}${browserVersion}`;
    }

    const handleMenuItemClick = async (e) => {
        debugger;
        const menuItem = findNestedObject(props?.menu?.data.resultSet, e.key);
        //  const menuItem = findNestedObject(menudatanew, e.key);
        let ipconfig = "";
        let ipaddr = "";
        let hostip = "";
        let hostipaddress = "";
        try {
            const response = await axios.get("https://api.ipify.org?format=json");
            ipconfig = response.data?.ip;
            //console.log("IP Address:", ipconfig);
        } catch (error) {
            console.error("Error fetching IP address:", error);
        }
        let browserDetails = detectBrowser();
        // console.log("navigate", e.key);
        sessionStorage.setItem("navigatemenu", e.key);

        // entrydata({
        //     menucode: menuItem.menucode,
        //     host: ipconfig,
        //     browser: `${browserDetails}~${ipconfig}~${ipaddr}~${hostip}~${hostipaddress}`,
        //     device: 0,
        // });
        setMenuData(menuItem);
        let q_string;
        let stateObject = {};
        let first_path;

        if (menuItem?.path === null) {
            return navigate("/home"), setCollapsed(true);
        } else if (menuItem?.respmanucode != null) {
            debugger;
            navigate("/homewidget/ResponsiveWeb", {
                state: {
                    respmenucode: menuItem?.respmanucode,
                    baseurl: menuItem?.baseurl,
                },
            });
            setCollapsed(true);
        } else {
            q_string = menuItem?.path?.split("?");
            first_path = q_string?.shift();

            q_string[0]?.split("&")?.forEach((str) => {
                stateObject[str?.split("=")[0]] = str?.split("=")[1];
            });

            return (
                // navigation with encrypted queryString
                //navigate(menuItem.path=="/Home" || menuItem.path=="/homev2" || menuItem.path=="/MTP" || menuItem.path=="/pendingapproval"|| menuItem.path=="/Inventory" ? menuItem.path:getPagePath({ moduleName: "", pageName: "STP", queryString:AES.encrypt(JSON.stringify(menupath), secretPass).toString() })),
                // menuItem.path == "/STP?STPFlag=1" || menuItem.path == "/STP?STPFlag=2" ? navigate(menuItem.path == "/STP?STPFlag=1" || menuItem.path == "/STP?STPFlag=2" ? getPagePath({ moduleName: "", pageName: "STP", queryString: AES.encrypt(JSON.stringify(menupath), secretPass).toString() }) : menuItem.path) :
                //     menuItem.path === "/planreport?reportid=65" ? navigate(menuItem.path === "/planreport?reportid=65" ? getPagePath({ moduleName: "", pageName: "planreport", queryString: encryptionString }) : menuItem.path) :
                //         menuItem.path === "/plansubreport?reportid=2025" ? navigate(menuItem.path === "/plansubreport?reportid=2025" ? getPagePath({ moduleName: "", pageName: "plansubreport", queryString: encryptionString }) : menuItem.path) :
                //             menuItem.path === "/plansubreport?reportid=2079" ? navigate(menuItem.path === "/plansubreport?reportid=2079" ? getPagePath({ moduleName: "", pageName: "plansubreport", queryString: encryptionString }) : menuItem.path) : navigate(menuItem.path),

                menuItem?.path?.includes("?")
                    ? navigate(first_path, { state: stateObject })
                    : navigate(menuItem.path),
                setOpen(false),
                setCollapsed(true)
            );
        }

        // Used for DB Side QueryString encryption
        // stateObject[q_string[1]?.split('=')[0]] = q_string[1]?.split('=')[1]
        // if(menuItem.path!="/Home" || menuItem.path!="/homev2" || menuItem.path!="/MTP" || menuItem.path!="/pendingapproval"||menuItem.path!="/Inventory" )
        // {
        //     menupath=menuItem.path.split('/STP?')[1];
        // // }
        // if (menuItem.path == "/STP?STPFlag=1" || menuItem.path == "/STP?STPFlag=2") {
        //     menupath = menuItem.path.split('/STP?')[1];
        // }
        // else if (menuItem.path === "/planreport?reportid=65") {
        //     menupath = menuItem.path.split('/planreport?')[1];
        // }
        // else if (menuItem.path === "/plansubreport?reportid=2025") {
        //     menupath = menuItem.path.split('/plansubreport')[1];
        // }
        // else if (menuItem.path === "/plansubreport?reportid=2079") {
        //     menupath = menuItem.path.split('/plansubreport')[1];
        // }
        // const secretPass = "XkhZG4fW2t2W";
        // let encryptionString = AES.encrypt(JSON.stringify(menupath), secretPass).toString();

        // const configSettings = await getConfigData(menuItem);

        // if (configSettings !== undefined) {
        //     navigate('/STP');
        // } else {
        //     navigate(`${menuItem.path}`)
        // }
    };
    // const { mutate: entrydata } = useMutation({
    //     mutationFn: (params) => insertEnt(params),
    //     onSuccess: (response) => {
    //         debugger;
    //         let resData = response.data.resultSet;
    //     }
    // });
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed((prevState) => !prevState);
    };

    const [isHorizontal, setIsHorizontal] = useState(
        sessionStorage.getItem("theme") === "menuhorizontal"
    );

    const OnSwitchChange = () => {
        const newTheme = !isHorizontal ? "menuhorizontal" : "menuvertical";
        sessionStorage.setItem("theme", newTheme);
        setIsHorizontal((prevState) => !prevState);
    };

    useEffect(() => {
        let theme = sessionStorage.getItem("theme");
        if (!theme) {
            // Set default theme to 'menuhorizontal' if not present
            theme = "menuhorizontal";
            sessionStorage.setItem("theme", theme);
        }
        setIsHorizontal(theme === "menuhorizontal");
    }, []);

    const layoutClassName = `${isHorizontal ? "vertical" : ""} ${collapsed ? "sideMenuopen" : ""
        }`.trim();
    const getInitialColors = () => {
        const storedColors = sessionStorage.getItem("primaryColor");
        return storedColors
            ? JSON.parse(storedColors)
            : {
                primaryColor: "linear-gradient(127deg, #21BFD0 0%, #4FA2BC 100%)",
                textColor: "33, 191, 208",
            };
    };

    const [primaryColor, setPrimaryColor] = useState(
        getInitialColors().primaryColor
    );
    const [textColor, setTextColor] = useState(getInitialColors().textColor);

    const handleColorChange = (newColor, newTextColor) => {
        setPrimaryColor(newColor);
        setTextColor(newTextColor);
        document.documentElement.style.setProperty("--menu-color", newColor);
        document.documentElement.style.setProperty("--primary-color", newTextColor);
        document.documentElement.style.setProperty("--text-color", newTextColor);

        const colors = {
            primaryColor: newColor,
            textColor: newTextColor,
        };
        sessionStorage.setItem("primaryColor", JSON.stringify(colors));
        setThemeDopen(false);
    };
    const onClose = () => {
        setDrawerOpen(false);
    };

    //   useEffect(() => {

    //     document.documentElement.style.setProperty('--menu-color', primaryColor);
    //     document.documentElement.style.setProperty('--text-color', textColor);
    //   }, [primaryColor, textColor]);

    useEffect(() => {
        if (userData !== null) {
            handleColorChange(userData.background, userData.textColor);
        }
    }, [userData]);

    // const menudatanew =[
    //     {
    //         "title": "Home",
    //         "routename": "Home2Routes",
    //         "path": "/homewidget",
    //         "menucode": "33532",
    //         "moduleid": null,
    //         "parentcode": null,
    //         "iconclass": "ti ti-home",
    //         "respmenucode": null,
    //         "baseurl": null,
    //         "submenu": []
    //     },
    //     {
    //         "title": "Master",
    //         "routename": null,
    //         "path": null,
    //         "menucode": "33533",
    //         "moduleid": null,
    //         "parentcode": null,
    //         "iconclass": "ti ti-user-square-rounded",
    //         "respmenucode": null,
    //         "baseurl": null,
    //         "submenu": [
    //             {
    //                 "title": "Customer Master",
    //                 "routename": "AdminRoutes",
    //               "path": "/Master/CustomerMaster",
    //                 "menucode": "33534",
    //                 "moduleid": null,
    //                 "parentcode": null,
    //                 "iconclass": null,
    //                 "respmenucode": null,
    //                 "baseurl": null,
    //                 "submenu": []
    //             },
    //             {
    //                 "title": "Brand Master",
    //                 "routename": "AdminRoutes",
    //               "path": "/Master/BrandMaster",
    //                 "menucode": "33545",
    //                 "moduleid": null,
    //                 "parentcode": null,
    //                 "iconclass": null,
    //                 "respmenucode": null,
    //                 "baseurl": null,
    //                 "submenu": []
    //             }
    //             ,
    //             {
    //                 "title": "User Master",
    //                 "routename": "AdminRoutes",
    //               "path": "/Master/userMaster",
    //                 "menucode": "33547",
    //                 "moduleid": null,
    //                 "parentcode": null,
    //                 "iconclass": null,
    //                 "respmenucode": null,
    //                 "baseurl": null,
    //                 "submenu": []
    //             }
    //         ]
    //     },

    // ]

   const handleVoiceSearch = () => {
    if ("webkitSpeechRecognition" in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;

            // ✅ Update input state (react way)
            setPhyziiChatText(transcript);

            // ✅ Push transcript into chat data
            setPhyziiData(prev => [
                ...prev,
                { sender: "user", data: transcript, button: "" }
            ]);
        };

        recognition.start();
    } else {
        message.error("Voice recognition not supported in this browser.");
    }
};


    return (
        <>
            {props?.isMenusFetching && <MenuMasterLoader />}
            {contextHolder}

            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: `rgb(${textColor})`,
                    },
                }}
            >
                {/* {
                    responsiveFlg != 1 && (
                        <Drawer
                            title={<div className='DHeader d-flex justify-content-between'><div>Theme Colors</div><div className='cursor' /><CloseOutlined onClick={() => setThemeDopen(false)} /></div>}
                            placement={'right'}
                            width={300}
                            closable={false}
                            bodyStyle={{ padding: '15px' }}
                            onClose={() => setThemeDopen(false)}
                            open={themeDopen}
                            className='themeDrawer'
                        >
                            <div>
                                <div className='themeContainer d-flex'>
 
                                    <div className={`theme-item ${textColor === '#13cade' ? 'active' : ''}`} style={{ background: "linear-gradient(93deg, #21bfd0, #4fd9e8)" }} onClick={() => handleColorChange('linear-gradient(93deg, #21bfd0, #4fd9e8)', "#13cade")} >
                                        {textColor === '#13cade' && <span className="check-icon"><CheckOutlined /></span>}
                                    </div>
                                    <div className={`theme-item ${textColor === '#B65EBA' ? 'active' : ''}`} style={{ background: "linear-gradient(93deg, #B65EBA 0%, #2E8DE1 100%)" }} onClick={() => handleColorChange('linear-gradient(93deg, #B65EBA 0%, #2E8DE1 100%)', "#B65EBA")}>
                                        {textColor === '#B65EBA' && <span className="check-icon"><CheckOutlined /></span>}
                                    </div>
                                    <div className={`theme-item ${textColor === '#0d34bf' ? 'active' : ''}`} style={{ background: "linear-gradient(93deg, #111c43, #071f74)" }} onClick={() => handleColorChange(' linear-gradient(93deg, #111c43, #071f74)', "#0d34bf")}>
                                        {textColor === '#0d34bf' && <span className="check-icon"><CheckOutlined /></span>}
                                    </div>
 
 
                                </div>
 
                            </div>
 
                        </Drawer>
                    )
                } */}

                <Layout className={layoutClassName}>
                    {!!props?.menu?.data.resultSet && (
                        <>
                            {isMasterGlobal && responsiveFlg != 1 && (
                                <Layout.Header className="mainheader" style={headerStyle}>
                                    <MasterPageHeader
                                        handleMenuItemClick={handleMenuItemClick}
                                        open={open}
                                        setOpen={setOpen}
                                        menus={props?.menu?.data.resultSet}
                                        menuData={menuData}
                                        toggleCollapsed={toggleCollapsed}
                                        collapsed={collapsed}
                                        OnSwitchChange={OnSwitchChange}
                                        isHorizontal={isHorizontal}
                                        setThemeDopen={setThemeDopen}
                                    />
                                </Layout.Header>
                            )}
                            <Layout.Content>
                                {isMasterGlobal && responsiveFlg != 1 && (
                                    <div className="app-menu navbar-menu bg-transprent">
                                        <div
                                            className={
                                                isHorizontal === true ? "headmenu1" : "headmenu"
                                            }
                                        >
                                            {isHorizontal === true && (
                                                <div
                                                    className="navbar-brand-box  text-center  w-100 "
                                                    style={{ height: "50px" }}
                                                >
                                                    <div className="sidemenulogo">
                                                        <Link to="/homewidget">
                                                            {" "}
                                                            <img
                                                                src={logoPic}
                                                                alt="logo"
                                                                width={90}
                                                                onError={(e) => {
                                                                    e.target.onerror = undefined;
                                                                    e.target.src = logoPic;
                                                                }}
                                                            />
                                                        </Link>
                                                    </div>

                                                    <div className="sidemenulogoicon">
                                                        <img
                                                            src={
                                                                userData.logoicon === undefined
                                                                    ? logoiconColor
                                                                    : userData.logoicon
                                                            }
                                                            alt="logo"
                                                            width={40}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = logoiconColor;
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {isHorizontal === true && (
                                                <div className="menuScroll ">
                                                    <Menu
                                                        defaultSelectedKeys={[Naimenu]}
                                                        mode={
                                                            isHorizontal === true ? "inline" : "horizontal"
                                                        }
                                                        inlineIndent={10}
                                                        inlineCollapsed={collapsed}
                                                        onClick={handleMenuItemClick}
                                                        theme={
                                                            isHorizontal === true ? "dark" : "transprent"
                                                        }
                                                        className="SideBar1 border-none MainMenuTop"
                                                        items={props?.menu?.data.resultSet
                                                            .sort((a, b) => a.sequence - b.sequence)
                                                            .filter((item) => item?.menucode !== "53")
                                                            .map(recursiveData)}
                                                        style={!collapsed ? { padding: "5px" } : ""}
                                                    />

                                                    {/* <Menu
                                                        defaultSelectedKeys={[Naimenu]}
                                                        mode={isHorizontal === true ? "inline" : "horizontal"}
                                                        inlineIndent={10} inlineCollapsed={collapsed} onClick={handleMenuItemClick} theme={isHorizontal === true ? "dark" : "transprent"} className='SideBar1 border-none MainMenuTop' items={props?.menu?.data.map(recursiveData)} style={!collapsed ? { padding: "5px" } : ""} />
                                                         */}
                                                </div>
                                            )}
                                            {!collapsed ? (
                                                <p className="copyright">
                                                    Copyright © Cirrius Technologies Pvt. Ltd. 2025 | All
                                                    Rights Reserved.{" "}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`${isMasterGlobal && responsiveFlg != 1 ? "main-content" : ""
                                        }`}
                                >
                                    <div
                                        className={`${isMasterGlobal && responsiveFlg != 1 ? "page-content" : ""
                                            }`}
                                    >
                                        <Outlet context={props?.menu?.data.resultSet} />
                                    </div>
                                </div>
                            </Layout.Content>
                        </>
                    )}
                    <Layout.Content>
                        {
                            carryFlag && carryFlag === "mobile" && (
                                <>
                                    {/* <div className={carryFlag && carryFlag === 'mobile' ? 'subheader-mobile' : 'subheader'}>
                                    <div className='leftArrow'><Link to="/StpPlan/landingScreen"><ArrowLeftOutlined /></Link><span>Tour Plan</span></div>
                                    <div className='d-flex '>
                                        <div className="Gicon text-white bg-color rounded-circle d-inline-block me-3" data-bs-toggle="dropdown" aria-expanded="false">G</div>
                                    </div>
                                </div> */}
                                    <Outlet />
                                </>
                            )
                            // :
                            // <Outlet context={menu?.data.resultSet} />
                        }
                    </Layout.Content>
                    {/* <Footer className='masterfooter' style={collapsed ? { paddingLeft: "63px" } : { paddingLeft: "230px" }}>Copyright © Cirrius Technologies Pvt. Ltd. 2024 | All Rights Reserved.</Footer> */}
                </Layout>
                {/* {isChatOpen && (
                    <div className="chat-container" onClick={(e) => e.stopPropagation()}>
                        <div className="chat-header">
                            <span>Phyzii Bot</span>
                            <span className="close-btn" onClick={handleChatToggle}>
                                ×
                            </span>
                        </div>
                        <div className="chat-content">
                            {phyziiChatData?.map((data) => (
                                <div className=" p-2 rounded-3 bg-light mb-3 border">
                                    <h6 className="text-dark fs-14 m-1">{data?.Title}</h6>
                                    <p className="p-0 m-0 text-muted">{data?.Discription}</p>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <textarea placeholder="Type your message..." value={chatText} onChange={(e) => setChatText(e.target.value)} />
                            <Button type="primary" onClick={handleSend}>Send</Button>
                        </div>
                    </div>
                )} */}
                <Drawer
                    title={
                        <div className="d-flex align-items-center justify-content-between p-3">
                            <div className="d-flex gap-2">
                                <div className="drawer-header-icon">
                                    <LuSparkles className="text-white" />
                                </div>
                                <div>
                                    <h6 className="m-0 p-0">Hey Phyzii</h6>
                                    <span className="text-muted small fw-normal">
                                        AI Assistant
                                    </span>
                                </div>
                            </div>
                            <div>
                                <IoClose className="fs-5 cursor-pointer" onClick={onClose} />
                            </div>
                        </div>
                    }
                    closable={{ "aria-label": "Close Button" }}
                    onClose={onClose}
                    open={drawerOpen}
                    closeIcon={null}
                >
                    <div className="border d-flex flex-column h-100 overflow-hidden">
                        <div className="flex-grow-1 h-75 overflow-scroll p-4">
                            {phyziiData.map((chatData) => (
                                <div
                                    className={`d-flex ${chatData?.sender == "user"
                                        ? "justify-content-end"
                                        : "justify-content-start"
                                        }`}
                                >
                                    <div className="">
                                        <div
                                            className={`border py-2 px-3 mb-1 rounded-4 text-black ${chatData?.sender == "user"
                                                ? "user-message text-white mb-3"
                                                : "bot-message"
                                                }`}
                                        >
                                            <p className="m-0 p-0">{chatData?.data}</p>
                                            {chatData.button.length > 2 && (
                                                <button className="response-button border-0 text-white py-1 px-3 rounded-4 mt-2">
                                                    {chatData.button}
                                                </button>
                                            )}
                                        </div>
                                        {chatData?.sender == "bot" && (
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <div className="likeButton rounded-3">
                                                    <AiOutlineLike /> Like
                                                </div>
                                                <div className="likeButton rounded-3">
                                                    <AiOutlineDislike /> Dislike
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border d-flex p-3 gap-2">
                            <Input id="searchInput"
                                value={phyziiChatText} placeholder="Type your message..."
                                onChange={(e) => setPhyziiChatText(e.target.value)}
                            />
                            <button className="mic-button  rounded-3">
                                <IoMicOutline onClick={handleVoiceSearch} />
                            </button>
                            <button
                                className="send-button rounded-3"
                                onClick={handleSendButton}
                            >
                                <FiSend />
                            </button>
                        </div>
                    </div>
                </Drawer>
                <Popover
                    title={<span style={{ color: "white" }}>Hey Phyzii</span>}
                    overlayClassName="custom-popover-width"
                    color="#1e1e1e"
                    size="small"
                    placement="topLeft"
                >
                    <div
                        className="floating-chat-icon"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <div className="chat-circle">
                            {/* <img
                            src={require("../../assets/images/twinkle.gif")}
                            alt="Twinkle"
                            className="twinkle-gif"
                        />  */}
                            <LuSparkles className="text-white fs-4" />
                        </div>
                    </div>
                </Popover>
            </ConfigProvider>
        </>
    );
};

export default MasterPage;

export const loader = () => {
    let expiryTime = 0;
    const jwtToken = sessionStorage.getItem("token");
    if (jwtToken !== undefined && jwtToken !== null) {
        const decodedToken = jwt_decode(jwtToken);
        expiryTime = decodedToken.exp * 1000;
        return expiryTime;
    }
    return null;
};

MasterPage.propTypes = {
    menu: PropTypes.any,
    isMenusFetching: PropTypes.bool,
};
