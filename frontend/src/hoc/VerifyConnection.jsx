import React, { useContext } from 'react'
import SQLEditor from '../pages/SQLEditor';
import { Navigate } from 'react-router-dom';
import { DataContext } from '../contexts/dataContext';

const VerifyConnection = () => {
    const {connectionStatus} = useContext(DataContext);
  return (
    <div>
      {connectionStatus ? <SQLEditor/> : <Navigate to="/"/>}
    </div>
  )
}

export default VerifyConnection
