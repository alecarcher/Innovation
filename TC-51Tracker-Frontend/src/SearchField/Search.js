import React, { Component } from 'react'
import { OutlinedButton, AsyncAutocompleteField, Card } from 'luna-react'
import './Results'
import '../MainPage/Main.scss'

class SearchArea extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '', showHFC: false, openNow: false, loading: false, confirmEnabled: false }
    this.onClick = this.onClick.bind(this)
    this.searchStores = this.searchStores.bind(this)
    this.selectStore = this.selectStore.bind(this)
  }

  async onClick() {
    if (this.state.value === '') {
      return
    }
    this.props.setLoading()
    const response = await fetch(`http://localhost:5000/api/cities/${this.state.value}`)
    await response.json().then(data => this.props.updateStore(data))
  }

  searchStores(event) {
    this.setState({ selectedStore: event.target.value })
  }

  selectStore(event) {
    if (event === null) {
      return
    }
    this.setState({ value: event.value })
    this.setState({ confirmEnabled: true })
  }

  render() {

    const loadOptions = async value => {
      let url = `http://localhost:5000/api/cities/`
      return fetch(url)
        .then(response => response.json())
        .then(response =>
          response.map(item => ({
            label: item.name,
            value: item.id
          }))
        )
    }

    return (
      <Card>
        <AsyncAutocompleteField
          name="async-autocomplete-field-1"
          className="ln-u-margin*2"
          label="Search for TC-51 Device:"
          placeholder="Start typing to Search for TC-51 Device..."
          loadOptions={loadOptions}
          onChange={this.searchStores}
          onSelect={this.selectStore}
          minChars={1} />

        <div className="ln-u-text-align-center">
          <OutlinedButton
            onClick={this.onClick}
            disabled={!this.state.confirmEnabled}
          >
            Search
          </OutlinedButton>
        </div>
      </Card>
    )
  }
}

export default SearchArea
