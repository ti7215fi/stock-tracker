import { Logger } from "./logger.service";

export class LoggerStub extends Logger {

    protected override get isEnabled(): boolean {
        return false;
    }
}
export const loggerStub = new LoggerStub();