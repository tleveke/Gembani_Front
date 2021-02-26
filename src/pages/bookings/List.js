import React, { useCallback, useEffect, useState } from 'react';
import LeftSidebar from '../../layout-blueprints/LeftSidebar';
import PageTitle from '../../layout-components/PageTitle';
import BookingList from '../../components/Booking/List';
import dateFnsParse from 'date-fns/parse';
import dateFnsFormat from 'date-fns/format';

import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import { useMutation, useQuery } from 'jsonapi-react';
import { KeyboardDatePicker } from '@material-ui/pickers';
export default function LivePreviewExample() {
  let history = useHistory()
  let location = useLocation()
  function queryParams() {
    return new URLSearchParams(location.search);
  }

  let query = queryParams();
  let date = new Date();

  let startDate, endDate;
  if (query.get('startDate')){
    startDate = query.get('startDate');
  }else{
    startDate = dateFnsFormat(new Date(date.getFullYear(), date.getMonth(), 1), "MM/dd/yyyy");
  }

  if (query.get('endDate')){
    endDate = query.get('endDate');
  }else{
    endDate = dateFnsFormat(new Date(date.getFullYear(), date.getMonth() + 1, 0), "MM/dd/yyyy");
  }


  const { data, isLoading, error } = useQuery([
    'companies',
    { include: ['bookings.employee'], filter: {
        startDate: startDate,
        endDate: endDate
      }, }
  ]);

  const startDateFilter = (dateString, date) =>{
    dateFilter(date, endDate)
  }
  const endDateFilter = (dateString, date) =>{
    dateFilter(startDate, date)
  }
  const dateFilter = (startDate, endDate) =>{
    history.push(`/booking/list?startDate=${startDate}&endDate=${endDate}`);
  }

  function parseDate(str) {
    return dateFnsParse(str,  "MM/dd/yyyy", new Date());

  }
  return (
    <>
      <LeftSidebar>
        <PageTitle
          titleHeading="Bookings"
          titleDescription="Take advantage of these extensive, easy to customize large charts component blocks."
        />

        {isLoading ? (
          'Loading...'
        ) : (
          <BookingList companies={data} error={error} startDateFilter={startDateFilter} endDateFilter={endDateFilter} startDate={startDate} endDate={endDate}/>
        )}
      </LeftSidebar>
    </>
  );
}
