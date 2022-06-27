import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Login from '../components/page/login/Login'
import PrivateRoute from './PrivateRoute'
import Home from '../components/page/home/index/Index'
import SearchField from '../components/page/timesheet'
import { LOCAL_STORAGE } from '../components/constant/localStorage'
import { loginAccess } from '../components/page/login/slice/sliceLogin'
import Header from '../components/layout/header/index/Index'
import { NotFound, AuthorError } from '../components'
import NotificationList from '../components/page/manager/createNotification/NotificationList'
import ChangeShift from '../components/page/manager/changeShift/ChangeShift'
import Manager from '../components/page/manager/managerRequests/Requests'

const AppRoutesComponent = () => {
  const dispatch = useDispatch()

  const ROLES = {
    User: 1,
    Manager: 2,
    Admin: 3,
  }

  const data = useSelector((state) => state.userInfo?.currentUser?.role)

  const tokenAccess = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)

  if (tokenAccess && !data) {
    const datatype = {
      tokenAccess: localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN),
      role: localStorage.getItem(LOCAL_STORAGE.ROLE),
    }
    dispatch(
      loginAccess({
        role: datatype.role,
        tokenAccess: datatype.tokenAccess,
      }),
    )
  }

  return (
    <>
      <Routes>
        {/* public routes no layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<AuthorError />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<Header />}>
          {/* public routes with layout */}
          <Route
            element={
              <PrivateRoute
                allowedRoles={[ROLES.User, ROLES.Manager, ROLES.Admin]}
              />
            }
          >
            <Route path="/timesheet" element={<SearchField />} />
          </Route>

          {/* User routes */}
          <Route element={<PrivateRoute allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Manager routes */}
          <Route
            element={
              <PrivateRoute allowedRoles={[ROLES.Manager, ROLES.Admin]} />
            }
          >
            <Route path="/manager" element={<Manager />} />
          </Route>

          {/* Admin routes */}
          <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
            <Route path="/notification" element={<NotificationList />} />
            <Route path="/change-shift" element={<ChangeShift />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutesComponent
