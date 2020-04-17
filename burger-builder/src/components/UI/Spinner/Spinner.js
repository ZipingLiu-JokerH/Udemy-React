import React from 'react';
import cssStyle from './Spinner.module.css';

const spinner = () => (
    <div className={cssStyle.loader}>Loading...</div>
);

export default spinner;