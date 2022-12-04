import React from 'react'

const Error = ({  children}) => {
  return (
    <div>
      <div className="alert alert-danger "    role="alert">
  <strong>{children}</strong>
</div>
    </div>
  )
}

export default Error
