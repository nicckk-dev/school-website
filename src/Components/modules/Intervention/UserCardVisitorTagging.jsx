import React from 'react';
import { Card, Checkbox, Switch } from "antd";
import Meta from "antd/es/card/Meta";
import PropTypes from 'prop-types';


const UserCardVisitorTagging = (props) => {
    const handleCheckboxChange = (checkedValues) => {
        const newSwitchState = props.data.map((user, index) =>
            checkedValues.includes(user) ? props.togglespeaker[index] || 0 : null
        );
        props.settogglespeaker(newSwitchState);
        props.setcheckuser(checkedValues);
    };

    const handleSwitchChange = (index, checked) => {
        const newSwitchState = [...props.togglespeaker];
        newSwitchState[index] = checked ? 1 : 0;
        props.settogglespeaker(newSwitchState);
    };

    const isSwitchDisabled = (index) => {
        return !props.checkuser.includes(props.data[index]);
    };
    return (
        <>

            <div className="tittle" >
                <div className="row m-0">
                    <div className="col-lg-4 col-md-4 col-xs-12  ">
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <div>Customer List</div>
                            <div>speaker</div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-xs-12 headTittleC d-md-block d-none  ">
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <div>Customer List</div>
                            <div>speaker</div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-xs-12 headTittleC d-md-block d-none ">
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <div>Customer List</div>
                            <div>speaker</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" mb10  cards" >

                <Checkbox.Group className="row g-0" onChange={handleCheckboxChange}>
                    {
                        props.data?.filter((d) => {
                            return (
                                d.custname.toLowerCase().includes(props.searchQuery?.toLowerCase() ?? "") ||
                                d.speciality.toLowerCase().includes(props.searchQuery?.toLowerCase() ?? "") || d.location.toLowerCase().includes(props.searchQuery?.toLowerCase() ?? "")
                            );
                        })
                            .map((d, index) =>
                                <div className="col-lg-4 col-md-4 col-xs-12 border p-2" key={index}>
                                    <div className="d-flex align-items-center justify-content-between w-100">
                                        <div className="w-90" role='button' style={{ width: '85%', }}>
                                            <div className="col-card">
                                                <Card>
                                                    <Meta avatar={
                                                        <div className="check-container">
                                                            <Checkbox className="checkbox" value={props.data[index]} />
                                                            <div className="check-img">
                                                            </div>
                                                        </div>
                                                    }
                                                        title={<h3 className="content-align card-title">{d.custname}</h3>}
                                                        description={(
                                                            <>
                                                                <h3 className="content-align text-uppercase card-content">{d.speciality}</h3>
                                                                <h3 className="content-align card-content mt-1">{d.class}</h3>
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
                                        <div>
                                            <Switch
                                                checkedChildren="Yes"
                                                unCheckedChildren="No"
                                                disabled={isSwitchDisabled(index)}
                                                checked={props.togglespeaker[index] === 1}
                                                onChange={(checked) => handleSwitchChange(index, checked)}
                                            />
                                        </div>
                                    </div>

                                </div>
                            )
                    }
                </Checkbox.Group>
            </div>

        </>

    )
}

UserCardVisitorTagging.propTypes = {
    data: PropTypes.any,
    togglespeaker: PropTypes.any,
    settogglespeaker: PropTypes.any,
    setcheckuser: PropTypes.any,
    checkuser: PropTypes.any,
    searchQuery: PropTypes.any,

}

export default UserCardVisitorTagging