import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { once } from "node:events";

const createServer = async (corsUri) => {
  process.env.CORS_URI = corsUri;
  process.env.JWT_SECRET = "test-secret";
  const { default: app } = await import("../app.js");
  const server = http.createServer(app);
  server.listen(0);
  await once(server, "listening");
  const address = server.address();
  return { server, address };
};

test("allows configured origins from a comma-separated CORS list", async () => {
  const { server, address } = await createServer(
    "https://frontend.example.com, http://localhost:5173",
  );

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/`, {
      method: "OPTIONS",
      headers: {
        Origin: "http://localhost:5173",
        "Access-Control-Request-Method": "GET",
      },
    });

    assert.equal(response.status, 204);
    assert.equal(
      response.headers.get("access-control-allow-origin"),
      "http://localhost:5173",
    );
    assert.equal(
      response.headers.get("access-control-allow-credentials"),
      "true",
    );
  } finally {
    server.close();
  }
});
