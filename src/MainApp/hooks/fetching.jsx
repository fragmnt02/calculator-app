import { useLogout } from "./logout";

export const useHandleErrorResponse = () => {
  const { logout } = useLogout();

  const handleErrorResponse = (error) => {
    if (error.response.status === 401) {
      logout();
    }

    throw error;
  };

  return { handleErrorResponse };
};
