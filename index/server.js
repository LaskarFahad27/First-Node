
const http = require("http");
const fs = require("fs");
const port = 3000;

const saveFile = (filename, data) => {
    if (fs.existsSync(filename)) {
        fs.appendFile(filename, data + "\n", function (err) {
            if (err) return false;
            console.log('Saved!');
        });
        return true;
    } else {
        fs.writeFile(filename, data + "\n", function (err) {
            if (err) throw err;
        });
        return true;
    }
};

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // Registration Route
    if (req.url === "/register" && req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            res.writeHead(200, { "Content-Type": "application/json" });
            let data = JSON.parse(body);
            console.log(saveFile("index/Database/" + data.phone + ".txt", JSON.stringify(data)));
            res.end(body);
        });
    }

    // Login Route
    else if (req.url === "/login" && req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            let data = JSON.parse(body);
            const filepath = `index/Database/${data.phone}.txt`;

            if (fs.existsSync(filepath)) {
                fs.readFile(filepath, "utf8", (err, fileData) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Server error" }));
                    } else {
                        try {
                            const user = JSON.parse(fileData);
                            if (user.password === data.password) {
                                res.writeHead(200, { "Content-Type": "application/json" });
                                res.end(JSON.stringify({ message: "Login successful", user }));
                            } else {
                                res.writeHead(401, { "Content-Type": "application/json" });
                                res.end(JSON.stringify({ error: "Incorrect password" }));
                            }
                        } catch (parseError) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "Data parsing error" }));
                        }
                    }
                });
            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "User not found" }));
            }
        });
    }

    // Default route
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not Found" }));
    }

});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

