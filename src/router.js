import MemoContents from "./components/MemoContents";
import Daily from "./pages/Daily";
import Dashboard from "./pages/Dashboard";
import Memo from "./pages/Memo";
import Munsley from "./pages/Munsley";
import Weekly from "./pages/Weekly";

export const routerlist = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/daily", element: <Daily /> },
  { path: "/weekly", element: <Weekly /> },
  { path: "/munsley", element: <Munsley /> },
  { path: "/memo", element: <Memo /> },
  { path: "/test", element: <MemoContents /> },
];
