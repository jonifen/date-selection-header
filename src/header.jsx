import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Header = ({ dateSelected }) => {
  const [selected, setSelected] = useState(new Date());
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0
    );
    setSelected(startOfDay);
  }, []);

  useEffect(() => {
    generateDates();
    dateSelected(selected);
  }, [selected]);

  const generateDates = () => {
    const startDate = new Date(new Date(selected).setDate(selected.getDate() - 3));
    let generatedDates = [[], []];
    const endOfStartMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    let monthIndex = 0;

    for (let i = 0; i < 7; i++) {
      const iteratedDate = new Date(new Date(startDate).setDate(startDate.getDate() + i));
      generatedDates[monthIndex].push(iteratedDate);
      if (isMatchingDates(endOfStartMonth, iteratedDate)) monthIndex = monthIndex + 1;
    }

    setDates(generatedDates);
  };

  const selectDateWithDifference = (diff) => {
    setSelected(new Date(new Date(selected).setDate(selected.getDate() + diff)));
  };

  const selectDate = (date) => {
    setSelected(date);
  };

  const getDayName = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const getMonthName = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[date.getMonth()];
  };

  const backToToday = () => {
    const today = new Date();
    selectDate(today);
  };

  const isMatchingDates = (dateOne, dateTwo) => {
    return (
      `${dateOne.getFullYear()}${dateOne.getMonth()}${dateOne.getDate()}` ===
      `${dateTwo.getFullYear()}${dateTwo.getMonth()}${dateTwo.getDate()}`
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return isMatchingDates(date, today);
  };

  const selectedIsToday = isToday(selected);

  return (
    <DateHeaderContainer today={selectedIsToday}>
      <DateSelectContainer data-testid="date-header">
        <DateItem className="nav" onClick={() => selectDateWithDifference(-7)}>
          &lt;
        </DateItem>
        {dates.map((monthDates, monthIndex) => {
          if (monthDates.length > 0)
            return (
              <MonthContainer
                key={`m${monthIndex}`}
                month={getMonthName(monthDates[0])}
                index={monthIndex}
                count={dates[1].length > 0 ? 2 : 1}
              >
                {monthDates.map((date, dateIndex) => {
                  let className = isToday(date) ? "today" : "";
                  className = `${className}${isMatchingDates(date, selected) ? " active" : ""}`;

                  return (
                    <DateItem
                      key={`d${date}`}
                      className={className}
                      onClick={() => selectDate(date)}
                    >
                      <span className="day">{getDayName(date)}</span>
                      <span className="date">{date.getDate()}</span>
                    </DateItem>
                  );
                })}
              </MonthContainer>
            );
        })}
        <DateItem className="nav" onClick={() => selectDateWithDifference(7)}>
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
  box-shadow: 0px 2px 9px 0px rgba(110, 110, 110, 0.75);
  -webkit-box-shadow: 0px 2px 9px 0px rgba(110, 110, 110, 0.75);
  -moz-box-shadow: 0px 2px 9px 0px rgba(110, 110, 110, 0.75);
`;

const DateOptions = styled.div`
  margin-top: 3px;
  text-align: center;
`;

const monthContainerMixin = (p) => {
  const props =
    p.index === 0 && p.count === 2
      ? { psuedo: "after", position: "right" }
      : { psuedo: "before", position: "left" };
  const border = p.count === 2 ? `border-${props.position}: 1px solid #333;` : "";

  return `${border}
    &:${props.psuedo} {
      content: "${p.month}";
      position: absolute;
      font-size: 12px;
      ${props.position}: 0;
      top: -1;
      padding-${props.position}: 5px;
    }`;
};

const MonthContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
  padding-top: 5px;
  ${monthContainerMixin}
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
    max-width: 30px;
  }
`;
