    import { useState } from "react";
    import { /* Navigate, */ useNavigate } from "react-router-dom";
    import { Loader2, LockKeyhole } from "lucide-react";

    import { Button } from "@/components/ui/button";
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";

    import { loginAdmin } from "./api";
    import { useAuth } from "./useAuth";

    export default function LoginPage() {
        const navigate = useNavigate();
        const {
            login,
            //isAuthenticated,
        } = useAuth();

        const [username, setUsername] = useState("");

        const [password, setPassword] =  useState("");

        const [error, setError] =  useState<string | null>(null);

        const [isLoading, setIsLoading] = useState(false);

        // if (isAuthenticated) {
        //     return (
        //         <Navigate
        //         to="/admin"
        //         replace
        //         />
        //     );
        // }

        const handleSubmit = async (
            event: React.FormEvent<HTMLFormElement>
        ) => {
            event.preventDefault();

            setError(null);
            setIsLoading(true);

            try {
                const response = await loginAdmin({
                username,
                password,
                });

                login(
                response.token,
                response.admin
                );

                navigate("/admin", {
                replace: true,
                });
            } catch {
                setError(
                "Invalid username or password."
                );
            } finally {
                setIsLoading(false);
            }
        };

        return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <LockKeyhole className="size-6" />
                </div>

                <CardTitle className="text-2xl">
                RepairDesk Admin
                </CardTitle>

                <CardDescription>
                Sign in to manage repair requests
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                onSubmit={handleSubmit}
                className="space-y-5"
                >
                <div className="space-y-2">
                    <Label htmlFor="username">
                    Username
                    </Label>

                    <Input
                    id="username"
                    value={username}
                    onChange={(event) =>
                        setUsername(
                        event.target.value
                        )
                    }
                    placeholder="Enter username"
                    autoComplete="username"
                    disabled={isLoading}
                    required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">
                    Password
                    </Label>

                    <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(
                        event.target.value
                        )
                    }
                    placeholder="Enter password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    required
                    />
                </div>

                {error && (
                    <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={
                    isLoading ||
                    !username ||
                    !password
                    }
                >
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Signing in...
                    </>
                    ) : (
                    "Sign In"
                    )}
                </Button>
                </form>
            </CardContent>
            </Card>
        </div>
    );
}