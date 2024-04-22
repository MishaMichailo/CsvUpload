import { Home } from "./components/Home";
import ReciveData from "./components/items/ReciveData";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/data-user',
    element: <ReciveData/>
  }
];

export default AppRoutes;
