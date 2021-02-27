import React, { useState } from 'react';

import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import SimpleModal from './SimpleModal';
import { useMutation, useQuery } from 'jsonapi-react';
import Dialog from './Dialog';
import {
  Button,
  Card,
  Grid,
  LinearProgress,
  List,
  ListItem,
  Popover
} from '@material-ui/core';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
let allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: '#eaf6ff'
    }
  });

const locales = {
  'en-US': require('date-fns/locale/en-US')
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

export default function LivePreviewExample(props) {
  const { events } = props;
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
  const [clientEmail, setClientEmail] = useState('');
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [simpleModalOpen, setSimpleModalOpen] = useState(false);
  const userQuery = useQuery([
    'users',
    {
      filter: {
        userType: 'client'
      }
    }
  ]);
  const [event, setEvent] = useState({});

  const toggleModal = () => {
    setSimpleModalOpen(!simpleModalOpen);
  };

  const handleOpenPopover = (event, data) => {
    setPopoverAnchorEl(data.currentTarget);
    setEvent(event);
  };
  const handleClosePopover = () => {
    setPopoverAnchorEl(null);
  };
  const displayDate = (date) => {
    if (date) {
      return date.toLocaleString();
    } else {
      return '';
    }
  };

  const newUser = (user) => {
    setNewUserEmail(user.email);
    handleClosePopover();
    setNewUserDialogOpen(true);
  };

  const onClose = (user) => {
    setNewUserEmail('');
    setNewUserDialogOpen(false);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = '#' + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  };
  return (
    <>
      <Calendar
        localizer={localizer}
        views={allViews}
        eventStyleGetter={eventStyleGetter}
        step={60}
        onSelectEvent={handleOpenPopover}
        showMultiDayTimes
        defaultDate={new Date()}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper
        }}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 650 }}
      />
      <Popover
        open={Boolean(popoverAnchorEl)}
        anchorEl={popoverAnchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        PaperProps={{
          style: { width: '600px' }
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <List
          component="div"
          className="list-group-flush text-left bg-transparent">
          <ListItem component="div" className="rounded-top">
            <div className="align-box-row">
              <div className="pl-2">
                <span className="pb-1 d-block font-weight-bold">
                  {event.title}
                </span>
                <small className="pb-1 text-black-50 d-block">
                  {event.description}
                </small>
                <small className="text-black-50">
                  Start: <b>{displayDate(event.start)}</b>
                </small>
                <br />
                <small className="text-black-50">
                  End: <b>{displayDate(event.end)}</b>
                </small>
                <div className="divider my-2" />
                <span className="pb-1 d-block font-weight-bold">Employee</span>
                {event.employee && (
                  <span className="pb-1 d-block">
                    {event.employee.firstName} {event.employee.lastName}{' '}
                    {event.employee.email}
                  </span>
                )}
              </div>
            </div>
          </ListItem>
          <ListItem component="div" className="d-block bg-transparent py-2">
            <div className="align-box-row mb-1">
              <div>
                <small className="font-weight-bold">Attendees</small>
              </div>
            </div>
            <List component="div" className="list-group-flush">
              {event.attendees &&
                event.attendees.map((attendee) => (
                  <ListItem component="div" key={attendee.id} className="py-3">
                    <Grid container spacing={0}>
                      <Grid
                        item
                        xl={6}
                        md={12}
                        className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper mr-2"></div>
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className=" text-black"
                              title="...">
                              {attendee.email}
                            </a>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xl={6}
                        md={12}
                        className="pt-3 pt-xl-0 d-flex align-items-center">
                        <div className="align-box-row flex-grow-1">
                          <div className="d-flex flex-column flex-grow-1">
                            <div className="d-flex justify-content-between text-dark"></div>
                          </div>
                          <Button
                            onClick={() => {
                              newUser(attendee);
                            }}
                            size="small"
                            className="btn-neutral-primary ml-4">
                            New
                          </Button>
                          <Button
                            size="small"
                            onClick={() => {
                              setNewUserEmail(attendee.email);
                              handleClosePopover();
                              setSimpleModalOpen(true);
                            }}
                            className="btn-neutral-primary ml-4">
                            Assign
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
            </List>
          </ListItem>
        </List>
      </Popover>
      <SimpleModal
        clients={userQuery}
        open={simpleModalOpen}
        clientEmail={newUserEmail}
        onClose={toggleModal}
      />
      <Dialog open={newUserDialogOpen} onClose={onClose} />
    </>
  );
}
