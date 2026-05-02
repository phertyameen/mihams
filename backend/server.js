import { createServer } from "http";
import { json } from "stream/consumers";

const server = createServer(async (req, res) => {
  if (req.method === "POST") {
    const body = await json(req);

    const sum = body.a + body.b;

    res.end(String(sum))
    console.log(req.body);
  }
});

server.listen(5000, () => {
  console.log("server active...");
});
