import React, { lazy, Suspense, useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  BrowserRouter
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';
import { ThemeProvider } from '@material-ui/styles';
import Login from './components/Login';
import MuiTheme from './theme';
import { PrivateRoute } from 'react-auth-kit';
import UserListPage from './pages/users/List';
import UserCreatePage from './pages/users/Create';
import UserEditPage from './pages/users/Edit';
import InvoiceView from './pages/invoices/View';
import InvoiceList from './pages/invoices/List';
import BookingList from './pages/bookings/List';
import CalendarPage from './pages/events/Calendar';

// Layout Blueprints

import {
  LeftSidebar,
  CollapsedSidebar,
  MinimalLayout,
  PresentationLayout
} from './layout-blueprints';
import { ApiProvider } from 'jsonapi-react';

const FormsControls = lazy(() => import('./example-pages/FormsControls'));

const Routes = () => {
  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.3
  };

  const SuspenseLoading = () => {
    const location = useLocation();
    const [show, setShow] = useState(false);
    useEffect(() => {
      let timeout = setTimeout(() => setShow(true), 300);
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    return (
      <>
        <AnimatePresence>
          {show && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
                <div className="d-flex align-items-center flex-column px-4">
                  <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
                </div>
                <div className="text-muted font-size-xl text-center pt-3">
                  Please wait while we load the live preview examples
                  <span className="font-size-lg d-block text-dark">
                    This live preview instance can be slower than a real
                    production build!
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={MuiTheme}>
        <AnimatePresence>
          <Suspense fallback={<SuspenseLoading />}>
            <Route path={['/sessions/new']}>
              <MinimalLayout>
                <Login />
              </MinimalLayout>
            </Route>

            <PrivateRoute
              component={CalendarPage}
              loginPath={'/sessions/new'}
              exact
              path={'/calendar'}></PrivateRoute>

            <PrivateRoute
              component={UserEditPage}
              loginPath={'/sessions/new'}
              exact
              path={'/user/edit/:id'}></PrivateRoute>

            <PrivateRoute
              component={UserListPage}
              loginPath={'/sessions/new'}
              exact
              path={'/user/list'}></PrivateRoute>

            <PrivateRoute
              component={BookingList}
              loginPath={'/sessions/new'}
              exact
              path={'/booking/list'}></PrivateRoute>

            <PrivateRoute
              component={UserCreatePage}
              loginPath={'/sessions/new'}
              exact
              path={'/user/create'}></PrivateRoute>

            <PrivateRoute
              component={InvoiceView}
              loginPath={'/sessions/new'}
              exact
              path={'/invoice/view'}></PrivateRoute>
            <PrivateRoute
              component={InvoiceList}
              loginPath={'/sessions/new'}
              exact
              path={'/invoice/list'}></PrivateRoute>
          </Suspense>
        </AnimatePresence>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Routes;
