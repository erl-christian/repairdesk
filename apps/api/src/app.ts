import express from "express"
import cors from "cors"
import repairRequestRoutes from "./routes/repair-request.route"
import dashboardroutes from "./routes/dashboard.routes"
import repairTimelineRoutes from "./routes/repair-timeline.routes"
import authRoutes from "./auth/auth.routes"
import repairNoteRoutes from "./routes/repair-notes.routes";



const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello RepairDesk" 
    })
})

app.use("/api/v1/repair-requests", repairRequestRoutes)
app.use("/api/v1/repair-requests", repairTimelineRoutes)
app.use("/api/v1/dashboard", dashboardroutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1", repairNoteRoutes);

app.listen(3000)




export default app