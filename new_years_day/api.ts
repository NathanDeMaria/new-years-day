import axios from "axios";
import Constants from "expo-constants";

import { Task } from "./features/tasks/taskSlice";

const { manifest } = Constants;
const API_ROOT = `http://${manifest.debuggerHost.split(":").shift()}:8000`;

export class Api {
  public async addTask(name: string, weight: number): Promise<Task> {
    //return new Promise((resolve) => ({ taskId: "one", name, weight }));
    return await this.post<Task>("task", { name, weight });
  }

  private async post<T>(path: string, body: any): Promise<T> {
    try {
      const response = await axios.post(`${API_ROOT}/${path}`, body);
      return response.data;
    } catch (error) {
      throw new Error(`GET: ${path} failed because: ${error}`);
    }
  }
}
