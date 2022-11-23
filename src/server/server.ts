import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as socketIo from "socket.io";
import { instrument } from "@socket.io/admin-ui"
import * as fs from "fs";
import * as crypto from "crypto";
import * as url from "url";
import * as dotenv from "dotenv"
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import * as os from "os";

//express server
const app = express();
const server: http.Server = http.createServer(app);

const basedir: string = path.join(__dirname, "../");
const viewsdir: string = path.join(basedir, "views");
const resourcesdir: string = path.join(basedir, "resources");
const scriptsdir: string = path.join(basedir, "scripts");
const imagedir: string = path.join(basedir, "images");
const dbdir: string = path.join(basedir, "db");
const port: number = Number(process.env.PORT) || 3001;

//web socket
const io = new socketIo.Server(server, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});

instrument(io, {
    auth: false
});

const user = io.of("/user");
const multiPlayer = io.of("/multiplayer");

user.on("connection", (socket) => {
    socket.on("login", (data: user) => {
        if (!data.id || !data.name) {
            const ns = uuidv4()
            const id = uuidv5(String(Date.now()), ns)
            data = {
                name: `Guest#${id.slice(0, 4)}`,
                id
            }
        }
        socket.emit("loggedIn", data)
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Node version:${process.version}`);
    console.log(`PID:${process.pid}`)
});

app.use(express.json());
app.use("/scripts", express.static(scriptsdir));
app.use("/resources/background", express.static(path.join(resourcesdir, "Backgrounds")));
app.use("/resources/behavior", express.static(path.join(resourcesdir, "Behaviors")));
app.use("/resources/music", express.static(path.join(resourcesdir, "MusicResources")));
app.use("/images", express.static(imagedir));

app.get("/favicon", (req, res) => {
    if (req.headers["content-type"] == "image/x-icon") res.sendFile(path.join(imagedir, "favicon.ico"));
    else res.sendFile(path.join(imagedir, "favicon.png"));
})

app.get("/", (req, res) => {
    res.sendFile(path.join(viewsdir, "index.html"));
});


app.get("/update/map", (req, res) => {
    const musicUrl = "/resources/music/"

    const music: { [key: string]: { url: string, size: number, hash: string } } = {}

    fs.readdirSync(path.join(resourcesdir, "MusicResources")).forEach(file => {
        if (file.endsWith(".fmmc")) {
            music[file.replace(".fmmc", "")] = {
                url: musicUrl + file,
                size: fs.statSync(path.join(resourcesdir, "MusicResources", file)).size,
                hash: crypto.createHash("sha256").update(fs.readFileSync(path.join(resourcesdir, "MusicResources", file))).digest("hex")
            }
        }
    });
    res.json(music)
})


app.get("/health", (req, res) => {
    res.status(200).end("Server online.");
    console.log({
        memory: {
            used: process.memoryUsage().heapUsed,
            all: os.totalmem(),
            free: os.freemem()
        },
        upTime: process.uptime(),
        usedCpu: process.cpuUsage()
    });

})

app.use((req, res, next) => {
    res.status(404).redirect("/");
});

process.on('unhandledRejection', (error, promise) => {
    console.log(' Promise rejection : ', promise);
    console.error(error);
});