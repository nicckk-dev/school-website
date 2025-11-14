import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

const CardUnderTableSkeleton = ({ showArry }) => {
    return (
        <div className="EasFoot">
            <div className="container-fluid mb-3">
                {Array.from({ length: showArry }).map((_, i) => (
                  
                        <div className="boxcard mt-2" key={i}>
                            <div className='box-title-card SubheaderModal'>
                                <Skeleton.Button
                                    active={true}
                                    shape="square"

                                    block={true}
                                    className="w-50 height30"
                                />
                            </div>
                            <div className='box-body'>
                               
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <Skeleton.Button
                                            active={true}
                                            shape="square"
                                            key={i}
                                            block={true}
                                            className="mb-1 height30"
                                        />
                                        <Skeleton.Button
                                            active={true}
                                            shape="square"
                                            block={true}
                                            className=" height30" />
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                ))}


            </div>
        </div>
    );
};


CardUnderTableSkeleton.propTypes = {
    showArry: PropTypes.number,
};


CardUnderTableSkeleton.defaultProps = {
    showArry: 5,
};

export default CardUnderTableSkeleton;
