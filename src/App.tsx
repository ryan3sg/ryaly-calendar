import { useRef, useState, type MouseEventHandler } from "react";
import "./App.css";
import { getCalendarDays } from "./utils/getCalendarDays";
import html2canvas from "html2canvas";
import Days from "./Days";

function App() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [isBlocked, setIsBlocked] = useState(false);
  const [month, setMonth] = useState(today.getMonth());
  const days = getCalendarDays(year, month);
  const calendar = useRef<HTMLDivElement>(null);
  const [saving, setIsSaving] = useState(false);

  const getWeeks = () => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  };

  const gotToNextMonth: MouseEventHandler<HTMLButtonElement> = (e) => {
    const isNext = e.currentTarget.innerHTML === "next";
    setMonth((prev) => {
      if (isNext) {
        const res = prev + 1;
        return res <= 11 ? res : 0;
      }
      const res = prev - 1;
      return res >= 0 ? res : 11;
    });
    setYear((prev) => {
      if (isNext) {
        const res = month + 1;
        return res <= 11 ? prev : prev + 1;
      }
      const res = month - 1;
      return res >= 0 ? prev : prev - 1;
    });
    setIsBlocked(false);
  };

  const saveCalendar = () => {
    setIsSaving(true);
    html2canvas(calendar?.current!).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "capture.png";
      link.click();
      setIsSaving(false);
    });
  };
  return (
    <>
      <div id="calendar" ref={calendar}>
        <div className="calendar-title">
          <img className="calendar-logo" src="img/logo.png" />
          <h2 className="calendar-month">
            <span>
              {new Date(year, month).toLocaleString("default", {
                month: "short",
              })}
            </span>{" "}
            <span>{year}</span>
          </h2>
        </div>
        <div className="calendar-weak">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => {
            return day === "Sun" || day === "Sat" ? (
              <div key={day} className="calendar-weakdays end">
                {day}
              </div>
            ) : (
              <div key={day} className="calendar-weakdays">
                {day}
              </div>
            );
          })}
        </div>
        <div className="calendar-dates">
          {getWeeks().map((week, wi) =>
            week.map((day, di) => (
              <Days
                key={`${month}-${year}-${wi}-${di}`}
                day={day}
                isCleared={isBlocked}
              />
            ))
          )}
        </div>
      </div>
      <div className="calendar-buttons">
        <button onClick={gotToNextMonth}>prev</button>
        <button className={`calendar-toggle ${isBlocked ? 'active' : ''}`}  onClick={() => setIsBlocked((prev) => !prev)}>
          Toggle All ({isBlocked ? "ON" : "OFF"})
        </button>
        <button disabled={saving} onClick={() => saveCalendar()}>{saving ? 'Saving...' : 'Save Calendar'}</button>
        <button onClick={gotToNextMonth}>next</button>
      </div>
    </>
  );
}

export default App;
