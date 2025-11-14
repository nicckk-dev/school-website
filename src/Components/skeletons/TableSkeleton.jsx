import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

const TableSkeleton = ({ showArry }) => {
    return (
        <div className="EasFoot">
            <div className="container-fluid mb-3">
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


TableSkeleton.propTypes = {
    showArry: PropTypes.number,
};


TableSkeleton.defaultProps = {
    showArry: 5,
};

export default TableSkeleton;
