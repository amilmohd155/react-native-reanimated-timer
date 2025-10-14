import { Clock, Stopwatch, Timer } from '@doclab/react-native-reanimated-timer';
import { useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
} from 'react-native';

export default function App() {
  const timerRef = useRef<Timer>(null);
  const stopwatchRef = useRef<Stopwatch>(null);

  const durationMs =
    1 * 24 * 60 * 60 * 1000 + // 1 days
    1 * 60 * 60 * 1000 + // 1 hours
    30 * 60 * 1000; // 30 minutes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>
      <Text>1 days 1 hours 30 minutes</Text>
      <Timer
        ref={timerRef}
        autoStart={true}
        durationMs={durationMs}
        digitStyle={styles.digit}
        style={styles.componentContainer}
      >
        <Timer.Day />
        <Timer.Hour />
        <Timer.Minute />
        <Timer.Second />
        <Timer.Millisecond />
      </Timer>
      <View style={styles.buttonContainer}>
        <Button onPress={() => timerRef.current?.start()}>Start</Button>
        <Button onPress={() => timerRef.current?.pause()}>Pause</Button>
        <Button onPress={() => timerRef.current?.resume()}>Resume</Button>
        <Button onPress={() => timerRef.current?.reset()}>Reset</Button>
      </View>
      <View style={styles.divider} />
      <Text style={styles.title}>Clock</Text>
      <Clock
        format="12"
        digitStyle={styles.digit}
        style={styles.componentContainer}
      >
        <Clock.Hour />
        <Clock.Minute />
        <Clock.Second />
        <Clock.Millisecond />
        <Clock.AMPM />
      </Clock>
      <View style={styles.divider} />
      <Text style={styles.title}>Stopwatch</Text>
      <Stopwatch
        ref={stopwatchRef}
        style={styles.componentContainer}
        digitStyle={styles.digit}
      >
        <Stopwatch.Hour />
        <Stopwatch.Minute />
        <Stopwatch.Second />
        <Stopwatch.Millisecond />
      </Stopwatch>
      <View style={styles.buttonContainer}>
        <Button onPress={() => stopwatchRef.current?.start()}>Start</Button>
        <Button onPress={() => stopwatchRef.current?.pause()}>Pause</Button>
        <Button onPress={() => stopwatchRef.current?.reset(false)}>
          Reset
        </Button>
      </View>
    </View>
  );
}

const Button = ({
  children,
  ...props
}: Omit<PressableProps, 'children'> & { children: string }) => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  label: {
    color: '#ffffff',
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
    borderColor: '#c5c5c5',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digit: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    width: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
});
