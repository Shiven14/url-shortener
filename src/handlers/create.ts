import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, tableName, baseUrl } from "../lib/db.js";
import { genCode, isValidUrl } from "../lib/utils.js";

export async function handler(event: any) {
  try {
    const body = event?.body ? JSON.parse(event.body) : {};
    const longUrl = String(body.longUrl || "");
    if (!isValidUrl(longUrl)) {
      return json(400, { error: "Invalid URL" });
    }

    // generate a code and write item (idempotent-ish via conditional put)
    const code = genCode();
    const now = new Date().toISOString();

    await ddb.send(
      new PutCommand({
        TableName: tableName,
        Item: { code, longUrl, clicks: 0, createdAt: now },
        ConditionExpression: "attribute_not_exists(code)"
      })
    );

    return json(201, {
      code,
      shortUrl: `${baseUrl}/${code}`,
      longUrl
    });
  } catch (err: any) {
    // ConditionalCheckFailedException -> rare collision: try again once
    if (err?.name === "ConditionalCheckFailedException") {
      return await handler(event);
    }
    console.error(err);
    return json(500, { error: "Server error" });
  }
}

function json(status: number, body: unknown) {
  return {
    statusCode: status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  };
}
