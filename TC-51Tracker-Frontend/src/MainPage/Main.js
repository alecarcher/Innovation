import React, { Component } from 'react'
import { GridItem, GridWrapper, OutlinedButton, TextInputField, Card } from 'luna-react'
import './City.scss'
import axios from 'axios'
import { Account, Calendar, Delete, StoreLocation, ErrorCircle } from '@jsluna/icons'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Modal, ModalHeading } from '@jsluna/modal'

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDInClUL3vtQR45J-fZR-Qi913Gedt0ndY&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 52.436480, lng: -1.436960 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 52.436480, lng: -1.436960 }} onClick={props.onMarkerClick} />}
    </GoogleMap>
)

class City extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addExtra: false,
            tc51: [],
            editing: false,
            newName: '',
            newDescription: '',
            pointsOfInterest: [],
            setAddStoreForm: false,
            setAddPointsOfInterest: false,
            showMe: false,
            text: '',
            isMarkerShown: false,
            isLocationOpen: false,
            isHistoryOpen: false,
            isProfileOpen: false,
            isLockedOpen: false,
            isDeleteOpen: false
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }


    handleChangeName(event) {
        this.setState({ newName: event.target.value })
    }

    handleChangeDescription(event) {
        this.setState({ newDescription: event.target.value })
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/cities`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tc51: result,
                    });
                },
            )
        this.delayedShowMarker()
    }

    reloadPage = () => {
        fetch(`http://localhost:5000/api/cities`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tc51: result,
                        newName: '',
                        newDescription: '',
                    });
                },
            )
    }

    getStoreDetailsToDisplay = () => {
        const poiDetails = this.state.pointsOfInterest.map((pointOfInterest) => {
            return (
                <div>
                    <h6>{pointOfInterest.name}</h6>
                    <p>{pointOfInterest.description}</p>
                </div>
            )
        })
        return poiDetails;
    }

    showAddNewStoreForm() {
        this.setState({
            setAddStoreForm: true
        })
    }

    hideAddNewStoreForm() {
        this.setState({
            setAddStoreForm: false,
            newName: '',
            newDescription: '',
        })
    }

    updatingFormName = () => {
        this.setState({
            name: this.state.newName
        })
    }

    updatingFormDescription = () => {
        this.setState({
            description: this.state.newDescription
        })
    }

    addNewInfoToAPI() {
        const newCity = {
            name: this.state.newName,
            description: this.state.newDescription,
        }
        fetch(`http://localhost:5000/api/cities/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCity)
        })
            .then(res => {
                res.json()
                this.reloadPage()
            })
    }

    deletingInfoFromAPI(id) {
        axios.delete(`http://localhost:5000/api/cities/${id}`)
            .then(res => {
                const stores = res.data
                this.setState({ stores })
                this.reloadPage()
            })
    }

    updatingInfoToAPI = (id) => {
        const updateDescription = {
            id,
            name: this.state.newName,
            description: this.state.newDescription,
        }
        fetch(`http://localhost:5000/api/cities/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateDescription)
        })
            .then(res => {
                this.setState({
                    newName: res,
                    newDescription: res
                })
                this.reloadPage()
                this.showNewDescription()
            })
    }

    showNewDescription = () => {
        if (this.state.newDescription === '') {
            this.setState({ editing: true })
        }
        else {
            this.setState({ editing: false })
        }
    }

    render() {
        return (
            <div>
                <Card className='ln-u-margin*2'>
                    <GridWrapper>
                        {
                            this.state.tc51.map(city => (
                                <GridItem key={city.id} size={'1/1'}>
                                    <div className="c-app-title ln-u-margin*2">
                                        <GridWrapper>
                                            <GridItem size='1/2'>
                                                <div className="ln-u-color-white ln-u-bg-color-orange-dark">
                                                    <GridWrapper>
                                                        <GridItem size='1/2'>
                                                            <h5 className="ln-u-soft"> {city.name} </h5>
                                                        </GridItem>
                                                        <GridItem size='1/2'>
                                                            <p className="ln-u-text-align-right ln-u-soft"> {city.description} </p>
                                                        </GridItem>
                                                    </GridWrapper>
                                                </div>
                                            </GridItem>
                                            <GridItem className='ln-u-text-align-center' size='1/2'>
                                                <div className=''>

                                                    <OutlinedButton className='ln-u-margin-right*2 ln-u-soft' onClick={() => this.setState({ isProfileOpen: true })}>
                                                        <Account />
                                                    </OutlinedButton>
                                                    <Modal
                                                        small
                                                        handleClose={() => this.setState({ isProfileOpen: false })}
                                                        open={this.state.isProfileOpen}
                                                    >
                                                        <ModalHeading element="h3">
                                                            Current User
                                                        </ModalHeading>
                                                        <div>
                                                            User Information here...
                                                        </div>
                                                    </Modal>

                                                    <OutlinedButton className='ln-u-margin-right*2 ln-u-soft' onClick={() => this.setState({ isLocationOpen: true })}>
                                                        <StoreLocation />
                                                    </OutlinedButton>
                                                    <Modal
                                                        small
                                                        handleClose={() => this.setState({ isLocationOpen: false })}
                                                        open={this.state.isLocationOpen}
                                                    >
                                                        <ModalHeading element="h3">
                                                            Location
                                                        </ModalHeading>
                                                        <div>
                                                            <MyMapComponent
                                                                isMarkerShown={this.state.isMarkerShown}
                                                                onMarkerClick={this.handleMarkerClick}
                                                            />
                                                        </div>
                                                    </Modal>

                                                    <OutlinedButton className='ln-u-margin-right*2 ln-u-soft' onClick={() => this.setState({ isHistoryOpen: true })}>
                                                        <Calendar />
                                                    </OutlinedButton>
                                                    <Modal
                                                        small
                                                        handleClose={() => this.setState({ isHistoryOpen: false })}
                                                        open={this.state.isHistoryOpen}
                                                    >
                                                        <ModalHeading element="h3">
                                                            History
                                                        </ModalHeading>
                                                        <div>
                                                            <p>Active 43 mins ago - User 2212</p>
                                                            <p>Active Yesterday - User 9124</p>
                                                            <p>Active 3 days ago - User 8533</p>
                                                            <p>Active 2 weeks ago - User 3252</p>
                                                        </div>
                                                    </Modal>

                                                    <OutlinedButton className='ln-u-margin-right*2 ln-u-soft' onClick={() => this.setState({ isLockedOpen: true })}>
                                                        <ErrorCircle />
                                                    </OutlinedButton>
                                                    <Modal
                                                        small
                                                        handleClose={() => this.setState({ isLockedOpen: false })}
                                                        open={this.state.isLockedOpen}
                                                    >
                                                        <ModalHeading element="h3">
                                                            Lock or Unlock Device
                                                        </ModalHeading>
                                                        <div>
                                                            <p> Show if device is locked or unlocked. </p>
                                                            <div className='ln-u-soft'><OutlinedButton> Lock Device </OutlinedButton></div>
                                                            <div className='ln-u-soft'><OutlinedButton> Unlock Device </OutlinedButton></div>
                                                        </div>
                                                    </Modal>

                                                    <OutlinedButton
                                                        className='ln-u-margin-right*2 ln-u-soft'
                                                        onClick={() => this.deletingInfoFromAPI(city.id)}>
                                                        <Delete />
                                                    </OutlinedButton>
                                                </div>
                                            </GridItem>
                                        </GridWrapper >
                                    </div>
                                </GridItem>
                            ))
                        }

                        <GridItem className='ln-u-text-align-center ln-u-soft' size={'1/1'}>
                            <OutlinedButton onClick={() => this.showAddNewStoreForm()}> Add New TC-51 Device </OutlinedButton>
                        </GridItem>

                        <GridItem size={'1/3'}></GridItem>
                        {this.state.setAddStoreForm === true &&
                            <GridItem className='ln-u-margin-top*4 ln-u-border' size={'1/3'}>
                                <Card className='ln-u-text-align-center'>

                                    <h4> Add New TC-51: </h4>

                                    <TextInputField
                                        name='storeName'
                                        value={this.state.newName}
                                        onChange={this.handleChangeName}
                                        label='TC-51 Device Name:'
                                    />

                                    <TextInputField
                                        name='storeDescription'
                                        value={this.state.newDescription}
                                        onChange={this.handleChangeDescription}
                                        label='TC-51 User Details:'
                                    />

                                    <OutlinedButton
                                        className='ln-u-margin'
                                        onClick={() => this.addNewInfoToAPI()}> Submit </OutlinedButton>
                                    <OutlinedButton className='ln-u-margin' onClick={() => this.hideAddNewStoreForm()}> Cancel </OutlinedButton>
                                </Card>
                            </GridItem>
                        }
                        <GridItem size={'1/3'}></GridItem>
                    </GridWrapper >
                </Card>
            </div>
        )
    }
}

export default City;
