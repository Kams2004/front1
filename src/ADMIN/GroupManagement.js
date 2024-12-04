import React, { useEffect, useState } from 'react';
import './GroupManagement.css';
import config from '../config';
import { useTranslation } from 'react-i18next';

const GroupManagement = () => {
  const { t } = useTranslation();
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${config.baseURL}roles/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setGroups(data);
        } else {
          console.error('Fetched data is not an array:', data);
          setGroups([]);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
        showMessage(t('ERROR_FETCHING_GROUPS'), 'error');
      }
    };

    fetchGroups();
  }, [t]);

  const handleAddGroup = async () => {
    if (newGroup.trim()) {
      const newGroupItem = { name: newGroup };
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`${config.baseURL}roles/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newGroupItem),
        });
        const result = await response.json();
        if (response.ok) {
          setGroups([...groups, result]);
          showMessage(t('GROUP_ADDED_SUCCESS', { groupName: newGroup }), 'success');
          setNewGroup('');
        } else {
          showMessage(result.Message || t('ERROR_ADDING_GROUP'), 'error');
        }
      } catch (error) {
        console.error('Error adding group:', error);
        showMessage(t('ERROR_ADDING_GROUP'), 'error');
      }
    } else {
      showMessage(t('INVALID_GROUP_NAME'), 'error');
    }
  };

  const handleDeleteGroup = async () => {
    if (!groupToDelete) return;
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${config.baseURL}roles/del/${groupToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setGroups(groups.filter((group) => group.id !== groupToDelete.id));
        showMessage(result.Message || t('GROUP_DELETED_SUCCESS'), 'success');
        setShowModal(false);
      } else {
        showMessage(result.Message || t('ERROR_DELETING_GROUP'), 'error');
      }
    } catch (error) {
      console.error('Error deleting group:', error);
      showMessage(t('ERROR_DELETING_GROUP'), 'error');
    } finally {
      setGroupToDelete(null);
    }
  };

  const confirmDelete = (group) => {
    setGroupToDelete(group);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setGroupToDelete(null);
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  return (
    <div className="group-management-container">
      {message && <p className={`group-management-message ${messageType}`}>{message}</p>}
      <h3>{t('GROUP_MANAGEMENT')}</h3>
      <div className="group-management-add-container">
        <input
          type="text"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder={t('ENTER_GROUP_NAME')}
          className="group-management-input"
        />
        <button className="group-management-add-button" onClick={handleAddGroup}>
          {t('ADD_GROUP')}
        </button>
      </div>
      <table className="table table-striped group-management-table">
        <thead>
          <tr>
            <th>{t('NO')}</th>
            <th>{t('GROUP_NAME')}</th>
            <th>{t('ACTIONS')}</th>
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
                  onClick={() => confirmDelete(group)}
                >
                  &minus;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
  <div className="group-management-modal-overlay">
    <div className="group-management-modal-container">
      <h4>{t('CONFIRM_DELETE')}</h4>
      <p>{t('CONFIRM_DELETE_GROUP', { groupName: groupToDelete?.name })}</p>
      <div className="group-management-modal-actions">
        <button className="btn btn-danger" onClick={handleDeleteGroup}>
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

export default GroupManagement;
