import axios from "axios";
import { getApiUrl } from "./features/settings/settingsSlice";

import { Task } from "./features/tasks/taskSlice";
import { Work } from "./features/work/workSlice";

export class Api {
  private apiRoot: string;

  constructor(apiRoot: string) {
    this.apiRoot = apiRoot;
  }

  static async build() {
    const apiRoot = await getApiUrl();
    return new Api(apiRoot);
  }

  public async addTask(name: string, weight: number): Promise<Task> {
    return await this.post<Task>("task", { name, weight });
  }

  public async getTasks(): Promise<Task[]> {
    return await this.get<Task[]>("task/all");
  }

  public async getProgress(): Promise<number> {
    return await this.get<number>("progress");
  }

  public async addWork(taskId: string, durationMinutes: number): Promise<Work> {
    return await this.post<Work>("work", { taskId, durationMinutes });
  }

  private async get<T>(path: string): Promise<T> {
    try {
      const response = await axios.get(`${this.apiRoot}/${path}`);
      return response.data;
    } catch (error) {
      throw new Error(`GET: ${path} failed because: ${error}`);
    }
  }

  private async post<T>(path: string, body: any): Promise<T> {
    try {
      const response = await axios.post(`${this.apiRoot}/${path}`, body);
      return response.data;
    } catch (error) {
      throw new Error(`POST: ${path} failed because: ${error}`);
    }
  }
}
