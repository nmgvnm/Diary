import React from 'react';
import FamousSaying from '../components/dashboard/DailyAdvice';
import MemoBox from '../components/dashboard/MemoBox';
import DailyCard from '../components/dashboard/DailyCard';
import TodoList from '../components/dashboard/TodoList';
import Calendar from '../components/dashboard/CalendarBox';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <FamousSaying />
      <MemoBox />
      <TodoList />
      <Calendar />
      <DailyCard />
    </div>
  );
};

export default Dashboard;