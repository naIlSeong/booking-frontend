export const editTime = (rawDate: string) => {
  const [rawYear, month, ect] = rawDate.split("-");
  const year = rawYear.slice(0, 2);
  const day = ect.slice(0, 2);
  const [d, minute] = ect.split(":");
  const h = d.slice(3, 5);
  const hour = (parseInt(h) + 9).toString();

  return `${year}/${month}/${day} ${hour}:${minute}`;
};

interface IRenderer {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export const renderer = ({ hours, minutes, seconds, completed }: IRenderer) => {
  if (completed) {
    return <span className="text-red-500 font-bold">Finished!</span>;
  } else {
    if (hours === 0 && minutes < 10) {
      return (
        <>
          <span className="text-coolGray-300 font-normal mx-1">
            {hours}h {minutes < 10 ? `0${minutes}` : minutes}m
            {seconds < 10 ? `0${seconds}` : seconds}s
          </span>{" "}
          <span className="text-red-500 font-bold px-2">Can extend!</span>
        </>
      );
    }
    return (
      <span className="text-coolGray-300 font-normal">
        {hours}h {minutes < 10 ? `0${minutes}` : minutes}m{" "}
        {seconds < 10 ? `0${seconds}` : seconds}s
      </span>
    );
  }
};

export const placeRenderer = ({
  hours,
  minutes,
  seconds,
  completed,
}: IRenderer) => {
  if (completed) {
    return <span className="text-red-500 font-bold">Finished!</span>;
  } else {
    return (
      <span className="text-coolGray-300 font-normal">
        {hours}h {minutes < 10 ? `0${minutes}` : minutes}m{" "}
        {seconds < 10 ? `0${seconds}` : seconds}s
      </span>
    );
  }
};
