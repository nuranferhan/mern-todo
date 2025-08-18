import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";

const TodoCards = ({ 
  title, 
  body, 
  id, 
  delid, 
  display, 
  updateId, 
  toBeUpdate, 
  isCompleted, 
  onToggleComplete, 
  isDragging, 
  isDraggedOver 
}) => {
  // Delete 
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      delid(id);
    }
  }; 

  // Update 
  const handleUpdate = () => {
    display("block");
    toBeUpdate(updateId);
  };

  // Complete/Uncomplete toggle 
  const handleToggleComplete = async () => {
    await onToggleComplete(id);
  };

  return (
    <div className={`p-3 todo-card ${isCompleted ? 'completed' : ''} ${isDragging ? 'dragging' : ''} ${isDraggedOver ? 'drag-over' : ''}`}>
      <div>
        <h5 className={isCompleted ? 'completed' : ''}>{title}</h5>
        {/* Body'yi 77 karaktere kısaltırken düzgün kesme */}
        <p className={`todo-card-p ${isCompleted ? 'completed' : ''}`}>
          {body.length > 77 ? body.substring(0, 77) + "..." : body}
        </p>
      </div>
      <div className="d-flex justify-content-around">
        <div 
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
          onClick={handleToggleComplete}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleToggleComplete();
            }
          }}
        >
          {isCompleted ? (
            <MdCheckCircle className={`card-icons complete-btn completed`} />
          ) : (
            <MdRadioButtonUnchecked className={`card-icons complete-btn`} />
          )}
          {isCompleted ? 'Undo' : 'Complete'}
        </div>
        <div 
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
          onClick={handleUpdate}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleUpdate();
            }
          }}
        >
          <GrDocumentUpdate className="card-icons" /> Update
        </div>
        <div 
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={handleDelete}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleDelete();
            }
          }}
        >
          <AiFillDelete className="card-icons del" /> Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;