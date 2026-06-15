import { useState } from "react";
import CartQuantity from "./components/CartQuantity";
import PasswordToggle from "./components/PasswordToggle";
import ThemeToggle from "./components/ThemeToggle";
import LikeButton from "./components/LikeButton";
import TodoList from "./components/TodoList";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>React Practice Components</h1>

      {/* Counter */}
      <section>
        <h2>1. Counter</h2>
        <h3>Count: {count}</h3>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </section>

      <hr />

      {/* Cart Quantity */}
      <section>
        <h2>2. Cart Quantity</h2>
        <CartQuantity />
      </section>

      <hr />

      {/* Password Toggle */}
      <section>
        <h2>3. Password Toggle</h2>
        <PasswordToggle />
      </section>

      <hr />

      {/* Theme Toggle */}
      <section>
        <h2>4. Theme Toggle</h2>
        <ThemeToggle />
      </section>

      <hr />

      {/* Like Button */}
      <section>
        <h2>5. Like Button</h2>
        <LikeButton />
      </section>

      <hr />

      {/* Todo List */}
      <section>
        <h2>6. Todo List</h2>
        <TodoList />
      </section>

      <hr />

      {/* Register Form */}
      <section>
        <h2>7. Register Form</h2>
        <RegisterForm />
      </section>
    </div>
  );
}

export default App;