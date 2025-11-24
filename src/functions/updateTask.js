import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo, TABLE } from "../data/dynamo.js";

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const body = JSON.parse(event.body);

    const { title, description, completed } = body;

    const result = await dynamo.send(
      new UpdateCommand({
        TableName: TABLE,
        Key: { id },
        UpdateExpression:
          "set title = :title, description = :description, completed = :completed, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":title": title,
          ":description": description,
          ":completed": completed,
          ":updatedAt": new Date().toISOString()
        },
        ReturnValues: "ALL_NEW"
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: result.Attributes,
        message: "Tarefa atualizada com sucesso"
      })
    };
  } catch (err) {
    console.error("Erro ao atualizar tarefa:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Erro interno ao atualizar tarefa"
      })
    };
  }
};