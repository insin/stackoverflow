import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

import React from 'react'
import {Grid, ProgressBar, Row} from 'react-bootstrap'

export default class App extends React.Component {
  state = {
    progress: 25,
  }
  handleChange = (e) => {
    this.setState({progress: Number(e.target.value)})
  }
  render() {
    let {progress} = this.state
    return <Grid>
      <p><code>{`<ProgressBar active now={25}/>`}</code></p>
      <ProgressBar active now={25}/>
      <p><code>{`<ProgressBar className="right" active now={25}/>`}</code></p>
      <ProgressBar className="right" active now={progress}/>
      <input type="range" value={progress} onChange={this.handleChange}/>
      <p>CSS:</p>
      <pre>{`
.progress.right .progress-bar {
  float: right;
}
`.trim()}</pre>
    </Grid>
  }
}
