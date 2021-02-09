//bringing in react-table and using table, sortby & filter options
import { useTable, useSortBy, useFilters } from 'react-table';
import { useState } from 'react';
//bringing in the down/up arrow icons
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';

function Table({ columns, data }) {
    //state for the input field to filter item
    const [filterInput, setFilterInput] = useState('');

    //some boiler plate
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter
    } = useTable(
        {
            columns,
            data
        },
        useFilters,
        useSortBy
    );
    
    //handle the input controlled  component
    const handleFilterChange = (e) => {
        const value = e.target.value || '';
        //bring in the results object from the api and filter by name.last
        setFilter('name.last', value);
        setFilterInput(value);
    };

    return (
        <>
            <div className='col-sm-3 p-0'>
                <input
                    value={filterInput}
                    onChange={(e) => handleFilterChange(e)}
                    placeholder={'Search by Last Name'}
                    type='text'
                    className='form-control'
                />
            </div>
            <br />
            <table className='table table-bordered' {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {' '}
                                        {column.isSorted ? (
                                            //changed icons out to something that looks a littler cleaner
                                            column.isSortedDesc ? (
                                                <FaChevronDown />
                                            ) : (
                                                <FaChevronUp />
                                            )
                                        ) : (
                                            ''
                                        )}{' '}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default Table;