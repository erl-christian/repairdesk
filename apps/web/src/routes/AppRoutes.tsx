import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"


function Placeholder({ title }: { title: string}){
    return(
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{title}</h1>
        </div>
    )
}


function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                    <Route path="/" element={<Placeholder title="Home Page" />} />
                    <Route
                    path="/repair-request"
                    element={<Placeholder title="Repair Request Page" />}
                    />
                    <Route
                    path="/track"
                    element={<Placeholder title="Track Repair Page" />}
                    />

                    {/* Admin Routes */}
                    <Route path="/login" element={<Placeholder title="Login Page" />} />
                    <Route
                    path="/admin"
                    element={<Placeholder title="Admin Dashboard" />}
                    />
                    <Route
                    path="/admin/repair-requests"
                    element={<Placeholder title="Repair Requests" />}
                    />

                    {/* 404 */}
                    <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;