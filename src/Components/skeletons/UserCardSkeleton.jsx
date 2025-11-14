import { Skeleton } from 'antd'
import React from 'react'

const UserCardSkeleton = () => {
    return (
        <div className="MainwithFooteas">
        <div className='container-fluid'>
            <div className='row mt-0'>
                {Array.from({ length: 12 }).map((_, i) => (
                    <div className="col-md-3 mt-3" key={i}>
                        <div className="StpCard usercardSkeleton" >
                            <div className="row">
                                <div className="col-md-3 col-3">
                                    <div className='imgbox1 bg-white' >  <Skeleton.Button active={"active"} shape={"square"} block={"true"} className='rounduser' /></div>

                                </div>
                                <div className="col-md-8 col-9 text-end">

                                    {Array.from({ length: 4 }).map((_, index) => (
                                        <Skeleton.Button active={"active"} shape={"square"} block={"true"} className='height10 w-80 mb-1' key={index} />
                                    ))}

                                </div>

                            </div> </div>

                    </div>
                ))}

            </div>
        </div>
        </div>

    )
}

export default UserCardSkeleton