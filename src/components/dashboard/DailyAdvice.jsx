import React, { useEffect, useState } from "react";
import { kadvice } from "kadvice";

const DailyAdvice = () => {
  const [dailyAdvice, setDailyAdvice] = useState({});

  useEffect(() => {
    setDailyAdvice(kadvice.getOne());
  }, []);
  console.log("dailyAdvice:", dailyAdvice);

  return (
    <div className="daily-advice-wrapper card">
      <div className="container">
        <div className="title header">Daily Advice</div>
        <div className="advice">
          <div className="message">{dailyAdvice.message}</div>
          <div className="author">
            {`- ${dailyAdvice.author} ( ${dailyAdvice.authorProfile} ) -`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAdvice;
