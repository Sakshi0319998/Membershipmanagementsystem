import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [membershipTotal, setMembershipTotal] = useState(0);

  useEffect(() => {
    adminCount();
    membershipCount();
  }, []); // Add dependency array to run once on mount

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      })
      .catch(error => {
        console.error("Error fetching admin count:", error);
      });
  };

  const membershipCount = () => {
    axios.get('http://localhost:3000/auth/membership_count')
      .then(result => {
        if (result.data.Status) {
          setMembershipTotal(result.data.Result[0].membership);
        }
      })
      .catch(error => {
        console.error("Error fetching membership count:", error);
      });
  };

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-around mt-3'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Membership</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-around mt-3'>
            <h5>Total:</h5>
            <h5>{membershipTotal}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;