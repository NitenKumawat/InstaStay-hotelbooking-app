import { differenceInCalendarDays, format } from "date-fns";

export default function BookingDates({ booking, className }) {
  // Convert checkInDate and checkOutDate to Date objects
  const checkInDate = new Date(booking.checkInDate); // use checkInDate from the object
  const checkOutDate = new Date(booking.checkOutDate); // use checkOutDate from the object

  // Ensure the dates are valid
  if (isNaN(checkInDate) || isNaN(checkOutDate)) {
    return <div>Invalid booking dates</div>;
  }

  return (
    <div className={"flex flex-wrap items-center gap-2 pl-0 p-3 rounded-lg shadow-sm " + className}>
      {/* Nights Icon */}
      <div className="flex items-center  gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
        <span className="font-semibold text-gray-700">
          {differenceInCalendarDays(checkOutDate, checkInDate)} nights
        </span>
      </div>

      {/* Check-In Date */}
      <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
        <span>{format(checkInDate, "yyyy-MM-dd")}</span>
      </div>

      {/* Arrow Icon */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Check-Out Date */}
      <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25"
          />
        </svg>
        <span>{format(checkOutDate, "yyyy-MM-dd")}</span>
      </div>
    </div>
  );
}
