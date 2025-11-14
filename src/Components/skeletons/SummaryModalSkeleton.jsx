import React from 'react';
import { Skeleton } from 'antd';

const SummaryModalSkeleton = () => {
    return (
        <>
            <div className='box-title-card SubheaderModal'>
                <p className='mb-0 box-title'><Skeleton.Button
                    active={true}
                    shape="square"
                    size='small'
                    block={true}
                    className="height10  w-50"
                /></p>
            </div>
            <div className='box-body'>

                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <div className="row">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div className="col-md-6" key={i}>
                                    <div className="FormStyle my-2 mt-3">
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
                                            className="mb-1 height15"
                                        />
                                    </div>
                                </div>
                            ))}
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
                    className="height10  w-50"
                /></p>
            </div>
            <div className='box-body'>

                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <div className="row">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div className="col-md-6" key={i}>
                                    <div className="FormStyle my-2 mt-3">
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
                                            className="mb-1 height15"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
};



export default SummaryModalSkeleton;
