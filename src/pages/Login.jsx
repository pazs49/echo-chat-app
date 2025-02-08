import { useState } from "react";
import useAuthentication from "../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthentication();
  return (
    <main>
      <section></section>
      <section>
        <form
          action="https://slack-api.replit.app/api/v1/auth/sign_in"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            value={email}
            type="email"
            name="email"
            id=""
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            name="password"
            id=""
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => {
              login(email, password);
            }}
            type="submit"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
};
export default Login;
