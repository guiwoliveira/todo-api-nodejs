import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo, TABLE } from "../data/dynamo.js";

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    await dynamo.send(
      new DeleteCommand({
        TableName: TABLE,
        Key: { id }
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Tarefa deletada com sucesso",
        id
      })
    };
  } catch (err) {
    console.error("Erro ao deletar tarefa:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Erro interno ao deletar tarefa"
      })
    };
  }
};