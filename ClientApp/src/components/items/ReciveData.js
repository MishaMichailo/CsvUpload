import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/datastyle.css";

const ReciveData = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7216/User");
      setUserData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilter = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredResult = userData.filter((user) => {
      return (
        user.name.toLowerCase().includes(keyword) ||
        user.dateOfBirth.toLowerCase().includes(keyword) ||
        user.married.toString().toLowerCase().includes(keyword) ||
        user.phone.toLowerCase().includes(keyword) ||
        user.salary.toString().toLowerCase().includes(keyword)
      );
    });
    setFilteredData(filteredResult);
  };

  const handleSort = (field) => {
    const sortOrderNext = sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(sortOrderNext);
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortOrderNext === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setFilteredData(sortedData);
  };

  const handleEdit = (id, field, value) => {
    const updatedFilteredData = filteredData.map((user) => {
      if (user.id === id) {
        return { ...user, [field]: value };
      }
      return user;
    });
    setFilteredData(updatedFilteredData);
  };
  const handleSave = async (id) => {
  try {
    const userToSave = filteredData.find((user) => user.id === id);
    if (!userToSave) return;

    // Extract only the fields that need to be updated
    const updatedUserData = {
      name: userToSave.name,
      dateOfBirth: userToSave.dateOfBirth,
      married: userToSave.married,
      phone: userToSave.phone,
      salary: userToSave.salary
    };

    await axios.put(
      `https://localhost:7216/User/${id}`,
      updatedUserData
    );

    fetchData(); 
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://localhost:7216/User/${id}`);
      fetchData(); // After deletion, update the data
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1>User Data</h1>
      <input type="text" placeholder="Filter..." onChange={handleFilter} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("dateOfBirth")}>Date of Birth</th>
            <th onClick={() => handleSort("married")}>Married</th>
            <th onClick={() => handleSort("phone")}>Phone</th>
            <th onClick={() => handleSort("salary")}>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleEdit(user.id, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.dateOfBirth}
                  onChange={(e) =>
                    handleEdit(user.id, "dateOfBirth", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={user.married}
                  onChange={(e) =>
                    handleEdit(user.id, "married", e.target.checked)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.phone}
                  onChange={(e) => handleEdit(user.id, "phone", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={user.salary}
                  onChange={(e) =>
                    handleEdit(user.id, "salary", e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleSave(user.id)}>Save</button>
              </td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReciveData;
