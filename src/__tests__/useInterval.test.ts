import { renderHook } from '@testing-library/react-native';
import { useInterval } from '../hooks/useInteval';

jest.useFakeTimers();

describe('useInterval', () => {
  it('calls callback at interval', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('does not call callback if delay is null', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, null));

    jest.advanceTimersByTime(2000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('clears interval on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1000));

    jest.advanceTimersByTime(1000);
    unmount();
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
