import React, { useCallback, useEffect, useState } from 'react';
import LeftSidebar from '../../layout-blueprints/LeftSidebar';
import PageTitle from '../../layout-components/PageTitle';
import BookingList from '../../components/Booking/List';

import { useMutation, useQuery } from 'jsonapi-react';

export default function LivePreviewExample() {
  const { data, isLoading, error } = useQuery([
    'companies',
    { include: ['bookings.employee'] }
  ]);

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
          <BookingList companies={data} error={error} />
        )}
      </LeftSidebar>
    </>
  );
}
