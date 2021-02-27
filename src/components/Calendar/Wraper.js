import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Tooltip
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import CalendarFullWidth from './index';

export default function LivePreviewExample(props) {
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);

  const toggleSidebarMenu = () => setIsSidebarMenuOpen(!isSidebarMenuOpen);
  const { events } = props;
  return (
    <>
      <div className="app-inner-content-layout--main card-box bg-white p-0">
        <div className="card-header rounded-0 bg-white p-4 border-bottom">
          <div className="card-header--title">
            <small>Events</small>
            <b className="font-size-lg">Events calendar</b>
          </div>
          <div className="card-header--actions">
            <Button
              href="#/"
              onClick={(e) => e.preventDefault()}
              size="small"
              className="btn-first btn-icon d-40 p-0 hover-scale-sm btn-pill">
              <FontAwesomeIcon icon={['fas', 'plus']} />
            </Button>
          </div>
        </div>
        <PerfectScrollbar>
          <div className="p-4">
            <CalendarFullWidth events={events} />
          </div>
        </PerfectScrollbar>
      </div>

      <div
        onClick={toggleSidebarMenu}
        className={clsx('sidebar-inner-layout-overlay', {
          active: isSidebarMenuOpen
        })}
      />
    </>
  );
}
