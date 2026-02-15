import useAppStore from '../store/useAppStore';
import { User } from '../types/User';

export const useCurrentUser = (): {
  currentUser: User | null;
  setCurrentUser: (id: string | null) => void;
} => {
  const currentUserId = useAppStore((s) => s.currentUserId);
  const users = useAppStore((s) => s.users);
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);
  const currentUser = users.find((u) => u.id === currentUserId) ?? null;
  return { currentUser, setCurrentUser };
};

export default useCurrentUser;
