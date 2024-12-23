import { handleError } from "./error_handler";
import { ServerActionLogger } from "./logger";
import rate_limit from "./rate_limit";

export async function serverActionHandler<T>(
  serverActionName: string,
  serverAction: (serverActionLogger: ServerActionLogger) => Promise<T>
) {
  const serverActionLogger = new ServerActionLogger(serverActionName);
  try {
    await rate_limit();
    const data = await serverAction(serverActionLogger);
    return {
      status: "success" as const,
      data: data,
    };
  } catch (error) {
    return handleError(error, serverActionLogger);
  }
}
