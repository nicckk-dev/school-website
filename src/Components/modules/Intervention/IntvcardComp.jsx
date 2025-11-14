import { Card, Checkbox } from "antd";
import Meta from "antd/es/card/Meta";
import PropTypes from "prop-types";
import React from "react";

export const IntvCardComp = (props) => {
    // const handleCardClick = () => {
    //     // if (props.checkbox === 'visible') {
    //     document.getElementById(`checkbox-${props.SearchByOption.index}`).click();
    //     // } else {
    //     // props.cardRedirect(props.item);
    //     // }
    // };
    const handleCheckboxChange = (checkedValues) => {
        const newSwitchState = props.SearchByOptionOne.map((user, index) =>
            checkedValues?.includes(user) ? props.togglespeaker[index] || 0 : null
        );
        props.settogglespeaker(newSwitchState);
        props.setcheckuser(checkedValues);
    };

    // const handleSwitchChange = (index, checked) => {
    //     const newSwitchState = [...props.togglespeaker];
    //     newSwitchState[index] = checked ? 1 : 0;
    //     props.settogglespeaker(newSwitchState);
    // };

    // const isSwitchDisabled = (index) => {
    //     return !props.checkuser?.includes(props.SearchByOptionOne[index]);
    // };
    return (
        // <div className="col-lg-3 col-md-3 col-xs-12 mt-2" key={props.linE1}>
        <div>

            {/* <>
                <Card bordered={false} style={{ boxShadow: "none" }} className="userCard"
                    // onClick={props.checkbox === "visible" ? null : () => props.cardRedirect(props.item)} 
                    onClick={handleCardClick}
                >
                    <Meta
                        avatar={
                            <div className="check-container">
                                {props.checkbox === "visible" && <Checkbox
                                    className="checkbox"
                                    id={`checkbox-${props.SearchByOption.index}`}
                                    value={props.SearchByOption[props.index]}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Checkbox clicked");
                                    }}
                                />}
                                <div className="checkbg"> <div className="check-img position-static"></div></div>
                            </div>
                        }

                        // title={
                        //     <>
                        //         <h3 className="content-align card-title">{props.item?.linE2}
                        //         </h3>
                        //         {
                        //             props?.pflagtext ?
                        //                 <div className="text-white ms-1 prefix-style">{props?.pflagtext}</div>
                        //                 :
                        //                 null
                        //         }
                        //     </>
                        // }
                        description={(
                            <>
                                <h3 className="content-align card-content ">{props.SearchByOption.Name}</h3>
                                <h4 className="content-align card-content">{props.SearchByOption.Speciality}</h4>
                                <h4 className="content-align card-content">{props.SearchByOption.flag}</h4>
                                <h4 className="content-align card-content">{props.SearchByOption.location}</h4>
                            </>
                        )}
                    />
                </Card>
                <div className="content-footer d-flex justify-content-between rounded-bottom-2">
                    <div className="d-flex align-items-center p-1">
                        <i className="fa-solid fa-location-dot"></i>
                        <h4 className="content-align">{props.SearchByOption.location}</h4>
                    </div>

                </div>
            </> */}
            <div className=" mb10  cards" >

                <Checkbox.Group className="row g-8" onChange={handleCheckboxChange}>
                    {
                        props?.SearchByOptionOne?.filter((d) => {
                            return (
                                d.custname.toLowerCase().includes(props.searchQuery?.toLowerCase() ?? "") ||
                                d.speciality.toLowerCase().includes(props.searchQuery?.toLowerCase() ?? "") || d.location.toLowerCase().includes(props.searchQuery?.toLowerCase() ?? "")
                            );
                        })
                            .map((d, index) =>
                                <div className="col-lg-3 col-md-3  p-2" key={index}>
                                    <div className="d-flex align-items-center justify-content-between w-100 shadow-sm">
                                        <div className="w-100" role='button' >
                                            <div>
                                                <Card>
                                                    <Meta avatar={
                                                        <div className="check-container">
                                                            <div className="checkbg"> <div className="check-img position-static"></div></div>
                                                            <Checkbox className="checkbox" value={props.SearchByOptionOne[index]} />
                                                            {/* <div className="check-img">
                                                            </div> */}

                                                        </div>
                                                    }
                                                        title={<h3 className="content-align card-title">{d.custname}</h3>}
                                                        description={(
                                                            <>
                                                                <h3 className="content-align text-uppercase card-content">{d.speciality}</h3>
                                                                <h3 className="content-align card-content mt-1">{d.flag}</h3>
                                                                {/* <h4 className="content-align card-content mt-1">{d.pcode}</h4> */}

                                                            </>
                                                        )}
                                                    />
                                                </Card>
                                                <div className="content-footer d-flex justify-content-between">
                                                    <div className="d-flex align-items-center p-1">
                                                        <i className="fa-solid fa-location-dot"></i>
                                                        <h4 className="content-align">{d.location}</h4>
                                                    </div>
                                                    <div className="d-none" >
                                                        <i className="fa-solid fa-trash fs-6" id={index}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <Switch
                                                checkedChildren="Yes"
                                                unCheckedChildren="No"
                                                disabled={isSwitchDisabled(index)}
                                                checked={props.togglespeaker[index] === 1}
                                                onChange={(checked) => handleSwitchChange(index, checked)}
                                            />
                                        </div> */}
                                    </div>

                                </div>
                            )
                    }
                </Checkbox.Group>
            </div>
        </div>
        // </div>
    );
};

IntvCardComp.propTypes = {
    SearchByOptionOne: PropTypes.any,
    togglespeaker: PropTypes.any,
    settogglespeaker: PropTypes.any,
    setcheckuser: PropTypes.any,
    SearchByOptionOne: PropTypes.any,
    searchQuery: PropTypes.any,
}
