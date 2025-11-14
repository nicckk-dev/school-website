import { Button, Checkbox, Modal, Table } from "antd"
import { useState } from "react";
import ModalLoader from "../../common/ModalLoader";
import PropTypes from 'prop-types';  // Import PropTypes after installation
import { IntvCss } from "../../common/GlobalStyle";
import TableSkeleton from "../../skeletons/TableSkeleton";


export const ContractModal = (props) => {
    // const location = useLocation()
    // useEffect(() => {
    //     if (props.getYearlyData !== null) {
    //         GetObligation(props.getYearlyData)
    //     }
    // }, [props.getYearlyData])
    const [dataByCheck, setDataByCheck] = useState(null)
    const [selectedRow, setSelectedRow] = useState(null);
    // const [contract, setContract] = useState(null);

    // const { mutateAsync: GetObligation, isLoading: GetObligationLoad } = useMutation({
    //     mutationFn: (data) => getObligation(data, location?.state),
    //     onSuccess: (response) => {
    //         let resData = response?.data?.resultSet;

    //         if (resData?.length) {
    //             // Add a `checkFlag` dynamically based on the condition
    //             const updatedData = resData.map((obj) => ({
    //                 ...obj,
    //                 checkFlag: obj.maP_FLAG === "1" && obj.freezE_FLG === "0",
    //             }));
    //             // Store in state
    //             setContract(updatedData);
    //         } else {
    //             dispatch(
    //                 messageSerivce({
    //                     messageType: "error",
    //                     messageContent: "No data found",
    //                 })
    //             );
    //         }
    //     },
    // });

    // Columns definition
    const columns = [
        {
            title: " ",
            dataIndex: "checkbox",
            key: "checkbox",
            render: (_, record) => {
                return (
                    <Checkbox
                        disabled={record.maP_FLAG === "1" && record.freezE_FLG === "1"} // Disable condition
                        checked={record.checkFlag} // Reflect uflag or condition
                        onChange={() => handleCheckboxChange(record)} // Toggle flag
                    />
                );
            },
        },
        {
            title: "Agreement Type",
            dataIndex: "agreemenT_NAME",
            key: "agreemenT_NAME",
        },
        {
            title: "Obligation Name",
            dataIndex: "oblI_NAME",
            key: "oblI_NAME",
        },
        {
            title: "Topic",
            dataIndex: "topiC_NAME",
            key: "topiC_NAME",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "From",
            dataIndex: "fromdate",
            key: "fromdate",
        },
        {
            title: "To",
            dataIndex: "todate",
            key: "todate",
        },
    ];
    const handleCheckboxChange = (record) => {
        const updatedDataSource = props.contract.map((item) => {
            // Toggle `checkFlag` for the selected entry and reset for others
            if (item.entryno === record.entryno) {
                return {
                    ...item,
                    checkFlag: !item.checkFlag, // Toggle the selected entry
                };
            } else {
                return {
                    ...item,
                    checkFlag: false, // Deselect all other entries
                };
            }
        });
        // Update the main state with the modified array
        props.setContract(updatedDataSource);
        // If the entry is now selected, set it in `setDataByCheck`; otherwise, clear it
        const updatedEntry = updatedDataSource.find(item => item.entryno === record.entryno);
        setDataByCheck(updatedEntry); // Set to `null` if deselected
    };


    // Handle checkbox change
    const NextFun = () => {
        debugger
        if (dataByCheck.checkFlag === true) {
            const checkData = {
                contracT_ID: dataByCheck.entryno,
                entryno: props.getYearlyData?.entryno,
                iS_LINKED: "1",
                flag: "",
                speciality: "",
                qualification: "",
                experience: "",
                nO_OF_HOURS: 0,
                metro: "",
                fellowship: "",
                fmvflag: "",
                fmvid: dataByCheck?.fmvid,
                gst: "",
                cgst: "",
                sgst: "",
                sgsT_PER: "",
                cgsT_PER: "",
                grosS_AMOUNT: "",
                totaL_AMOUNT: props.getYearlyData?.totaL_AMOUNT,
                STATUS: 'Contract Created - Multiscope',
                amount: props.getYearlyData?.amount,
                IsChanged: "1",
                agreement: "",
                fmV_DISABLE: "1",
            };
            props.AddYearlyContract(checkData)
        }

        else {
            const checkData = {
                contracT_ID: "",
                entryno: props.getYearlyData?.entryno,
                iS_LINKED: "0",
                flag: "",
                speciality: "",
                qualification: "",
                experience: "",
                nO_OF_HOURS: 0,
                metro: "",
                fellowship: "",
                fmvflag: "",
                fmvid: "",
                gst: "",
                cgst: "",
                sgst: "",
                sgsT_PER: "",
                cgsT_PER: "",
                grosS_AMOUNT: "",
                totaL_AMOUNT: props.getYearlyData?.totaL_AMOUNT,
                STATUS: 'Action Pending',
                amount: "",
                IsChanged: "1",
                agreement: "",
                fmV_DISABLE: "0",
            };
            props.AddYearlyContract(checkData)
        }
    }


    return (
        <Modal open={props?.open} onCancel={props.cancelModal}
            className='paddingZeromodal colorHeadermodal fullmodal' centered
            width="100%" title="SEGMENTSHUBHAM PLAYLIST"
            footer={
                <div className=' row d-flex justify-content-center'>
                    <div className={`col-md-3 col-6`}>
                        <Button key="close" className='w-100' onClick={NextFun}>
                            NEXT
                        </Button>
                    </div>
                </div>
            }
        >
            {/* {
                (props.GetObligationLoad) && <ModalLoader />
            } */}
            <div className="modalsegment">
            {(props.GetObligationLoad) ? (
                        <TableSkeleton showArry={7} />
                    ) : (
                <div className='container-fluid mb-2 pt-2'>
                    <div className={`${IntvCss['intvTable']}`}>
                        <Table
                            dataSource={props?.contract}
                            columns={columns}
                            pagination={false}
                            className="common_table"
                            bordered={true}
                            rowClassName={(record) =>
                                record.key === selectedRow ? "selected-row" : ""
                            }
                        />
                    </div>
                </div>
                    )}
            </div>
        </Modal>
    )
}

ContractModal.propTypes = {
    getYearlyData: PropTypes.object,
    open: PropTypes.object,
    cancelModal: PropTypes.func,
    AddYearlyContract: PropTypes.func,
    contract: PropTypes.any,
    setContract: PropTypes.func,
    GetObligationLoad: PropTypes.any,
};