import React, { Component } from 'react'
import { Header, HeaderLogo, HeaderActions } from '@jsluna/header'
import '../Main.css'


class NewHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storeName: '',
            storeAddress: '',
            storePostCode: '',
            storeTelephone: '',
            loading: false,
        }
        this.updateStoreInfo = this.updateStoreInfo.bind(this)
        this.getMultipleStores = this.getMultipleStores.bind(this)
        this.setLoading = this.setLoading.bind(this)
    }

    updateStoreInfo(storeData) {
        this.setState({
            storeName: storeData.name,
            storeAddress: storeData.description,

        })
        this.setState({ loading: false })
    }

    setLoading() {
        this.setState({ loading: true })
    }

    getMultipleStores(data) {
        this.setState({
            stores: data.results.map((store) =>
                <div key={store.id}>
                    <li>  {store.id}</li>
                    <li > {store.name}</li>
                </div>
            )
        })
    }
    render() {
        return (
            <>
                <Header>
                    <HeaderLogo>
                        <div className='my-u-title'>Zebra Tracker</div>
                    </HeaderLogo>
                    <HeaderActions align="right" label="Basket and account">
                        <a href="#account" className='ln-u-border-right ln-u-soft-right'>
                            Welcome: Alec Archer
                        </a>
                        <a href="#logout" className='ln-u-soft-left'> Log Out </a>
                    </HeaderActions>
                </Header>
            </>
        )
    }
}

export default NewHeader
