// Ummm...I thought this would end up being a slice...
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const { manifest } = Constants;
const DEFAULT_API_ROOT = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:8000`;

const API_URL_KEY = "@api_url";

export const saveApiUrl = async (value: string) => {
  try {
    await AsyncStorage.setItem(API_URL_KEY, value);
  } catch (e) {
    console.warn("Failed to save API URL");
  }
};

export const getApiUrl = async () => {
  try {
    const value = await AsyncStorage.getItem(API_URL_KEY);
    // So that you can empty-string it to revert to the default
    if (!value) {
      return DEFAULT_API_ROOT;
    }
    return value;
  } catch (e) {
    console.warn("Could not find API URL in config, falling back to local");
    return DEFAULT_API_ROOT;
  }
};
