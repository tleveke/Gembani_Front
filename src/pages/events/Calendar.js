import React from 'react';
import CalendarWrapper from '../../components/Calendar/Wraper';
import { useQuery } from 'jsonapi-react';
import { LeftSidebar } from '../../layout-blueprints';

const CalendarPage = () => {
  const { data, error, isLoading } = useQuery([
    'events',
    {
      include: ['attendees', 'employee']
    }
  ]);

  return (
    <>
      <LeftSidebar>
        {isLoading ? (
          'Loading...'
        ) : (
          <CalendarWrapper events={data} error={error} />
        )}
      </LeftSidebar>
    </>
  );
};

export default CalendarPage;
