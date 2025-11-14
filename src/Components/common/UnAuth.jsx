import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/images/401images.png';

const NotFound = () => {
  return (

    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <img src={notFound} alt="NotFound" width="100%" />
          <div className="WebBtn  d-table m-auto ">
            <Link to="/" className='text-decoration-none footbtn WebBtn'>Go To Home</Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default NotFound