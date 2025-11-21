export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: "1.0.0",
    }),
  };
};
