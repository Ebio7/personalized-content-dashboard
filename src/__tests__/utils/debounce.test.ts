import { debounce } from '@/utils/debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('delays function execution', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('cancels previous calls if called again within delay', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn();
    jest.advanceTimersByTime(250);
    debouncedFn();
    jest.advanceTimersByTime(250);

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(250);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to debounced function', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn('arg1', 'arg2');
    jest.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('maintains correct context', () => {
    const obj = {
      value: 42,
      method: jest.fn(function(this: any) {
        return this.value;
      }),
    };

    const debouncedMethod = debounce(obj.method.bind(obj), 500);
    debouncedMethod();
    jest.advanceTimersByTime(500);

    expect(obj.method).toHaveBeenCalled();
  });
});
