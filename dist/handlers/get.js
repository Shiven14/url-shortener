import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, tableName } from "../lib/db.js";
export async function handler(event) {
    const code = event?.pathParameters?.code;
    if (!code)
        return { statusCode: 400, body: "Missing code" };
    const res = await ddb.send(new GetCommand({ TableName: tableName, Key: { code } }));
    const longUrl = res.Item?.longUrl;
    if (!longUrl)
        return { statusCode: 404, body: "Not found" };
    ddb.send(new UpdateCommand({
        TableName: tableName,
        Key: { code },
        UpdateExpression: "SET clicks = if_not_exists(clicks, :z) + :one",
        ExpressionAttributeValues: { ":z": 0, ":one": 1 }
    })).catch(() => { });
    return {
        statusCode: 301,
        headers: { Location: longUrl }
    };
}
