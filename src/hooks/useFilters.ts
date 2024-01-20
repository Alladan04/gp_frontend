import { useDispatch, useSelector } from 'react-redux';
import { updateFilters, updateTitle } from '../slices/filterSlice';

export function useFilters() {
  const filters = useSelector((state:any )=> state.filters);
  const dispatch = useDispatch();

  const setFilters = (newFilters: any) => {
    // Обновляет фильтры в Redux
    dispatch(updateFilters(newFilters));
  };

  const setTitle = (newTitle: string) => {
    dispatch(updateTitle(newTitle)); // Используйте экшн setTitle из filtersSlice
  };

  // Напишите дополнительные функции здесь, если нужно специфичное обращение к фильтрам

  return { filters, setFilters, setTitle};
}