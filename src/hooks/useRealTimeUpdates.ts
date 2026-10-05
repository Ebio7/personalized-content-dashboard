import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchContent } from '@/store/thunks/contentThunks';

export const useRealTimeUpdates = (interval: number = 30000) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.preferences);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set up polling interval
    intervalRef.current = setInterval(() => {
      dispatch(fetchContent({ categories, page: 1 }));
    }, interval);

    // Clear interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch, categories, interval]);

  // Function to manually trigger update
  const refresh = () => {
    dispatch(fetchContent({ categories, page: 1 }));
  };

  return { refresh };
};
