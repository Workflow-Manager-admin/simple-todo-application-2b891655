import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Color palette and theme from project and Figma
const PRIMARY = "#1976D2";
const SECONDARY = "#424242";
const ACCENT = "#FFCA28";
const BG_MAIN = "#F5F7FF"; // Light blue-grey from Figma bg
const TODO_BG = "#fff";
const TODO_BORDER = "#EAEBF5";
const TODO_SHADOW = "0px 2px 12px 0px rgba(42,58,112,0.07)";
const BTN_BG = PRIMARY; // Main button color
const BTN_BG_SECONDARY = SECONDARY;
const BTN_BG_ACCENT = ACCENT;

/**
 * Utility icon components: Inline SVG, styled for minimal look
 */
function CheckIcon({ completed }) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke={PRIMARY}
      strokeWidth={2}
      viewBox="0 0 24 24"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        background: completed ? ACCENT : "#fff",
        borderRadius: "50%",
        border: `2px solid ${PRIMARY}`,
        boxShadow: completed
          ? `0 1px 4px 0 ${ACCENT}44`
          : undefined,
        transition: "background 0.15s",
        marginRight: 10,
      }}
    >
      {completed && (
        <polyline
          points="6 12 10 17 18 7"
          stroke="#fff"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
function EditIcon() {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={SECONDARY}
      strokeWidth="2"
      style={{ verticalAlign: "middle", marginRight: 1 }}
    >
      <path d="M15 4l5 5L7 22H2v-5z"/>
      <path d="M18 7a3 3 0 01-3-3"/>
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D0342C"
      strokeWidth="1.7"
      style={{ verticalAlign: "middle", marginRight: 1 }}
    >
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
    </svg>
  );
}

function AddIcon() {
  // Matches plus icon in Figma JSON/Figma FAB
  return (
    <svg width={28} height={28} fill="none" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="14" fill={PRIMARY} />
      <rect x="8" y="13" width="12" height="2" rx="1" fill="#FFF" />
      <rect x="13" y="8" width="2" height="12" rx="1" fill="#FFF" />
    </svg>
  );
}

/**
 * AppBar -- top of the todo page, with title and color block
 */
function AppBar() {
  return (
    <div
      style={{
        width: "100%",
        background: PRIMARY,
        padding: "0 0 18px 0",
        minHeight: 88,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxShadow: "0px 2px 8px 0px rgba(42,58,112,0.04)",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: "2rem",
          letterSpacing: "1.5px",
          marginLeft: 28,
          marginBottom: 0,
        }}
      >
        TODO APP
      </div>
      <div
        style={{
          color: "#fff",
          fontWeight: 400,
          fontSize: "16px",
          marginLeft: 28,
          marginBottom: 10,
          opacity: 0.72,
        }}
      >
        Keep your day organized ✨
      </div>
    </div>
  );
}

/**
 * TodoInput -- input for adding or editing, appears inline & in modal for edit
 */
function TodoInput({ value, setValue, onSave, disabled, placeholder, editing, onCancel }) {
  const inputRef = useRef();

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing, disabled]);

  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: 16,
        background: "#fff",
        boxShadow: TODO_SHADOW,
        border: `1px solid ${TODO_BORDER}`,
        padding: "0.5em .5em 0.5em 1em",
        marginBottom: editing ? 20 : 24,
        minHeight: 56,
        position: "relative"
      }}
      onSubmit={e => {
        e.preventDefault();
        if (!disabled && value.trim()) onSave();
      }}
      aria-label={editing ? "Edit todo" : "Add todo"}
    >
      <input
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: 18,
          color: "#282c34",
          background: "transparent",
          marginRight: 12,
        }}
        maxLength={120}
        autoFocus
        aria-label="Todo title"
      />
      {editing && (
        <>
          <button
            type="submit"
            style={{
              background: BTN_BG,
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: 8,
              padding: "6px 18px",
              fontSize: 16,
              marginLeft: 6,
              cursor: "pointer",
              transition: "opacity 0.2s"
            }}
            disabled={disabled || !value.trim()}
          >
            Update
          </button>
          <button
            type="button"
            style={{
              background: BTN_BG_SECONDARY,
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: 8,
              padding: "6px 14px",
              fontSize: 16,
              marginLeft: 8,
              cursor: "pointer",
              transition: "opacity 0.2s"
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </>
      )}
      {!editing && (
        <button
          type="submit"
          style={{
            border: "none",
            background: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            marginRight: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 8px"
          }}
          disabled={disabled || !value.trim()}
          aria-label="Add todo"
        >
          <AddIcon />
        </button>
      )}
    </form>
  );
}

/**
 * TodoItem -- renders one todo line with title, complete, edit, delete.
 */
