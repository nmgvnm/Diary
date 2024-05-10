import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
export const iconList = [
  { title: "Dashboard", icon: <DashboardOutlinedIcon />, path: "/" },
  { title: "Daily Memory", icon: <TodayOutlinedIcon />, path: "/daily" },
  { title: "Weekly Memory", icon: <DateRangeOutlinedIcon />, path: "/weekly" },
  { title: "Munsley Memory", icon: <CalendarMonthOutlinedIcon />, path: "/munsley" },
  { title: "Memo", icon: <StickyNote2OutlinedIcon />, path: "/memo" },
];
