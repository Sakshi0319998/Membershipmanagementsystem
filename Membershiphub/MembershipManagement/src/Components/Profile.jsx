// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's profile data
    axios.get('http://localhost:3000/auth/profile')
      .then(result => {
        if (result.data.Status) {
          setUserData(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => {
        console.error(err);
        setError("Failed to fetch profile data.");
      })
      .finally(() => setLoading(false)); // End loading state
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    try {
      const result = await axios.put('http://localhost:3000/auth/update_profile', userData);
      if (result.data.Status) {
        alert('Profile updated successfully');
        navigate('/dashboard'); // Navigate to another page after success
      } else {
        setError(result.data.Error);
      }
    } catch (err) {
      console.error(err);
      setError("Error updating profile.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>; // Loading indicator
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Profile</h3>
        {error && <div className="text-danger">{error}</div>}
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-0"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
