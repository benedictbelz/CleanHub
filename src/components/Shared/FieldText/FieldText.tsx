import * as React from 'react';
import './FieldText.scss';

interface Props {
    ariaLabel?: string;
    placeholder?: string;
    handleChange: (value: string) => void;
    value: string;
}

export default function FieldText(props: Props) {
    return (
        <div className='fieldText' aria-label={props.ariaLabel ? props.ariaLabel : ''}>
            <input
                type='text'
                onChange={event => props.handleChange(event.target.value)}
                value={props.value}
                placeholder={props.placeholder ? props.placeholder : ''}
            />
        </div>
    );
}
