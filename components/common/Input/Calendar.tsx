import { useState } from 'react';
import styled from 'styled-components';
import ReactDatePicker, { registerLocale } from 'react-datepicker'; // ReactDatePicker 컴포넌트 가져오기
import 'react-datepicker/dist/react-datepicker.css';
// 출처: https://reactdatepicker.com/#example-filter-dates
// 출처: https://date-fns.org/
import { GRAY, PINK, VIOLET } from '@/styles/ColorStyles';
import CalendarIcon from '@/public/icon/calendar.svg';
import ko from 'date-fns/locale/ko'; // 한국어로
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { FONT_12 } from '@/styles/FontStyles';
registerLocale('ko', ko); // 한국어로
const _ = require('lodash'); // _.range를 표현하기 위하여 사용
//  출처: https://blog.naver.com/PostList.naver?blogId=marsdo

interface Props {
  placeholder: string;
  initialValue: string;
}

function Calendar({ placeholder, initialValue }: Props) {
  const [selectDate, setSelectDate] = useState<Date | null>(new Date(initialValue));

  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <StyledCalendarBox>
      <CalendarIcon />
      <StyledDatePickerWrapper>
        <StyledDatePicker
          selected={selectDate}
          onChange={(date: Date) => setSelectDate(date)}
          dateFormat={'yyyy.MM.dd aa h:mm'}
          locale={'ko'}
          minDate={new Date()}
          filterTime={filterPassedTime}
          closeOnScroll
          showTimeSelect
          placeholderText={placeholder}
        />
      </StyledDatePickerWrapper>
    </StyledCalendarBox>
  );
}

export default Calendar;

const StyledCalendarBox = styled.div`
  width: 450px;
  height: 50px;
  padding: 15px 16px;
  border: 1px solid ${GRAY[30]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledDatePickerWrapper = styled.div`
  .react-datepicker {
    ${FONT_12};
  }

  .react-datepicker__month-container {
    width: 200px;
  }

  .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::after {
    border-bottom-color: ${VIOLET[8]};
  }

  .react-datepicker__header {
    background-color: ${VIOLET[8]};
  }

  .react-datepicker__current-month {
    ${FONT_12};
  }

  .react-datepicker__day-name {
    ${FONT_12};
    margin: 3px;
  }

  .react-datepicker__day {
    margin: 3px;
  }

  .react-datepicker__time-container {
    width: 86px;
  }

  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
    height: 163px;
  }

  .react-datepicker-popper {
    z-index: ${Z_INDEX['modalFrame_Body_High']};
  }
`;

const StyledDatePicker = styled(ReactDatePicker)`
  border: none;
  font-weight: 400;
  font-size: 1.6rem;
  background-color: transparent;
  color: #707070;
`;
