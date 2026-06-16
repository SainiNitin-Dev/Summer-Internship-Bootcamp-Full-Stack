import { useState } from "react";
import CartQuantity from "./components/CartQuantity";
import PasswordToggle from "./components/PasswordToggle";
import ThemeToggle from "./components/ThemeToggle";
import LikeButton from "./components/LikeButton";
import TodoList from "./components/TodoList";
import RegisterForm from "./components/RegisterForm";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Practice Components</h1>
      </header>

      <div className="components-grid">
        {/* Counter */}
        <section className="component-card">
          <h2>1. Counter</h2>
          <div className="counter-display">
            <h3>Count: {count}</h3>
          </div>
          <div className="button-group">
            <button onClick={() => setCount(count + 1)} className="btn btn-increase">Increase</button>
            <button onClick={() => setCount(count - 1)} className="btn btn-decrease">Decrease</button>
            <button onClick={() => setCount(0)} className="btn btn-reset">Reset</button>
          </div>
        </section>

        {/* Cart Quantity */}
        <section className="component-card">
          <h2>2. Cart Quantity</h2>
          <CartQuantity />
        </section>

        {/* Password Toggle */}
        <section className="component-card">
          <h2>3. Password Toggle</h2>
          <PasswordToggle />
        </section>

        {/* Theme Toggle */}
        <section className="component-card">
          <h2>4. Theme Toggle</h2>
          <ThemeToggle />
        </section>

        {/* Like Button */}
        <section className="component-card">
          <h2>5. Like Button</h2>
          <LikeButton />
        </section>

        {/* Todo List */}
        <section className="component-card">
          <h2>6. Todo List</h2>
          <TodoList />
        </section>

        {/* Register Form */}
        <section className="component-card">
          <h2>7. Register Form</h2>
          <RegisterForm />
        </section>
      </div>
    </div>
  );
}

export default App;