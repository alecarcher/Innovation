import React, { Component } from 'react'
import { GridWrapper, GridItem } from 'luna-react'
import Time from 'react-time'
import Clock from 'react-live-clock'

class Date extends Component {

    render() {

        let now = new Date()

        return (
            <div className='ln-u-margin*2'>
                <GridWrapper>
                    <GridItem size='1/2'>
                        <h5> <Time value={now} format="dddd Do MMMM YYYY" /> </h5>
                    </GridItem>
                    <GridItem className='ln-u-text-align-right' size='1/2'>
                        <h5> <Clock format={'h:mm A'} ticking={true} timezine={'US/Pacific'} /> </h5>
                    </GridItem>
                </GridWrapper>
            </div >
        )
    }
}

export default Date