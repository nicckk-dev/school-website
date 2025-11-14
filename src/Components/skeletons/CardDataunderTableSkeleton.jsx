import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

const CardDataunderTableSkeleton = ({ showArry }) => {
    return (
        <div className="EasFoot">

            <div className="container-fluid mb-3">
                <div className="boxcard mt-2">
                    <div className='box-body pb-0'>
                        <div className='row align-items-center'>
                            <div className="col-md-3 mt-3" >

                                <div className='w-50'>
                                    <Skeleton.Button
                                        active={true}
                                        shape="square"
                                        size='small'
                                        block={true}
                                        className="height15 mb-1"
                                    />
                                </div>
                                <Skeleton.Button
                                    active={true}
                                    shape="square"
                                    block={true}
                                    className="height30"
                                />
                            </div>

                            <div className="col-md-3 mt-3" >

                                <div className='w-50'>
                                    <Skeleton.Button
                                        active={true}
                                        shape="square"
                                        size='small'
                                        block={true}
                                        className="height15  mb-1"
                                    />
                                </div>
                                <Skeleton.Button
                                    active={true}
                                    shape="square"
                                    block={true}
                                    className="height30"
                                />
                            </div>
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
                            <div className='col-md-3  d-flex justify-content-end'>
                                <div className='iconSkeleton  rounded-circle me-3'>
                                <Skeleton.Button
                                    active={true}
                                    shape="circle"
                                    block={true}
                                    className="mb-1"
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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


CardDataunderTableSkeleton.propTypes = {
    showArry: PropTypes.number,
};


CardDataunderTableSkeleton.defaultProps = {
    showArry: 5,
};

export default CardDataunderTableSkeleton;
