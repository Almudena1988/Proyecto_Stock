import '../../css/modales.css';

export const Modal = ({ isOpen, onClose, children }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>


    )
}