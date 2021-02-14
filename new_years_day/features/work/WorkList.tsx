import React, { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WorkPanel from "./WorkPanel";

import {
  fetchWorkPage,
  numWorksSelector,
  worksEndedSelector,
  worksSelector,
} from "./workSlice";

export default () => {
  const dispatch = useDispatch();
  const nWorks = useSelector(numWorksSelector);
  const works = useSelector(worksSelector);
  const ended = useSelector(worksEndedSelector);
  useEffect(() => {
    dispatch(fetchWorkPage(0));
  }, [dispatch]);

  const onEndReached = useCallback(() => {
    if (ended) return;
    dispatch(fetchWorkPage(nWorks));
  }, [nWorks, ended]);

  return (
    <View style={styles.container}>
      <FlatList
        data={works}
        renderItem={WorkPanel}
        keyExtractor={(work) => work.workId}
        onEndReached={onEndReached}
      />
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
