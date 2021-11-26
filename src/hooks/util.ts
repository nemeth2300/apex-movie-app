import { useLocation } from "react-router-dom";

export const useURLQuery = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params;
};
