const handler = {};

handler.registerHandler = (requestProperties, callback) => {

    const req = requestProperties.req; 

    if (!req) {
        return callback(500, { message: "Request object is missing." });
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
