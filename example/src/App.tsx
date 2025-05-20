import { useRef } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Clock, Stopwatch, Timer } from 'react-native-reanimated-chrono';

export default function App() {
  const timerRef = useRef<Timer>(null);
  const stopwatchRef = useRef<Stopwatch>(null);

  const renderSeparator = () => <View style={styles.separatorComponent} />;

  const durationMs =
    1 * 24 * 60 * 60 * 1000 + // 1 days
    1 * 60 * 60 * 1000 + // 1 hours
    30 * 60 * 1000; // 30 minutes

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timer</Text>
      <Text>1 days 1 hours 30 minutes</Text>
      <Timer
        ref={timerRef}
        autoStart={false}
        durationMs={durationMs}
        separator={renderSeparator}
        // separatorStyle={styles.separatorStyle} // Optional
        digitStyle={styles.digit}
        style={styles.componentContainer}
      />
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={() => timerRef.current?.start()} />
        <Button title="Pause" onPress={() => timerRef.current?.pause()} />
        <Button title="Resume" onPress={() => timerRef.current?.resume()} />
        <Button title="Reset" onPress={() => timerRef.current?.reset()} />
      </View>
      <View style={styles.divider} />
      <Text style={styles.label}>Clock</Text>
      <Clock
        format="12"
        separator={renderSeparator}
        digitStyle={styles.digit}
        style={styles.componentContainer}
      />
      <View style={styles.divider} />
      <Text style={styles.label}>Stopwatch</Text>
      <Stopwatch
        ref={stopwatchRef}
        // autoStart
        separator={renderSeparator}
        style={styles.componentContainer}
        digitStyle={styles.digit}
      />
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={() => stopwatchRef.current?.start()} />
        <Button title="Pause" onPress={() => stopwatchRef.current?.pause()} />
        <Button
          title="Reset"
          onPress={() => stopwatchRef.current?.reset(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4e4cc4',
  },
  divider: {
    height: 2,
    width: '80%',
    backgroundColor: 'red',
    opacity: 50,
    marginVertical: 20,
  },
  componentContainer: {
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4e4cc4',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digit: {
    fontSize: 28,
    color: '#4e4cc4',
    fontWeight: 'bold',
    width: 20,
  },
  separatorComponent: {
    backgroundColor: '#4e4cc4',
    aspectRatio: 1,
    width: 8,
    borderRadius: 100,
  },
  separator: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
});
