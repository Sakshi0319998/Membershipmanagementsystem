// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMembership = () => {
  const [membership, setMembership] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    category_id: "",
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Component mounted');
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      console.log('Cleanup on unmount');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", membership.name);
    formData.append("email", membership.email);
    formData.append("password", membership.password);
    formData.append("address", membership.address);
    formData.append("category_id", membership.category_id);

    axios
      .post("http://localhost:3000/auth/add_membership", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/membership");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border ">
        <h3 className="text-center">Add Membership</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setMembership({ ...membership, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setMembership({ ...membership, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Enter password"
              onChange={(e) =>
                setMembership({ ...membership, password: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter Address"
              autoComplete="off"
              onChange={(e) =>
                setMembership({ ...membership, address: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              className="form-select"
              value={membership.category_id}
              onChange={(e) =>
                setMembership({ ...membership, category_id: e.target.value })
              }
            >
              <option value="">Select a category</option>
              {category.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Membership
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMembership;