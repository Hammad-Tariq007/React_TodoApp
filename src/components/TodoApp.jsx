import React, { useState } from "react";
import "./TodoApp.css"; // Assuming you have a CSS file for styling

export default function TodoApp() {
  const [input, setInput] = useState("");
  const [myTodos, setMyTodos] = useState([]);
  const [previousTodos, setPreviousTodos] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    const newTodo = { id: Date.now().toString(), text };
    setMyTodos((prev) => [newTodo, ...prev]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const deleteTodo = (id, fromPrevious = false) => {
    if (fromPrevious) {
      setPreviousTodos((prev) => prev.filter((t) => t.id !== id));
    } else {
      setMyTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveEdit = (id) => {
    const text = editText.trim();
    if (!text) return;
    setMyTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const completeTodo = (id) => {
    const todo = myTodos.find((t) => t.id === id);
    if (!todo) return;
    setMyTodos((prev) => prev.filter((t) => t.id !== id));
    setPreviousTodos((prev) => [todo, ...prev]);
  };

  const restoreTodo = (id) => {
    const todo = previousTodos.find((t) => t.id === id);
    if (!todo) return;
    setPreviousTodos((prev) => prev.filter((t) => t.id !== id));
    setMyTodos((prev) => [todo, ...prev]);
  };

  return (
    <div className="todo-app-container">
      <h1 className="app-title">Todo App — Functionality Demo</h1>

      <div className="input-add-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="todo-input"
          placeholder="Type a todo and press Add or Enter"
        />
        <button
          onClick={addTodo}
          disabled={!input.trim()}
          className="add-button"
        >
          Add
        </button>
      </div>

      <section className="todos-section">
        <h2 className="section-title">My Todos</h2>
        {myTodos.length === 0 ? (
          <p className="empty-message">No todos yet. Add one above.</p>
        ) : (
          <ul className="todo-list">
            {myTodos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  aria-label={`complete-${todo.id}`}
                  onChange={() => completeTodo(todo.id)}
                  className="todo-checkbox"
                />

                <div className="todo-text-container">
                  {editingId === todo.id ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="todo-edit-input"
                    />
                  ) : (
                    <span className="todo-text">{todo.text}</span>
                  )}
                </div>

                {editingId === todo.id ? (
                  <>
                    <button onClick={() => saveEdit(todo.id)} className="btn save-btn">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="btn cancel-btn">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(todo.id, todo.text)} className="btn edit-btn">
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(todo.id)} className="btn delete-btn">
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="todos-section">
        <h2 className="section-title">Previous Todos</h2>
        {previousTodos.length === 0 ? (
          <p className="empty-message">No previous todos yet.</p>
        ) : (
          <ul className="todo-list">
            {previousTodos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <input type="checkbox" checked readOnly className="todo-checkbox" />

                <div className="todo-text-container">
                  <span className="todo-text completed">{todo.text}</span>
                </div>

                <button onClick={() => restoreTodo(todo.id)} className="btn restore-btn">
                  Restore
                </button>
                <button onClick={() => deleteTodo(todo.id, true)} className="btn delete-btn">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
