const ModalUpdate = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>User details updated successfully!</p>
      </div>
    </div>
  );
};

export default ModalUpdate;
