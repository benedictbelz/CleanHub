import * as _ from 'lodash';
import * as React from 'react';
import Select from 'react-select';
import './FieldSelect.scss';

interface Props {
    ariaLabel?: string;
    placeholder?: string;
    options: { value: string; label: string }[];
    handleChange: (value: string) => void;
    value: string;
}

export default function FieldSelect(props: Props) {
    return (
        <div className='fieldSelect' aria-label={props.ariaLabel ? props.ariaLabel : ''}>
            <Select
                classNamePrefix='react-select'
                options={props.options}
                placeholder={props.placeholder ? props.placeholder : ''}
                onChange={option => props.handleChange(_.get(option, 'value', ''))}
                value={
                    props.value !== ''
                        ? {
                              label: _.get(
                                  _.find(props.options, item => item.value === props.value),
                                  'label',
                                  '',
                              ),
                              value: props.value,
                          }
                        : ''
                }
            />
        </div>
    );
}
