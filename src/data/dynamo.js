import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1"
});

export const dynamo = DynamoDBDocumentClient.from(client);
export const TABLE = "Tasks";

export class TaskDynamo {

  async list() {
    const result = await db.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );

    return result.Items || [];
  }

  async select(id) {
    const result = await db.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    return result.Item || null;
  }

  async create(task) {
    const now = new Date().toISOString();
    const newTask = {
      id: randomUUID(),
      title: task.title,
      description: task.description ?? "",
      completed: task.completed ?? false,
      createdAt: now,
      updatedAt: now,
    };

    await db.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: newTask,
      })
    );

    return newTask;
  }

  async update(id, partial) {
    const existing = await this.select(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...partial,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    await db.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: updated,
      })
    );

    return updated;
  }

  async delete(id) {
    const existing = await this.select(id);
    if (!existing) return null;

    await db.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    return existing;
  }
}
