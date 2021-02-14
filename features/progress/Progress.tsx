import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchProgress, selectProgressMinutes } from "./progressSlice";

const DAILY_GOAL = 30;

const getDayOfYear = () => {
  // End of the current day, so Jan 1 would return 1
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff =
    now.valueOf() -
    start.valueOf() +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  const progressMinutes = useSelector(selectProgressMinutes);
  const goalProgressPercent = (100 * progressMinutes) / (365 * DAILY_GOAL);
  const expectedProcess = DAILY_GOAL * getDayOfYear();
  const daysVsPace = (progressMinutes - expectedProcess) / DAILY_GOAL;
  const behindOrAhead = daysVsPace >= 0 ? "ahead of" : "behind";

  return (
    <View style={styles.container}>
      <Text>{progressMinutes.toFixed(1)} minutes completed</Text>
      <Text>{goalProgressPercent.toFixed(1)}% to goal</Text>
      <Text>
        {Math.abs(daysVsPace).toFixed(1)} days {behindOrAhead} pace
      </Text>
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
