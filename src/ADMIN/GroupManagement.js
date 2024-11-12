import React, { useEffect, useState } from 'react';
import './GroupManagement.css';
import config from '../config';

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [message, setMessage] = useState(''); // State to store success/error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Fetch groups from the backend on component mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage

        const response = await fetch(`${config.baseURL}roles/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the authorization token in the headers
          }
        });

        const data = await response.json();

        // Ensure the data is an array before setting it to state
        if (Array.isArray(data)) {
          setGroups(data);
        } else {
          console.error('Fetched data is not an array:', data);
          setGroups([]); // Set groups to an empty array if the data is not as expected
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
        showMessage('Error fetching groups. Please try again.', 'error');
      }
    };

    fetchGroups();
  }, []);

  const handleAddGroup = async () => {
    if (newGroup.trim()) {
      const newGroupItem = { name: newGroup };
      const token = localStorage.getItem('accessToken'); // Retrieve the access token

      try {
        const response = await fetch(`${config.baseURL}roles/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the authorization token
          },
          body: JSON.stringify(newGroupItem),
        });

        const result = await response.json(); // Collect the response message

        if (response.ok) {
          setGroups([...groups, result]);
          showMessage(`Group "${newGroup}" added successfully!`, 'success'); // Success message
          setNewGroup(''); // Clear input field
        } else {
          showMessage(result.Message || 'Failed to add group.', 'error'); // Error message
        }
      } catch (error) {
        console.error('Error adding group:', error);
        showMessage('Error adding group. Please try again.', 'error');
      }
    } else {
      showMessage('Please enter a valid group name.', 'error');
    }
  };

  const handleDeleteGroup = async (id) => {
    const token = localStorage.getItem('accessToken'); // Retrieve the access token

    try {
      const response = await fetch(`${config.baseURL}roles/del/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the authorization token
        },
      });

      const result = await response.json(); // Collect the response message

      if (response.ok) {
        const updatedGroups = groups.filter(group => group.id !== id);
        setGroups(updatedGroups); // Update the state with the new group list
        showMessage(result.Message || 'Group deleted successfully.', 'success'); // Success message
      } else {
        showMessage(result.Message || 'Failed to delete group.', 'error'); // Error message
      }
    } catch (error) {
      console.error('Error deleting group:', error);
      showMessage('Error deleting group. Please try again.', 'error');
    }
  };

  // Function to show the message with a specific type ('success' or 'error')
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);

    // Automatically clear the message after 3 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  return (
    <div className="group-management-container">
      {/* Display the success or error message with dynamic styling */}
      {message && (
        <p className={`message text-center ${messageType}`}>
          {message}
        </p>
      )}

      <h3>Group Management</h3>

      <div className="add-group-container">
        <input
          type="text"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="Enter group name"
          className="group-input"
        />
        <button className="add-group-button" onClick={handleAddGroup}>Add Group</button>
      </div>

      <table className="table table-striped group-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Group Name</th>
            <th>Actions</th> {/* New Actions column */}
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={group.id}>
              <td>{index + 1}</td>
              <td>{group.name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm rounded-pill"
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  &minus; {/* Unicode minus symbol */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupManagement;
