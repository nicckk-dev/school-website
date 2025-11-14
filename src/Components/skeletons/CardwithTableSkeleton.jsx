import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

const CardwithTableSkeleton = ({ showArry }) => {
    return (
        <div className="EasFoot">
            <div className="container-fluid mb-3">
                <div className="boxcard mt-2">
                    <div className='box-body'>
                        <div className='row '>
                            <div className="col-md-3 mt-3" >

                                <div className='w-50'>
                                    <Skeleton.Button
                                        active={true}
                                        shape="square"
                                        size='small'
                                        block={true}
                                        className="mb-1 height15 "
                                    />
                                </div>
                                <Skeleton.Button
                                    active={true}
                                    shape="square"
                                    block={true}
                                    className="mb-1 height30"
                                />
                            </div>

                            <div className='col-md-2 mt-3'>
                                <div className='height15 mb-2'></div>
                                <Skeleton.Button
                                    active={true}
                                    shape="square"
                                    block={true}
                                    className="mb-1 height30"
                                />
                            </div>
                            <div className='col-md-4 offset-md-3 mt-3'>
                                <div className='height15 mb-2'></div>
                                <Skeleton.Button
                                    active={true}
                                    shape="square"
                                    block={true}
                                    className="mb-1 height30"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-12">
                        {Array.from({ length: showArry }).map((_, i) => (
                            <Skeleton.Button
                                active={true}
                                shape="square"
                                key={i}
                                block={true}
                                className="mb-1 height30"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


CardwithTableSkeleton.propTypes = {
    showArry: PropTypes.number,
};


CardwithTableSkeleton.defaultProps = {
    showArry: 5,
};

export default CardwithTableSkeleton;
