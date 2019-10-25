import React, { Component } from 'react'
import { ProgressIndicator, ProgressBar, TableContainer, TableBody, TableRow, TableCell, Card } from 'luna-react'
import './Search'

class Result extends Component {

  render() {
    return (
      <div className="ln-u-margin-right*2">

        {this.props.loading === false &&
          <div>
            {this.props.storeName !== '' ? <div>
              <TableContainer className="LocalTable">
                <TableBody>

                  <TableRow>
                    <TableCell> TC-51 Device Name: </TableCell>
                    <TableCell> {this.props.storeName} </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell> TC-51 Description: </TableCell>
                    <TableCell> {this.props.storeAddress}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell> TC-51 Location: </TableCell>
                    <TableCell> Show Location of TC-51 </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell> TC-51 Locked or Unlocked: </TableCell>
                    <TableCell> Unlocked / Locked </TableCell>
                  </TableRow>

                </TableBody>
              </TableContainer> <br />

            </div> :
              <Card>
                <h4 className="ln-u-text-align-center ln-u-soft"> No Search Results! </h4>
              </Card>
            }
          </div>}

        {this.props.loading === true && <div>
          <ProgressIndicator loading preventFocus>
            <ProgressBar className="ln-u-push-bottom-sm" />
            <ProgressBar small />
          </ProgressIndicator>
          <h3 className="Loading"> Loading... </h3>
        </div>}
      </div>
    )
  }
}

export default Result
