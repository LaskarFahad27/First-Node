const handler = {};

handler.registerHandler = (requestProperties, callback) => {
    const req = requestProperties.req;
    const res = requestProperties.res;

    if (!req || !res) {
        return callback(500, { message: "Request or Response object is missing." });
    }

    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === "OPTIONS") {
        return callback(200, {});
    }

    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        try {
            const parsedData = JSON.parse(body);
            const { name, phone, password } = parsedData;

            if (!name || !phone || !password) {
                return callback(400, { error: "All fields are required" });
            }

            console.log("Received Data:", { name, phone, password });

            callback(200, {
                message: "User registered successfully",
                user: { name, phone }
            });
        } catch (error) {
            callback(500, { error: "Invalid JSON format" });
        }
    });
};

module.exports = handler;
