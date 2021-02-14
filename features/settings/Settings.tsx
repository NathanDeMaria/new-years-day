import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, Text, View } from "react-native";
import { getApiUrl, saveApiUrl } from "./settingsSlice";

export default () => {
  const [apiUrl, setApiUrl] = useState<string>();

  useEffect(() => {
    (async () => {
      const url = await getApiUrl();
      setApiUrl(url);
    })();
  }, []);

  const onClick = () => {
    (async () => {
      await saveApiUrl(apiUrl);
    })();
  };

  return (
    <View style={styles.container}>
      <Text>API URL</Text>
      <TextInput
        onChangeText={setApiUrl}
        style={{ height: 40 }}
        value={apiUrl}
      />
      <Button onPress={onClick} title="Set" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
