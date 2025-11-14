import React from 'react'
import { IntvCss } from "../../../components/common/GlobalStyle";
import PropTypes from 'prop-types';
const VistorCountTable = (props) => {
    return (
        <div className={`mt-3 ${IntvCss['intvTable']}`}>
            <table className='table table-bordered'>
                <thead className='bg-gray'>
                    <tr>
                        <th className='text-left'>Segment</th>
                        <th className='text-center'>Count</th>
                    </tr>
                </thead>

                <tbody>
                    {props?.documentType?.map((item, index) => (
                        <tr key={index}>
                            <td className='text-left'>{item.names === null ? "" : item.names}</td>
                            {/* onClick={props.showAttendee} */}
                            {item.cnt === "0" || item.cnt === 0 ?
                                <td className='text-center'>
                                    <div>{item.cnt}</div>
                                </td> :
                                <td className='text-center' onClick={() => { props.showAttendee(item.flag, item) }}>
                                    <div className='text-color' role='button'>{item.cnt}
                                    </div>
                                </td>
                            }
                        </tr>
                    ))}




                </tbody>

            </table>
        </div>
    )
}
VistorCountTable.propTypes = {
    documentType: PropTypes.any,
    showAttendee: PropTypes.any,
};

export default VistorCountTable