import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { setAuthData, clearAuthData } from "./store/authSlice";
import { useDispatch } from "react-redux";
import appWriteService from "./services/AppWriteService";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const currentUser = await appWriteService.getCurrentUser();
      if (currentUser) {
        dispatch(setAuthData(currentUser));
      } else {
        dispatch(clearAuthData());
      }
    };
    checkUserLoggedIn();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