function TodoItem({ todo, onComplete, onEdit, onDelete, isEditing }) {
  return (
    <div
      style={{
        background: TODO_BG,
        border: `1px solid ${TODO_BORDER}`,
        boxShadow: TODO_SHADOW,
        borderRadius: 16,
        padding: "17px 16px 10px 15px",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        opacity: todo.completed ? 0.65 : 1,
        minHeight: 56,
        pointerEvents: isEditing ? "none" : undefined,
      }}
      tabIndex={0}
    >
      <div
        style={{
          cursor: "pointer",
          marginRight: 6
        }}
        title={todo.completed ? "Completed" : "Mark as Completed"}
        aria-label={todo.completed ? "Completed" : "Mark as Completed"}
        onClick={() => {
          if (!isEditing) onComplete(todo.id);
        }}
      >
        <CheckIcon completed={todo.completed} />
      </div>
      <div
        style={{
          flex: 1,
          fontSize: 18,
          color: todo.completed ? "#999" : "#282c34",
          textDecoration: todo.completed ? "line-through" : "none",
          wordBreak: "break-word"
        }}
        aria-label={`Todo: ${todo.title}`}
      >
        {todo.title}
      </div>
      <button
        aria-label="Edit"
        title="Edit"
        style={{
          background: "none",
          border: "none",
          marginLeft: 4,
          marginRight: 0,
          padding: 4,
          cursor: isEditing ? "not-allowed" : "pointer",
          opacity: isEditing ? .55 : 1,
        }}
        onClick={() => !isEditing && onEdit(todo)}
        disabled={isEditing}
        tabIndex={0}
      >
        <EditIcon />
      </button>
      <button
        aria-label="Delete"
        title="Delete"
        style={{
          background: "none",
          border: "none",
          padding: 4,
          cursor: isEditing ? "not-allowed" : "pointer",
          marginLeft: 1,
          opacity: isEditing ? .55 : 1,
        }}
        onClick={() => !isEditing && onDelete(todo.id)}
        disabled={isEditing}
        tabIndex={0}
      >
        <TrashIcon />
      </button>
    </div>
  );
}

/**
 * TodoList -- renders all todo items
 */
function TodoList({ todos, onComplete, onEdit, onDelete, editId }) {
  if (!todos.length) {
    return (
      <div style={{ opacity: 0.6, margin: "32px 0", textAlign: "center", color: "#333" }}>
        No todos yet.<br />Let&apos;s get organized!
      </div>
    );
  }
  return (
    <section style={{ width: "100%" }}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          isEditing={editId !== null && editId !== undefined && editId !== todo.id}
        />
      ))}
    </section>
  );
}

/**
 * FloatingActionButton
 * For mobile Figma, but here we use inline add.
 * For demo, retain as FAB in corner to match Figma reference.
 */
function FloatingActionButton({ onClick }) {
  return (
    <button
      className="fab"
      title="Add Todo"
      aria-label="Add Todo"
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: 32,
        right: 24,
        width: 65,
        height: 65,
        background: PRIMARY,
        borderRadius: "50%",
        boxShadow: "0 6px 24px 0 #6c8cdc27, 0 1.5px 4.5px 0 #305ca41c",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 6,
        transition: "box-shadow 0.15s",
        cursor: "pointer"
      }}
    >
      <AddIcon />
    </button>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Main app state
  const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showInputOnFab, setShowInputOnFab] = useState(false);

  // LocalStorage integration
  useEffect(() => {
    // load from storage
    const raw = window.localStorage.getItem("todos");
    if (raw) {
      try {
        setTodos(JSON.parse(raw));
      } catch {}
    }
  }, []);
  useEffect(() => {
    // save on change
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  // PUBLIC_INTERFACE
  const handleAdd = () => {
    const title = inputTitle.trim();
    if (!title) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ]);
    setInputTitle("");
    setShowInputOnFab(false);
  };

  // PUBLIC_INTERFACE
  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  // PUBLIC_INTERFACE
  const handleUpdate = () => {
    if (!editValue.trim()) return;
    setTodos(
      todos.map((t) =>
        t.id === editingId ? { ...t, title: editValue.trim() } : t
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  // PUBLIC_INTERFACE
  const handleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // PUBLIC_INTERFACE
  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditValue("");
    }
  };

  // PUBLIC_INTERFACE
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  // Responsive: Show FAB on small screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) setShowInputOnFab(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // For accessibility: scroll to editing item
  useEffect(() => {
    if (editingId !== null && editingId !== undefined) {
      setTimeout(() => {
        const el = document.querySelector('[aria-label="Todo: ' + editValue + '"]');
        if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 250);
    }
  }, [editingId, editValue]);

  return (
    <div
      className="App"
      style={{
        background: BG_MAIN,
        minHeight: "100vh",
        paddingBottom: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      aria-label="Todo App Main"
    >
      <AppBar />
      <main
        style={{
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          padding: "32px 12px 0px 12px",
          minHeight: 440,
        }}
      >
        {/* Add/Edit todo input */}
        {editingId ? (
          <TodoInput
            value={editValue}
            setValue={setEditValue}
            onSave={handleUpdate}
            disabled={false}
            placeholder="Edit todo..."
            editing={true}
            onCancel={handleCancelEdit}
          />
        ) : (
          <TodoInput
            value={inputTitle}
            setValue={setInputTitle}
            onSave={handleAdd}
            disabled={false}
            placeholder="Add a new todo..."
            editing={false}
          />
        )}

        {/* The todo list */}
        <TodoList
          todos={todos}
          onComplete={handleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editId={editingId}
        />

        {/* Floating Action Button (FAB) hidden for desktop, shown for mobile */}
        {/* Figma uses a circular FAB for "Add" on mobile */}
        {window.innerWidth < 600 && !editingId && (
          <FloatingActionButton
            onClick={() => {
              setShowInputOnFab(true);
              setTimeout(() => {
                const el = document.querySelector('input[aria-label="Todo title"]');
                if (el) el.focus();
              }, 100);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
