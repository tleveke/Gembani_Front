import React, { useCallback, useEffect, useState } from 'react'
import { Table, Card, Button, Checkbox, Input, Grid } from '@material-ui/core'
import LeftSidebar from '../../layout-blueprints/LeftSidebar'
import PageTitle from '../../layout-components/PageTitle'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { ExampleWrapperSeamless } from '../../layout-components'
import { useMutation, useQuery } from 'jsonapi-react'

export default function LivePreviewExample() {
    const [companies, setCompanies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { data, isLoading: isDataLoading } = useQuery(['companies', { include: ['bookings.employee'] }])
    /**
     * TODO
     * Ici nous avons essaye des "companies/1" ou juste "companies"
     */
    const [mutate, { isLoading: isLoadingMutate }] = useMutation('companies/1')

    useEffect(
        () => {
            console.log(data)
            setCompanies(data)
        },
        [data]
    )

    useEffect(
        () => {
            if (isDataLoading || isLoadingMutate)
                setIsLoading(true)
            else
                setIsLoading(false)
        },
        [isDataLoading, isLoadingMutate]
    )

    const onSave = useCallback(
        async () => await mutate(companies[0]),
        [companies]
    )

    return (
        <>
            <LeftSidebar>
                <PageTitle
                    titleHeading="Bookings"
                    titleDescription="Take advantage of these extensive, easy to customize large charts component blocks."
                />
                <Grid container spacing={6}>
                    <Grid item lg={6}>
                        <ExampleWrapperSeamless>
                            <Card className="rounded w-100 shadow-xxl bg-white my-5 p-5">
                                <div className="d-flex align-items-center justify-content-center flex-wrap">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <div className="m-4">
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Start Date"
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date'
                                                }}
                                            />
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </div>
                            </Card>
                        </ExampleWrapperSeamless>
                    </Grid>
                    <Grid item lg={6}>
                        <ExampleWrapperSeamless>
                            <Card className="rounded w-100 shadow-xxl bg-white my-5 p-5">
                                <div className="d-flex align-items-center justify-content-center flex-wrap">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <div className="m-4">
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="End Date"
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date'
                                                }}
                                            />
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </div>
                            </Card>
                        </ExampleWrapperSeamless>
                    </Grid>
                </Grid>

                <form
                    onSubmit={ev => {
                        ev.preventDefault()
                        onSave()
                    }}
                >
                    {isLoading ?
                        <p>Ca charge frere</p> :
                        <>
                            {companies?.map((company, i) => (
                                <Card
                                    key={`key_${i}`}
                                    className="p-4 shadow-xxl mb-spacing-6-x2"
                                >
                                    <div className="card-header pr-2">
                                        <div className="card-header--title">
                                            <b>{company.name}</b>
                                        </div>
                                    </div>
                                    <div className="table-responsive-md">
                                        <Table className="table table-alternate-spaced">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Bill?</th>
                                                    <th style={{ width: '400px' }} scope="col">
                                                        Event
                                                </th>
                                                    <th scope="col">Employee</th>
                                                    <th scope="col">Number of hours</th>
                                                    <th scope="col">Total Price</th>
                                                    <th scope="col">Price Overwrite</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {company?.bookings?.map((booking, y) => (
                                                    <tr
                                                        key={`booking_${y}`}
                                                    >
                                                        <td className="text-center text-black-50">
                                                            <span>
                                                                <Checkbox
                                                                    checked={booking.isChecked}
                                                                    onChange={(ev, checked) => {
                                                                        const data = [...companies]
                                                                        data[i].bookings[y].isChecked = checked
                                                                        setCompanies(data)
                                                                    }}
                                                                />
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <b>{booking.title}</b>
                                                            <span className="d-block text-black-50 font-size-sm">
                                                                {new Date(booking.minDate).toLocaleDateString()} - {new Date(booking.maxDate).toLocaleDateString()}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span>{booking?.employee?.firstName} {booking?.employee?.lastName}</span>
                                                        </td>
                                                        <td className="font-size-lg font-weight-bold">
                                                            <span>{booking.hours}</span>
                                                        </td>
                                                        <td className="text-warning">
                                                            <span>{booking.price}</span>
                                                        </td>
                                                        <td className="">
                                                            <Input
                                                                type="number"
                                                                value={booking.priceOverwrite}
                                                                onChange={(ev) => {
                                                                    const data = [...companies]
                                                                    data[i].bookings[y].priceOverwrite = ev.target?.value
                                                                    setCompanies(data)
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card>
                            ))}

                            <Button
                                type="submit"
                                className=" btn-primary font-weight-bold w-50 my-2"
                            >
                                Save
                            </Button>
                        </>
                    }
                </form>
            </LeftSidebar>
        </>
    )
}
