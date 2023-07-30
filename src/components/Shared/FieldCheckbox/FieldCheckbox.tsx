import * as React from 'react';
import './FieldCheckbox.scss';

interface Props {
    ariaLabel?: string;
    labelLeft?: string;
    labelRight?: string;
    handleChange: (value: boolean) => void;
    value: boolean;
}

export default function FieldCheckbox(props: Props) {
    return (
        <div className='fieldCheckbox' aria-label={props.ariaLabel ? props.ariaLabel : ''}>
            {props.labelLeft ? (
                <p className='labelLeft' onClick={() => props.handleChange(!props.value)}>
                    {props.labelLeft}
                </p>
            ) : null}
            <div className={'checkboxWrapper' + (props.value ? ' active' : '')} onClick={() => props.handleChange(!props.value)}>
                <div className='checkboxDot' />
            </div>
            {props.labelRight ? (
                <p className='labelRight' onClick={() => props.handleChange(!props.value)}>
                    {props.labelRight}
                </p>
            ) : null}
        </div>
    );
}
