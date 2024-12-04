import React, { useEffect, useState, useCallback } from 'react';
import UserRegistration from './UserRegistration';
import axios from 'axios';
import './UserManagement.css';
import config from '../config';
import { useAuth } from '../AuthContext';
import { useTranslation } from 'react-i18next'; // Import the translation hook

axios.defaults.withCredentials = true;

const UserManagement = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [showRegistration, setShowRegistration] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { isConnected } = useAuth();

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowRegistration(true); // Open the user registration form for editing
  };

  const fetchUsers = useCallback(async () => {
    if (!isConnected) {
      showMessage(t('USER_NOT_CONNECTED'), 'error');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${config.baseURL}users/all`, { withCredentials: true });
      setUsers(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.Message || t('FAILED_TO_FETCH_USERS');
      showMessage(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }, [isConnected, t]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRegister = async () => {
    setShowRegistration(false);
    setCurrentUser(null);
    await fetchUsers();
    showMessage(t('USER_REGISTERED_SUCCESSFULLY'), 'success');
  };

  const handleCancel = () => {
    setShowRegistration(false);
    setCurrentUser(null);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!isConnected || !userToDelete) return;

    try {
      const response = await axios.delete(`${config.baseURL}users/del/${userToDelete.id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        showMessage(response.data.Message || t('USER_DELETED_SUCCESSFULLY'), 'success');
        await fetchUsers();
      } else {
        showMessage(response.data.Message || t('FAILED_TO_DELETE_USER'), 'error');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.Message || err.message;
      showMessage(`${t('FAILED_TO_DELETE_USER')}: ${errorMessage}`, 'error');
    } finally {
      setShowModal(false);
      setUserToDelete(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (e) => setItemsPerPage(Number(e.target.value));

  return (
    <div className="um-container">
      {message && <p className={`um-message ${messageType}`}>{message}</p>}

      {loading ? (
        <div className="loader"></div>
      ) : showRegistration ? (
        <UserRegistration onRegister={handleRegister} onCancel={handleCancel} user={currentUser} />
      ) : (
        <>
          <h3>{t('USER_MANAGEMENT')}</h3>
          <button
            className="um-add-user-button"
            onClick={() => {
              setCurrentUser(null);
              setShowRegistration(true);
            }}
          >
            {t('ADD_USER')}
          </button>

          <div className="um-pagination-controls">
            <label>
              {t('ITEMS_PER_PAGE')}:
              <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </label>
          </div>

          <table className="table table-striped um-table">
            <thead>
              <tr>
                <th>{t('NO')}</th>
                <th>{t('NAME')}</th>
                <th>{t('EMAIL')}</th>
                <th>{t('ROLES')}</th>
                <th>{t('ACTIONS')}</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.roles.length > 0
                      ? user.roles.map((role) => role.name).join(', ')
                      : t('NO_ROLES')}
                  </td>
                  <td className="um-action-buttons">
                    <button
                      className="btn btn-warning um-btn-action rounded-pill"
                      onClick={() => handleEdit(user)}
                    >
                      {t('UPDATE')}
                    </button>
                    <button
                      className="btn btn-danger um-btn-action rounded-pill"
                      onClick={() => handleDeleteClick(user)}
                    >
                      {t('DELETE')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="um-pagination-controls">
            <div className="um-pagination-buttons">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="um-page-info">
              {t('PAGE')}: {currentPage} {t('OF')} {totalPages}
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h4>{t('CONFIRM_DELETE')}</h4>
            <p>{t('DELETE_CONFIRMATION', { name: `${userToDelete?.first_name} ${userToDelete?.last_name}` })}</p>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={confirmDelete}>
                {t('DELETE')}
              </button>
              <button className="btn btn-secondary" onClick={closeModal}>
                {t('CANCEL')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
