import useAuthentication from "../hooks/useAuthentication";

import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, checkAuth } = useAuthentication();

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action="https://slack-api.replit.app/api/v1/auth/sign_in"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  login(email, password);
                }}
                type="submit"
              >
                Login
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    OR
                  </span>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  navigate("/register");
                }}
                type="submit"
              >
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};
export default Login;

{
  /* <section></section>
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
            id="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            name="password"
            id="password"
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
      </section> */
}
