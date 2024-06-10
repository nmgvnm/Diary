import MemoNew from "./components/memo/MemoNew";
import PostForm from "./components/weekly/PostForm";
import Daily from "./pages/Daily";
import Dashboard from "./pages/Dashboard";
import Memo from "./pages/Memo";
import Munsley from "./pages/Munsley";
import Weekly from "./pages/Weekly";
export const routerlist = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  { path: "/daily", element: <Daily /> },
  { path: "/weekly", element: <Weekly /> },
  { path: "/munsley", element: <Munsley /> },
  { path: "/memo", element: <Memo /> },
  { path: "/memo/new", element: <MemoNew /> },
  { path: "/post/new", element: <PostForm /> },

];
