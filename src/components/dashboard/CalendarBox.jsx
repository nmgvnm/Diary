import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import moment from "moment";

const CalendarBox = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };
  return (
    <div className="calendar-wrapper card">
      <div className="title">Calendar</div>
      <div className="calendar-box">
        <Calendar
          onChange={onChange}
          value={date}
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
        />
      </div>
    </div>
  );
};

export default CalendarBox;
