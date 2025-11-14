import React from 'react';
import { Skeleton } from 'antd';

const FormSkeletonModal = () => {
    return (
        <div className="EasFoot">
            <div className="container-fluid mb-3">
                <div className='boxcard mb-2 mt-2'>
                    <div className='box-title-card SubheaderModal'>
                        <p className='mb-0 box-title'><Skeleton.Button
                            active={true}
                            shape="square"
                            size='small'
                            block={true}
                            className="w-50"
                        /></p>
                    </div>
                    <div className='box-body'>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="row">
                                    {Array.from({ length: 2 }).map((_, i) => (
                                        <div className="col-md-6" key={i}>
                                            <div className="FormStyle my-2">
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
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='box-title-card SubheaderModal'>
                        <p className='mb-0 box-title'><Skeleton.Button
                            active={true}
                            shape="square"
                            size='small'
                            block={true}
                            className="w-50"
                        /></p>
                    </div>
                    <div className='box-body'>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="row">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div className="col-md-6" key={i}>
                                            <div className="FormStyle my-2">
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
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default FormSkeletonModal;
