import React from 'react'
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
      <React.Fragment>
        <div className="header">
          <h1>{props.pageData ? props.pageData.title : '...'}</h1>
        </div>
      </React.Fragment>
    )
}

Header.propTypes = {
  pageData: PropTypes.object
}

export default Header