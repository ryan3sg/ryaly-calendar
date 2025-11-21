import { useEffect, useState } from "react";

const Days = ({
  day,
  isCleared,
}: {
  day: number | null;
  isCleared: boolean;
}) => {
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    setBlocked(isCleared);
  }, [isCleared]);
  return (
    <div
      className="calendar-days"
      {...(day && { onClick: () => day && setBlocked((prev) => !prev) })}
    >
      {day || ""}
      {blocked && day && <img src="img/heart.png" className="calendar-block" />}
    </div>
  );
};

export default Days;
