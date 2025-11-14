import React from 'react'
import { IntvCss } from "../../../components/common/GlobalStyle";
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
const VistorCountTable = (props) => {
    const navigate = useNavigate();

    const getspeakerUrl = (item, flag) => {
        navigate(`/Intv/SpeakersList`, { state: { activity: item, title: flag === 0 ? "Attendees List" : "Speakers List", flg: flag, vistorFlag: "V", url: props.state } });
    }

    return (
        <div className={`mt-3  ${IntvCss['intvTable']}`}>
            <table className='table table-bordered mb-0'>
                <thead className='bg-gray'>
                    <tr>
                        <th className='text-left'>Segment</th>
                        <th className='text-center'>Total Attendees</th>
                        <th className='text-center'>Total Speaker</th>
                    </tr>
                </thead>

                <tbody>

                    {props?.visitorCount.map((item, index) => (
                        <tr key={index}>
                            <td className='text-left'>{item.custname === null ? "" : item.custname}</td>
                            {item.totaL_ATTENDEE === "0" || item.totaL_ATTENDEE === null || item.totaL_ATTENDEE === 0 ? <td className='text-center'> <div>{item.totaL_ATTENDEE}</div></td> : <td className='text-center'><div className='text-color' onClick={() => getspeakerUrl(item, 0)} role='button'>{item.totaL_ATTENDEE}</div></td>}

                            {item.totaL_SPEAKER === "0" || item.totaL_SPEAKER === null || item.totaL_SPEAKER === 0 ? <td className='text-center'> <div>{item.totaL_SPEAKER}</div></td> : <td className='text-center'><div className='text-color' onClick={() => getspeakerUrl(item, 1)} role='button'>{item.totaL_SPEAKER}</div></td>}

                        </tr>
                    ))}

                </tbody>

            </table>
        </div>
    )
}

VistorCountTable.propTypes = {
    state: PropTypes.any,
    visitorCount: PropTypes.any,
};

export default VistorCountTable