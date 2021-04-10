import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Header = ({ dateSelected }) => {
  const [selected, setSelected] = useState(new Date());
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0);
    setSelected(startOfDay);
  }, []);

  useEffect(() => {
    generateDates();
    dateSelected(selected);
  }, [selected]);

  const generateDates = () => {
    const startDate = new Date(new Date(selected).setDate(selected.getDate() - 3));
    let newDates = [startDate];

    for (let i = 1; i < 7; i++) {
      newDates.push(new Date(new Date(startDate).setDate(startDate.getDate() + i)));
    }

    setDates(newDates);
  };

  const calculateDates = (diff) => {
    setSelected(new Date(new Date(selected).setDate(selected.getDate() + diff)));
  };

  const selectDate = (date) => {
    setSelected(date);
  };

  const getDayName = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const backToToday = () => {
    const today = new Date();
    selectDate(today);
  }

  const isToday = (date) => {
    const today = new Date();
    return (
      `${date.getFullYear()}${date.getMonth()}${date.getDate()}}` ===
      `${today.getFullYear()}${today.getMonth()}${today.getDate()}}`
    );
  };

  const selectedIsToday = isToday(selected);

  return (
    <DateHeaderContainer today={selectedIsToday}>
      <DateSelectContainer data-testid="date-header">
        <DateItem className="nav" onClick={() => calculateDates(-7)}>
          &lt;
        </DateItem>
        {dates.map((date, index) => {
          let className = isToday(date) ? "today" : "";
          className = `${className}${index === 3 ? " active" : ""}`;

          return (
            <DateItem key={date} className={className} onClick={() => selectDate(date)}>
              <span className="day">{getDayName(date)}</span>
              <span className="date">{date.getDate()}</span>
            </DateItem>
          );
        })}
        <DateItem className="nav" onClick={() => calculateDates(7)}>
          &gt;
        </DateItem>
      </DateSelectContainer>
      {!selectedIsToday && (
        <DateOptions>
          <button onClick={backToToday}>Go to today</button>
        </DateOptions>
      )}
    </DateHeaderContainer>
  );
};

const DateHeaderContainer = styled.div`
  position: fixed;
  height: ${(p) => (p.today ? "64px" : "84px")};
  width: 100%;
  display: flex;
  flex-direction: column;

`;

const DateSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 2 0 2 0;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 2px 9px 0px rgba(110,110,110,0.75);
  -webkit-box-shadow: 0px 2px 9px 0px rgba(110,110,110,0.75);
  -moz-box-shadow: 0px 2px 9px 0px rgba(110,110,110,0.75);
`;

const DateOptions = styled.div`
  margin-top: 3px;
  text-align: center;
`;

const DateItem = styled.div`
  flex: 1 1 0;
  padding: 10 3 10 3;
  text-align: center;

  > .date {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  > .day {
    font-size: 13px;
    color: #333;
    display: block;
  }

  &.active {
    min-width: 50px;
    background-color: #49218a;
    border: 1px solid transparent;
    border-radius: 45px;

    > .date {
      font-size: 18px;
      color: #fff;
    }
    > .day {
      font-size: 15px;
      color: #fff;
    }
  }

  &.today {
    border: 1px solid #49218a;
    border-radius: 45px;
  }

  &.nav {
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
