
import React from 'react';
import './modal.css';
import './../App.css';

const Modal = ({ isOpen, onClose,children}) => {
    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                {children}
                <div className="button-center">
                    <button onClick={onClose}>Close</button>

                </div>

            </div>
        </div>
    );
};

export default Modal;
