import React from 'react';

const withCssClass = props => {
return <div className={props.cssClass}>{props.children}</div>
};

export default withCssClass;