import React, { Component } from 'react'
import './Main.css'
import { GridItem, GridWrapper, Card } from 'luna-react'

import Header from './Header/Header'
import Main from './MainPage/Main'
import Date from './Header/Date'
import Search from './SearchField/Search'
import Results from './SearchField/Results'

class App extends Component {
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
      <div>
        <Header />

        <Card className='ln-u-margin*4'>

          <Date />

          <div className='ln-u-margin*4 ln-u-border'>
            <GridWrapper>
              <GridItem className='ln-u-soft' size={'1/2'}>
                <Search
                  updateStore={this.updateStoreInfo}
                  updateMultiple={this.getMultipleStores}
                  setLoading={this.setLoading}
                />
              </GridItem>

              <GridItem className='ln-u-soft' size={'1/2'}>
                <Results
                  storeName={this.state.storeName}
                  storeAddress={this.state.storeAddress}
                  loading={this.state.loading}
                />
              </GridItem>
            </GridWrapper>
          </div>

          <Main />

        </Card>

      </div>
    )
  }
}

export default App
