import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const Update = ({ display, update, onUpdateComplete }) => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState({ title: 0, body: 0 });
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    console.log("Update prop changed:", update); // Debug için
    
    if (update && update._id) {
      const newTitle = update.title || "";
      const newBody = update.body || "";
      
      setInputs({
        title: newTitle,
        body: newBody,
      });
      setCharCount({
        title: newTitle.length,
        body: newBody.length
      });
    }
  }, [update, update?._id, update?.title, update?.body]); 


  useEffect(() => {
    if (display && update && update._id) {
      const newTitle = update.title || "";
      const newBody = update.body || "";
      
      setInputs({
        title: newTitle,
        body: newBody,
      });
      setCharCount({
        title: newTitle.length,
        body: newBody.length
      });
    }
  }, [display]); 

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setCharCount({ ...charCount, [name]: value.length });
  };

  const submit = async () => {
    // Validasyon
    if (!inputs.title.trim() || !inputs.body.trim()) {
      toast.error("Title and Body cannot be empty!");
      return;
    }

    if (inputs.title.length > 100) {
      toast.error("Title must be less than 100 characters!");
      return;
    }

    if (inputs.body.length > 500) {
      toast.error("Description must be less than 500 characters!");
      return;
    }

    if (!update || !update._id) {
      toast.error("Invalid task data!");
      return;
    }

    try {
      setIsSaving(true);
      const userId = sessionStorage.getItem("id");
      
      if (!userId) {
        toast.error("Please login first!");
        return;
      }

      const response = await axios.put(`/api/v2/updateTask/${update._id}`, {
        title: inputs.title,
        body: inputs.body,
        id: userId
      });

      if (response.data) {
        toast.success(response.data.message || "Task updated successfully!");
        
       
        setTimeout(() => {
          display("none");
          
          if (onUpdateComplete) {
            onUpdateComplete();
          }
          
          window.dispatchEvent(new Event('taskUpdated'));
         
          resetForm();
        }, 1000);
      }
    } catch (error) {
      console.error("Update error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update task. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setInputs({ title: "", body: "" });
    setCharCount({ title: 0, body: 0 });
  };

  const handleClose = () => {
    display("none");
  
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      submit();
    }
  };

  
  console.log("Current inputs:", inputs);
  console.log("Update data:", update);

  return (
    <div className="update-container" onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className="update-overlay" onClick={handleClose}></div>
      
      <div className="update-modal">
        {/* Header */}
        <div className="update-header">
          <div className="header-content">
            <div className="header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="update-title">Edit Task</h3>
              <p className="update-subtitle">Update your task details</p>
            </div>
          </div>
          <button className="close-button" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="update-form">
          {/* Title Input */}
          <div className="form-group">
            <label className="form-label">
              Task Title
              <span className="char-counter">{charCount.title}/100</span>
            </label>
            <input 
              type="text" 
              className={`form-input ${charCount.title > 100 ? 'error' : ''}`}
              placeholder="Enter a clear, descriptive title..."
              value={inputs.title} 
              name="title"
              onChange={change}
              maxLength="120"
            />
            {charCount.title > 100 && (
              <span className="error-text">Title is too long</span>
            )}
          </div>
          
          {/* Description Input */}
          <div className="form-group">
            <label className="form-label">
              Description
              <span className="char-counter">{charCount.body}/500</span>
            </label>
            <textarea 
              className={`form-textarea ${charCount.body > 500 ? 'error' : ''}`}
              placeholder="Describe your task in detail..."
              value={inputs.body} 
              name="body"
              onChange={change}
              rows="5"
              maxLength="520"
            />
            {charCount.body > 500 && (
              <span className="error-text">Description is too long</span>
            )}
          </div>

          {/* Shortcut Info */}
          <div className="shortcut-info">
            <span>💡 Tip: Press <kbd>Ctrl + Enter</kbd> to save, <kbd>Esc</kbd> to close</span>
          </div>
        </div>

        {/* Actions */}
        <div className="update-actions">
          <button 
            className="btn-secondary"
            onClick={handleClose}
            disabled={isSaving}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Cancel
          </button>
          
          <button 
            className={`btn-primary ${isSaving ? 'saving' : ''}`}
            onClick={submit}
            disabled={isSaving || !inputs.title.trim() || !inputs.body.trim() || charCount.title > 100 || charCount.body > 500}
          >
            {isSaving ? (
              <>
                <div className="spinner"></div>
                Saving...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Update Task
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;