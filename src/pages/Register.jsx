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
import { Toaster } from "@/components/ui/toaster";

import { useToast } from "@/hooks/use-toast";

import { useNavigate } from "react-router-dom";

import { useEffect, useReducer } from "react";

import useAuthentication from "@/hooks/useAuthentication";
//
const initialState = {
  email: "",
  password: "",
  password_confirmation: "",
  error: null,
};

const UPDATE_FIELD = "UPDATE_FIELD";

const Register = () => {
  const navigate = useNavigate();

  const { toast } = useToast();
  const { register } = useAuthentication();

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case UPDATE_FIELD:
        return {
          ...state,
          email: action.payload.email,
          password: action.payload.password,
          password_confirmation: action.payload.password_confirmation,
          error: null,
        };
      default:
        return state;
    }
  }

  const registerUser = async () => {
    try {
      dispatch({ type: UPDATE_FIELD, payload: state });
      const data = await register(
        state.email,
        state.password,
        state.password_confirmation
      );
      console.log(data, "data");
      if (!data.error) {
        toast({
          title: "Account Registered",
        });
        navigate("/");
      } else {
        toast({
          title: "Uh oh! Something went wrong!",
          description: data.message,
        });
      }
    } catch (error) {}
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Register
          </CardTitle>
          <CardDescription className="text-center">
            Create an account to start chatting with friends and family.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              registerUser();
            }}
          >
            <div className="space-y-4 mt-[-1rem]">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john@example.com"
                  required
                  value={state.email || ""}
                  onChange={(e) => {
                    dispatch({
                      type: UPDATE_FIELD,
                      payload: { ...state, email: e.target.value },
                    });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  required
                  value={state.password || ""}
                  onChange={(e) => {
                    dispatch({
                      type: UPDATE_FIELD,
                      payload: { ...state, password: e.target.value },
                    });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password2">Confirm Password</Label>
                <Input
                  type="password"
                  name="password2"
                  id="password2"
                  placeholder="password"
                  required
                  value={state.password_confirmation || ""}
                  onChange={(e) => {
                    dispatch({
                      type: UPDATE_FIELD,
                      payload: {
                        ...state,
                        password_confirmation: e.target.value,
                      },
                    });
                  }}
                />
              </div>

              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};
export default Register;
