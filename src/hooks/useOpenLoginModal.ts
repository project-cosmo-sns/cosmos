import { openLoginModal } from '@/redux/loginModalSlice';
import { useDispatch } from 'react-redux';

export function useOpenLoginModal() {
  const dispatch = useDispatch();

  const showLoginModalHandler = () => {
    dispatch(openLoginModal());
  };

  return { showLoginModalHandler };
}
