import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import notFound from '../../assets/images/notFount.png';
import MenuMasterLoader from './MenuMasterLoader';
import PropTypes from 'prop-types';

export const NotFound = (props) => {
  const location = useLocation();
  let token = sessionStorage?.getItem('token');

  if (token !== null && token !== undefined) {
    if (props?.menu !== undefined && props?.childrenRoutes?.length > 0) {
      return (

        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <img src={notFound} alt="NotFound" width="100%" />
              <div className="WebBtn  d-table m-auto ">
                <Link to="/homewidget" className='text-decoration-none footbtn WebBtn'>Go To Home</Link>
              </div>
            </div>
          </div>
        </div>

      )
    }
    else {
      return (

        <MenuMasterLoader />

      )
    }
  }
  else {
    return <Navigate to='/' state={{ from: location }} replace />
  }
}

export const NoContent = () => {
  return (<></>)
}

NotFound.propTypes = {
  menu: PropTypes.any,
  childrenRoutes: PropTypes.any,

}