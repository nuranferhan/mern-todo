import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from "./Update";
import axios from "axios";

const Todo = () => {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [array, setArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("id"));
  const [updateTask, setUpdateTask] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  const show = () => {
    const textarea = document.getElementById("textarea");
    if (textarea) {
      textarea.style.display = "block";
    }
  }; 

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
 
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredArray(array);
      return;
    }

    const filtered = array.filter(task => {
      const titleWords = task.title.toLowerCase().split(/\s+/);
      const bodyWords = task.body.toLowerCase().split(/\s+/);

      // Her kelimenin başı kontrol edilir
      const titleMatch = titleWords.some(word => word.startsWith(query));
      const bodyMatch = bodyWords.some(word => word.startsWith(query));

      return titleMatch || bodyMatch;
    });

    setFilteredArray(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredArray(array);
  };

  const submit = async () => {
    const currentId = sessionStorage.getItem("id");
    
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title Or Body Can't Be Empty");
      return;
    }

    if (currentId) {
      try {
        const response = await axios.post("/api/v2/addTask", {
          title: inputs.title,
          body: inputs.body,
          id: currentId,
        });
        console.log(response);
        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added");
        
        fetchTasks(currentId);
      } catch (error) {
        console.error(error);
        toast.error("Failed to add task. Please try again.");
      }
    } else {
      toast.error("Your Task Is Not Saved! Please SignUp");
    }
  };

  const del = async (Cardid) => {
    const currentId = sessionStorage.getItem("id");
    
    if (currentId) {
      try {
        await axios.delete(`/api/v2/deleteTask/${Cardid}`, {
          data: { id: currentId },
        });
        toast.success("Your Task Is Deleted");
        fetchTasks(currentId);
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete task. Please try again.");
      }
    } else {
      toast.error("Please SignUp First");
    }
  };

  const dis = (value) => {
    const updateElement = document.getElementById("todo-update");
    if (updateElement) {
      updateElement.style.display = value;
    }
  };
 
  const update = (taskIndex) => {
    if (array[taskIndex]) {
      setUpdateTask(array[taskIndex]);
      console.log("Güncellenecek task:", array[taskIndex]); 
    }
  };

  const toggleComplete = async (taskId) => {
    const currentId = sessionStorage.getItem("id");
    
    if (!currentId) {
      toast.error("Please SignUp First");
      return;
    }

    try {
  
      const task = array.find(t => t._id === taskId);
      if (!task) return;

   
      const newCompletedState = !task.isCompleted;
      
      setArray(prevArray => 
        prevArray.map(t => 
          t._id === taskId ? { ...t, isCompleted: newCompletedState } : t
        )
      );

    
      setFilteredArray(prevArray => 
        prevArray.map(t => 
          t._id === taskId ? { ...t, isCompleted: newCompletedState } : t
        )
      );
  
      await axios.put(`/api/v2/toggleComplete/${taskId}`, {
        isCompleted: newCompletedState
      });

      toast.success(newCompletedState ? "Task completed" : "Task marked as incomplete");
    } catch (error) {
      console.error("Failed to update task completion:", error);
      toast.error("Failed to update task. Please try again.");
 
      fetchTasks(currentId);
    }
  };
 
  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = 'move';
  
    setTimeout(() => {
      const draggedElement = document.querySelector(`[data-drag-index="${index}"]`);
      if (draggedElement) {
        draggedElement.classList.add('dragging');
      }
    }, 0);
  };

  const handleDragEnd = (e) => {
    document.querySelectorAll('.dragging').forEach(el => {
      el.classList.remove('dragging');
    });
    
    setDraggedItem(null);
    setDraggedOverItem(null);

    document.querySelectorAll('.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedItem && draggedItem.index !== index) {
      setDraggedOverItem(index);
    }
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (draggedItem && draggedItem.index !== index) {
      setDraggedOverItem(index);
    }
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDraggedOverItem(null);
    }
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    setDraggedOverItem(null);
    
    if (!draggedItem || draggedItem.index === dropIndex) {
      setDraggedItem(null);
      return;
    }

    const newArray = [...array];
    const newFilteredArray = [...filteredArray];
    const draggedItemData = newArray[draggedItem.index];

    newArray.splice(draggedItem.index, 1);
    newArray.splice(dropIndex, 0, draggedItemData);
    setArray(newArray);

    const filteredDraggedIndex = filteredArray.findIndex(item => item._id === draggedItemData._id);
    const filteredDropIndex = filteredArray.findIndex(item => item._id === filteredArray[dropIndex]._id);
    
    if (filteredDraggedIndex !== -1 && filteredDropIndex !== -1) {
      const filteredDraggedItem = newFilteredArray[filteredDraggedIndex];
      newFilteredArray.splice(filteredDraggedIndex, 1);
      newFilteredArray.splice(filteredDropIndex, 0, filteredDraggedItem);
      setFilteredArray(newFilteredArray);
    }
    
    try {
      const tasksWithOrder = newArray.map((task, index) => ({
        id: task._id,
        order: index
      }));

      await axios.put("/api/v2/updateOrder", {
        tasks: tasksWithOrder
      });

      toast.success("Task order updated");
    } catch (error) {
      console.error("Failed to update task order:", error);
      toast.error("Failed to update task order. Please try again.");
      fetchTasks(userId);
    }
    
    setDraggedItem(null);
  };

  const fetchTasks = async (id) => {
    if (id) {
      try {
        const response = await axios.get(`/api/v2/getTasks/${id}`);
        const tasks = response.data.list || [];
        setArray(tasks);

        if (searchQuery) {
          const filtered = tasks.filter(task => {
            const titleWords = task.title.toLowerCase().split(/\s+/);
            const bodyWords = task.body.toLowerCase().split(/\s+/);
            const query = searchQuery.toLowerCase();

            const titleMatch = titleWords.some(word => word.startsWith(query));
            const bodyMatch = bodyWords.some(word => word.startsWith(query));

            return titleMatch || bodyMatch;
          });
          setFilteredArray(filtered);
        } else {
          setFilteredArray(tasks);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }
  };

  const handleUpdateComplete = () => {
    fetchTasks(userId);
    setUpdateTask(null); 
  };

  useEffect(() => {
    const currentId = sessionStorage.getItem("id");
    setUserId(currentId);
    
    if (currentId) {
      fetchTasks(currentId);
    }

    const handleTaskUpdate = () => {
      const id = sessionStorage.getItem("id");
      fetchTasks(id);
    };

    const handleStorageChange = () => {
      const newId = sessionStorage.getItem("id");
      setUserId(newId);
      if (newId) {
        fetchTasks(newId);
      }
    };

    window.addEventListener('taskUpdated', handleTaskUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('taskUpdated', handleTaskUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              placeholder="BODY"
              name="body"
              className="p-2 todo-inputs"
              value={inputs.body}
              onChange={change}
            />
          </div>
          <div className="w-lg-50 w-100 my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>

        <div className="todo-body">
          <div className="container-fluid">
            {/* Arama Bölümü */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="search-container d-flex justify-content-center">
                  <div className="search-wrapper">
                    <div className="search-input-container">
                      <div className="search-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search your tasks"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="search-clear-btn"
                          aria-label="Clear search"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="search-glow"></div>
                  </div>
                </div>
                {searchQuery && (
                  <div className="search-results-info">
                    <div className="search-results-text">
                      <span className="results-count">{filteredArray.length}</span>
                      <span className="results-label">
                        {filteredArray.length === 1 ? 'task found' : 'tasks found'}
                      </span>
                      <span className="search-term">for "{searchQuery}"</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              {filteredArray && filteredArray.length > 0 ? (
                filteredArray.map((item, index) => (
                  <div 
                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" 
                    key={item._id}
                    data-drag-index={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}
                      isCompleted={item.isCompleted || false}
                      onToggleComplete={toggleComplete}
                      isDragging={draggedItem?.index === index}
                      isDraggedOver={draggedOverItem === index}
                      searchQuery={searchQuery}
                    />
                  </div>
                ))
              ) : searchQuery ? (
                <div className="col-12 text-center my-5">
                  <div className="no-tasks-message">
                    <div className="empty-search-state">
                      <div className="empty-search-icon">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h4 className="empty-title">No matching tasks</h4>
                      <p className="empty-description">
                        We couldn't find any tasks matching <span className="search-highlight">"{searchQuery}"</span>
                      </p>
                      <button 
                        onClick={clearSearch}
                        className="clear-search-btn"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Clear Search
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update 
            display={dis} 
            update={updateTask} 
            onUpdateComplete={handleUpdateComplete}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;