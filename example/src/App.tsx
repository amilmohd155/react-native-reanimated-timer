import { Clock, Stopwatch, Timer } from '@docren/react-native-reanimated-timer';
import { useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
} from 'react-native';

import './global.css';
import { ZoomIn, ZoomOut } from 'react-native-reanimated';

export default function App() {
  const timerRef = useRef<Timer>(null);
  const stopwatchRef = useRef<Stopwatch>(null);

  const durationMs =
    1 * 24 * 60 * 60 * 1000 + // 1 days
    1 * 60 * 60 * 1000 + // 1 hours
    30 * 60 * 1000; // 30 minutes

  return (
    <View
      className="flex-1 items-center justify-center gap-2"
      // style={styles.container}
    >
      <Text style={styles.title}>Timer</Text>
      <Text>1 days 1 hours 30 minutes</Text>
      <Timer
        mergeClassNames
        ref={timerRef}
        autoStart={false}
        durationMs={durationMs}
        entering={ZoomIn}
        exiting={ZoomOut}
        // digitStyle={styles.digit}
        // style={styles.componentContainer}
        className="bg-black rounded-full px-10 py-4 gap-4"
        digitContainerClassName="bg-white rounded-xl px-2"
        digitClassName="text-red-500 font-bold text-3xl leading-tight text-center tabular-nums min-w-5"
      >
        <Timer.Day className="bg-teal-500" />
        <Timer.Hour className="bg-orange-300" />
        <Timer.Minute className="bg-violet-300" />
        <Timer.Second className="bg-slate-600" />
        {/* <Timer.Millisecond /> */}
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
        // format="12"
        // digitStyle={styles.digit}
        // style={styles.componentContainer}
        className="bg-black rounded-full px-10 py-4 gap-2"
        digitContainerClassName="bg-white rounded-xl px-2 overflow-hidden"
        digitClassName="text-red-500 font-bold text-3xl leading-tight text-center tabular-nums min-w-5"
      >
        <Clock.Hour />
        <Clock.Minute />
        <Clock.Second />
        {/* <Clock.Millisecond /> */}
        <Clock.AMPM />
      </Clock>
      <View style={styles.divider} />
      <Text style={styles.title}>Stopwatch</Text>
      <Stopwatch
        ref={stopwatchRef}
        // style={styles.componentContainer}
        // digitStyle={styles.digit}
        className="bg-black rounded-full px-10 py-4 gap-4"
        digitContainerClassName="bg-white rounded-xl px-2 overflow-hidden"
        digitClassName="text-red-500 font-bold text-3xl leading-tight text-center tabular-nums min-w-5"
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
