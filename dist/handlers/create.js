import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, tableName, baseUrl } from "../lib/db.js";
import { genCode, isValidUrl } from "../lib/utils.js";
export async function handler(event) {
    try {
        const body = event?.body ? JSON.parse(event.body) : {};
        const longUrl = String(body.longUrl || "");
        if (!isValidUrl(longUrl)) {
            return json(400, { error: "Invalid URL" });
        }
        const code = genCode();
        const now = new Date().toISOString();
        await ddb.send(new PutCommand({
            TableName: tableName,
            Item: { code, longUrl, clicks: 0, createdAt: now },
            ConditionExpression: "attribute_not_exists(code)"
        }));
        return json(201, {
            code,
            shortUrl: `${baseUrl}/${code}`,
            longUrl
        });
    }
    catch (err) {
        if (err?.name === "ConditionalCheckFailedException") {
            return await handler(event);
        }
        console.error(err);
        return json(500, { error: "Server error" });
    }
}
function json(status, body) {
    return {
        statusCode: status,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
    };
}
