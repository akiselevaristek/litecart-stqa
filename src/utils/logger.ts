export class Logger {
  private static readonly debugEnabled =
    process.env.DEBUG === '1';

  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  static info(message: string, ...optionalParams: unknown[]) {
    console.info(this.formatMessage('INFO', message), ...optionalParams);
  }

  static debug(message: string, ...optionalParams: unknown[]) {
    if (!Logger.debugEnabled) {
      return;
    }

    console.debug(this.formatMessage('DEBUG', message), ...optionalParams);
  }
}
