import { useAppContext } from "../../global/hooks/AppContext";
import { useLogoutRequest } from "../../global/hooks/request";
import { useEffect } from "react";

export const useLogout = () => {
  const { updateIsLoggedIn } = useAppContext();
  const { logout, logoutResponseStatus } = useLogoutRequest();

  useEffect(() => {
    if (logoutResponseStatus === 200) {
      updateIsLoggedIn(false);
    }
  }, [logoutResponseStatus, updateIsLoggedIn]);

  return { logout };
};
