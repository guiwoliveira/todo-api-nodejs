import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo, TABLE } from "../data/dynamo.js";
import crypto from "crypto";

export const handler = async (event) => {
  const body = JSON.parse(event.body);

  const task = {
    id: crypto.randomUUID(),
    title: body.title,
    description: body.description,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await dynamo.send(new PutCommand({
    TableName: TABLE,
    Item: task
  }));

  return {
    statusCode: 201,
    body: JSON.stringify({
      success: true,
      data: task,
      message: "Tarefa criada com sucesso"
    })
  };
};