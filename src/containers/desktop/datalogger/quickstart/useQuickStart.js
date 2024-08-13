import { useNavigate } from "react-router-dom";

export default function useQuickstart() {
  const navigate = useNavigate();
  const back = (from) => {
    navigate(from);
  };
  const save = (to) => {
    navigate(to);
  };

  return {
    back,
    save,
  };
}
