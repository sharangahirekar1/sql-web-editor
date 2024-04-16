import React from 'react'
import SQLEditor from '../pages/SQLEditor';
import { Navigate } from 'react-router-dom';

const VerifyConnection = () => {
    const isConnection = localStorage.getItem("sqlConnection");
  return (
    <div>
      {isConnection ? <SQLEditor/> : <Navigate to="/"/>}
    </div>
  )
}

export default VerifyConnection
