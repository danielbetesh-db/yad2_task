import { readFileSync, writeFileSync } from "fs";
import { ApiResponse } from "./types";

export class JsonFileManager {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  read(): ApiResponse {
    const fileContent = readFileSync(this.filePath, "utf-8");
    return JSON.parse(fileContent);
  }

  write(content: ApiResponse): void {
    const data = JSON.stringify(content, null, 2);
    writeFileSync(this.filePath, data, "utf-8");
  }
}
