it.todo('Write tests for useTime hook');

// import { renderHook, act } from '@testing-library/react-native';
// import { useTime } from '../hooks/useTime';
// import * as timeUtils from '../utils/time';

// // Mock the time utilities
// jest.mock('../utils/time', () => ({
//   getMsFromCurrentTime: jest.fn(),
//   getFormattedTime: jest.fn(),
// }));

// describe('useTime', () => {
//   // Setup for each test
//   beforeEach(() => {
//     jest.useFakeTimers();
//     // Reset all mocks before each test
//     jest.clearAllMocks();
//   });

//   afterEach(() => {
//     jest.useRealTimers();
//   });

//   it('should initialize with current time', () => {
//     // Mock the initial time value
//     const initialMs = 12345678;
//     (timeUtils.getMsFromCurrentTime as jest.Mock).mockReturnValue(initialMs);

//     // Mock the formatted time
//     const mockFormattedTime = {
//       hours: 10,
//       minutes: 30,
//       seconds: 45,
//       milliseconds: 678,
//       ampm: '',
//     };
//     (timeUtils.getFormattedTime as jest.Mock).mockReturnValue(
//       mockFormattedTime
//     );

//     // Render the hook
//     const { result } = renderHook(() => useTime({ format: '24' }));

//     // Check if getMsFromCurrentTime was called
//     expect(timeUtils.getMsFromCurrentTime).toHaveBeenCalledTimes(1);

//     // Verify the returned value matches our mock
//     expect(result.current.getSnapshot()).toEqual(mockFormattedTime);
//   });

//   it('should update time at specified interval', () => {
//     // Setup initial and updated time values
//     const initialMs = 12345678;
//     const updatedMs = 12346678; // 1 second later

//     // Setup mock implementations to return different values on successive calls
//     (timeUtils.getMsFromCurrentTime as jest.Mock)
//       .mockReturnValueOnce(initialMs)
//       .mockReturnValueOnce(updatedMs);

//     // Setup mock formatted time values
//     const initialFormattedTime = {
//       hours: 10,
//       minutes: 30,
//       seconds: 45,
//       milliseconds: 678,
//       ampm: '',
//     };

//     const updatedFormattedTime = {
//       hours: 10,
//       minutes: 30,
//       seconds: 46,
//       milliseconds: 678,
//       ampm: '',
//     };

//     (timeUtils.getFormattedTime as jest.Mock)
//       .mockReturnValueOnce(initialFormattedTime)
//       .mockReturnValueOnce(updatedFormattedTime);

//     // Render the hook with a 1000ms interval
//     const { result } = renderHook(() =>
//       useTime({ format: '24', interval: 1000 })
//     );

//     // Initial state check
//     expect(result.current.getSnapshot()).toEqual(initialFormattedTime);

//     // Advance timers by interval
//     act(() => {
//       jest.advanceTimersByTime(1000);
//     });

//     // After interval, time should update
//     expect(timeUtils.getMsFromCurrentTime).toHaveBeenCalledTimes(3); // 1 initial + 2 updates

//     expect(result.current).toEqual(updatedFormattedTime);
//   });

//   it('should format time in 12-hour format when specified', () => {
//     const ms = 12345678;
//     (timeUtils.getMsFromCurrentTime as jest.Mock).mockReturnValue(ms);

//     // Mock the formatted time for 12-hour format
//     const mockFormattedTime = {
//       hours: 10,
//       minutes: 30,
//       seconds: 45,
//       milliseconds: 678,
//       ampm: 'AM',
//     };
//     (timeUtils.getFormattedTime as jest.Mock).mockReturnValue(
//       mockFormattedTime
//     );

//     // Render the hook with 12-hour format
//     const { result } = renderHook(() => useTime({ format: '12' }));

//     // Check if getFormattedTime was called with correct format parameter
//     expect(timeUtils.getFormattedTime).toHaveBeenCalledWith(ms, '12');

//     // Verify the returned value includes AM/PM
//     expect(result.current.getSnapshot().ampm).toBe('AM');
//   });

//   it('should use default values when props are not provided', () => {
//     const ms = 12345678;
//     (timeUtils.getMsFromCurrentTime as jest.Mock).mockReturnValue(ms);

//     // Mock the formatted time for default values
//     const mockFormattedTime = {
//       hours: 10,
//       minutes: 30,
//       seconds: 45,
//       milliseconds: 678,
//       ampm: '',
//     };
//     (timeUtils.getFormattedTime as jest.Mock).mockReturnValue(
//       mockFormattedTime
//     );

//     // Render the hook with no props
//     renderHook(() => useTime({}));

//     // Check if getFormattedTime was called with default format '24'
//     expect(timeUtils.getFormattedTime).toHaveBeenCalledWith(ms, '24');

//     // Fast forward to check default interval of 1000ms
//     act(() => {
//       jest.advanceTimersByTime(1000);
//     });

//     // Should call getMsFromCurrentTime again after default interval
//     expect(timeUtils.getMsFromCurrentTime).toHaveBeenCalledTimes(2);
//   });

//   it('should use custom interval when provided', () => {
//     const ms = 12345678;
//     (timeUtils.getMsFromCurrentTime as jest.Mock).mockReturnValue(ms);

//     // Mock the formatted time for custom interval
//     const mockFormattedTime = {
//       hours: 10,
//       minutes: 30,
//       seconds: 45,
//       milliseconds: 678,
//       ampm: '',
//     };
//     (timeUtils.getFormattedTime as jest.Mock).mockReturnValue(
//       mockFormattedTime
//     );

//     // Render the hook with custom interval of 2000ms
//     renderHook(() => useTime({ interval: 2000 }));

//     // Fast forward by 1000ms
//     act(() => {
//       jest.advanceTimersByTime(1000);
//     });

//     // Should not update yet
//     expect(timeUtils.getMsFromCurrentTime).toHaveBeenCalledTimes(1);

//     // Fast forward another 1000ms
//     act(() => {
//       jest.advanceTimersByTime(1000);
//     });

//     // Should update after 2000ms total
//     expect(timeUtils.getMsFromCurrentTime).toHaveBeenCalledTimes(2);
//   });
// });
