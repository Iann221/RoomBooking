import React from "react";
import Calendar from "color-calendar";
import "color-calendar/dist/css/theme-glass.css";
import { observer } from "mobx-react-lite";
import { Reservation } from "../../app/models/reservation";

export type CalProps = {
  eventData: any[]
  // handleChange: (predicate: string, value: string | Date) => void;
  handleChange: (date: Date) => void;
  // handleChange: any
}

class CalendarComponent extends React.Component<CalProps> {
  componentDidMount() {
    new Calendar({
      id: "#myCal",
      theme: "glass",
      weekdayType: "long-upper",
      monthDisplayType: "long",
      calendarSize: "small",
      layoutModifiers: ["month-left-align"],
      eventsData: this.props.eventData,
      dateChanged: (currentDate: Date, events: any) => {
        console.log("date change", currentDate, events);
        this.props.handleChange(currentDate)
      },
      monthChanged: (currentDate: any, events: any) => {
        console.log("month change", currentDate, events);
      }
    });
  }

  render() {
    return <div id="myCal"></div>;
  }
}

export default CalendarComponent;