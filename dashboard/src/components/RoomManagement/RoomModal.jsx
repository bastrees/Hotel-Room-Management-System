import React from 'react';
import Modal from 'react-modal';
import RoomForm from './RoomForm';

Modal.setAppElement('#root'); // Ensure this is the same id used for your app root element

const RoomModal = ({ isOpen, onRequestClose, room, onSave }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Room Form"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    width: '80%',
                    maxWidth: '600px',
                    backgroundColor: '#f9f9f9'
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
            }}
        >
            <RoomForm room={room} onSave={onSave} onCancel={onRequestClose} />
        </Modal>
    );
};

export default RoomModal;
