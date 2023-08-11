import axios from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import FieldCheckbox from '../Shared/FieldCheckbox/FieldCheckbox';
import FieldText from '../Shared/FieldText/FieldText';
import FieldSelect from '../Shared/FieldSelect/FieldSelect';
import { ApiHub } from '../../interfaces/api';
import './Collection.scss';

export default function Hubs() {
    const [hubs, setHubs] = useState<ApiHub[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [filterState, setFilterState] = useState<boolean>(false);
    const [filterSearch, setFilterSearch] = useState<string>('');
    const [filterSorting, setFilterSorting] = useState<string>('');
    const [filterGroup, setFilterGroup] = useState<string>('');

    useEffect(() => {
        fetchHubs();
    }, []);

    const fetchHubs = async () => {
        try {
            const response = await axios.get<ApiHub[]>('https://marketplace-demo.cleanhub.com/api/public/hubs');
            setHubs(_.get(response, 'data', []));
        } catch (error) {
            setError('Unable to load hubs, please refresh the page.');
        }
    };

    const renderHub = (item: ApiHub, index: number) => {
        // GET VARIABLES
        const logo = _.get(item, 'logo.thumbnailDirectLink');
        const image = _.get(item, 'cardImage.directLink');
        const name = _.get(item, 'displayName');
        const location = _.get(item, 'location');
        const state = _.get(item, 'state');
        const type = _.get(item, 'type');
        const link = _.get(item, 'slug') ? `https://test.cleanhub.com/hub/${_.get(item, 'slug')}` : undefined;
        const description = _.get(item, 'cardDescription');
        const paragraph = _.get(item, 'collectionAndSortingParagraph');
        const thankYou = _.get(item, 'thankYouNote');
        const quantityUnit = _.get(item, 'referenceQuantityUnit', '').toLowerCase();
        const recoveredQuantity = Math.round(_.get(item, 'totalRecoveredQuantity', 0));
        const unassignedQuantity = Math.round(_.get(item, 'unassignedQuantityTotal', 0));
        const progress = Math.floor((recoveredQuantity / (recoveredQuantity + unassignedQuantity)) * 100);
        const formattedRecoveredQuantity = _.get(item, 'formattedTotalRecoveredQuantity', 0);
        const formattedUnassignedQuantity = Math.round(unassignedQuantity).toLocaleString('en-US');
        // IF NO NAME OR IMAGE RETURN NULL
        if (!name || !image) {
            return null;
        }
        // RETURN HUB COMPONENT
        return (
            <div key={index} className='hub'>
                <div className='hubHeader'>
                    <div className='hubTitle'>
                        <p>{name}</p>
                        {logo ? (
                            <img alt='Hub Logo' src={logo} onLoad={event => ((event.target as HTMLElement).style.opacity = '1')} />
                        ) : null}
                    </div>
                    <div className='hubImage'>
                        <img alt='Hub Image' src={image} onLoad={event => ((event.target as HTMLElement).style.opacity = '1')} />
                    </div>
                </div>
                <div className='hubBody'>
                    {state === 'ACTIVE' ? (
                        <div className='hubActive'>
                            <span />
                            <p>ACTIVE</p>
                        </div>
                    ) : null}
                    {state === 'DEMO' ? (
                        <div className='hubDemo'>
                            <span />
                            <p>DEMO</p>
                        </div>
                    ) : null}
                    {type ? (
                        <div className='hubInfo'>
                            <img alt='Details Icon' src='assets/images/details.svg' />
                            <p>{type}</p>
                        </div>
                    ) : null}
                    {location ? (
                        <div className='hubInfo'>
                            <img alt='Location Icon' src='assets/images/location.svg' />
                            <p>{location}</p>
                        </div>
                    ) : null}
                    {progress ? (
                        <div className='hubProgress'>
                            <p>
                                {unassignedQuantity !== 0 ? (
                                    <>
                                        {`${formattedUnassignedQuantity} ${quantityUnit} unassigned plastic`}
                                        <span />
                                    </>
                                ) : null}
                                {`${formattedRecoveredQuantity} ${quantityUnit} recovered plastic`}
                            </p>
                            <div className='hubProgressBar' style={{ width: `${progress}%` }} />
                        </div>
                    ) : null}
                    {description ? (
                        <div className='hubText'>
                            <p>{description}</p>
                        </div>
                    ) : null}
                    {thankYou ? (
                        <div className='hubQuote'>
                            <p>{thankYou}</p>
                        </div>
                    ) : null}
                    {paragraph ? (
                        <div className='hubText'>
                            <p>{paragraph}</p>
                        </div>
                    ) : null}
                </div>
                <div className='hubFooter'>
                    {link ? (
                        <div className='hubLink'>
                            <a href={link}>More details</a>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    };

    const renderGroup = (group: string) => {
        if (group !== 'stage' && group !== 'state') {
            return null;
        }
        const groups = _.uniq(_.map(hubs, item => item[`${group}`]));
        return (
            <div id='groups'>
                {groups.map(element => {
                    return (
                        <div key={element} className='group'>
                            <p>{_.startCase(_.toLower(element))}</p>
                            <div className='list'>
                                {hubs.filter(item => item[`${group}`] === element).map((item, index) => renderHub(item, index))}
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }

    const renderList = (hubs: ApiHub[] | null) => {
        // FILTER HUBS
        if (filterState) {
            hubs = _.filter(hubs, item => _.get(item, 'state') === 'ACTIVE');
        }
        if (filterSearch !== '') {
            const search = filterSearch.toLowerCase();
            hubs = _.filter(hubs, item => {
                const name = item.displayName && typeof item.displayName === 'string' ? item.displayName : '';
                const location = item.location && typeof item.displayName === 'string' ? item.location : '';
                const type = item.type && typeof item.type === 'string' ? item.type : '';
                const description = item.cardDescription && typeof item.cardDescription === 'string' ? item.cardDescription : '';
                const paragraph =
                    item.collectionAndSortingParagraph && typeof item.collectionAndSortingParagraph === 'string'
                        ? item.collectionAndSortingParagraph
                        : '';
                const thankYou = item.thankYouNote && typeof item.thankYouNote === 'string' ? item.thankYouNote : '';
                return (
                    name.toLowerCase().includes(search) ||
                    location.toLowerCase().includes(search) ||
                    type.toLowerCase().includes(search) ||
                    description.toLowerCase().includes(search) ||
                    paragraph.toLowerCase().includes(search) ||
                    thankYou.toLowerCase().includes(search)
                );
            });
        }
        if (filterSorting !== '') {
            hubs = _.orderBy(hubs, 'totalRecoveredQuantity', filterSorting as 'asc' | 'desc');
        }
        if (filterGroup !== '') {
            return renderGroup(filterGroup);
        }
        // RENDER LIST
        if (error) {
            return <p>{error}</p>;
        } else if (!hubs) {
            return <p>Loading hubs...</p>;
        } else if (hubs && hubs.length === 0) {
            return <p>There are currently no hubs available...</p>;
        } else {
            return <div className='list'>{hubs.map((item, index) => renderHub(item, index))}</div>;
        }
    };

    const setFilter = (params: { field: string; value: string | boolean }) => {
        if (_.get(params, 'field') === 'state' && typeof _.get(params, 'value') === 'boolean') {
            setFilterState(_.get(params, 'value', false) as boolean);
        }
        if (_.get(params, 'field') === 'search' && typeof _.get(params, 'value') === 'string') {
            setFilterSearch(_.get(params, 'value', '') as string);
        }
        if (_.get(params, 'field') === 'sorting' && typeof _.get(params, 'value') === 'string') {
            setFilterSorting(_.get(params, 'value', '') as string);
        }
        if (_.get(params, 'field') === 'group' && typeof _.get(params, 'value') === 'string') {
            setFilterGroup(_.get(params, 'value', '') as string);
        }
    };

    const renderFilter = (hubs: ApiHub[] | null) => {
        return (
            <div id='filter'>
                <FieldCheckbox
                    ariaLabel='Show only active hubs'
                    labelLeft='All'
                    labelRight='Active'
                    handleChange={value => setFilter({ field: 'state', value })}
                    value={filterState}
                />
                <FieldText
                    ariaLabel='Search through all hubs'
                    placeholder='Search hubs...'
                    handleChange={value => setFilter({ field: 'search', value })}
                    value={filterSearch}
                />
                <FieldSelect
                    ariaLabel='Sorting options for hubs'
                    placeholder='Sort by'
                    options={[
                        {
                            value: '',
                            label: 'Standard',
                        },
                        {
                            value: 'desc',
                            label: 'Most Recovered Plastic',
                        },
                        {
                            value: 'asc',
                            label: 'Least Recovered Plastic',
                        },
                    ]}
                    handleChange={value => setFilter({ field: 'sorting', value })}
                    value={filterSorting}
                />
                <FieldSelect
                    ariaLabel='Group options for hubs'
                    placeholder='Group by'
                    options={[
                        {
                            value: '',
                            label: 'None',
                        },
                        {
                            value: 'stage',
                            label: 'Stage',
                        },
                        {
                            value: 'state',
                            label: 'State',
                        },
                    ]}
                    handleChange={value => setFilter({ field: 'group', value })}
                    value={filterGroup}
                />
            </div>
        );
    };

    return (
        <div id='collection'>
            {renderFilter(hubs)}
            {renderList(hubs)}
        </div>
    );
}
