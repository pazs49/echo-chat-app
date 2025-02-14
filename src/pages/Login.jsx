import useAuthentication from "../hooks/useAuthentication";

import { useEffect, useState } from "react";

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
import { BorderBeam } from "@/components/magicui/border-beam";

import { useToast } from "@/hooks/use-toast";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const { login, checkAuth } = useAuthentication();

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("auth")) setLoading(false);
      const authStatus = await checkAuth();
      if (authStatus) navigate("/");
    })();
  }, []);

  return (
    !loading && (
      <main className="flex h-screen w-screen items-center justify-center bg-slate-700">
        <Card className="mx-auto max-w-sm bg-slate-600 border-none relative shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-slate-200">
              Login
            </CardTitle>
            <CardDescription className="text-center text-slate-200">
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
                  <Input
                    className="placeholder:text-white border-none bg-slate-800 text-white focus:border-indigo-500"
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
                  <Input
                    className="placeholder:text-white border-none bg-slate-800 text-white focus:border-indigo-500"
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
                  variant="primary"
                  className="w-full"
                  onClick={async () => {
                    const data = await login(email, password);
                    if (data?.response?.data?.errors)
                      toast({
                        title: data.response.data.errors,
                        variant: "destructive",
                      });
                  }}
                  type="submit"
                >
                  Login
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase text-slate-200">
                    <span className="px-2">OR</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
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
          <BorderBeam duration={5} size={200} />
        </Card>
      </main>
    )
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
