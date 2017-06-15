import React from 'react'

export default class ControlledRadios extends React.Component {
  state = {
    reportWeekday: 'monday'
  }

  handleWeekdayChange = (event) => {
    this.setState({reportWeekday: event.target.value})
  }

  render() {
    let {reportWeekday} = this.state
    return <fieldset onChange={this.handleWeekdayChange}>
      <label><input type="radio" name="schedule-weekly-option" value="sunday" checked={reportWeekday === 'sunday'}/>Sunday</label>
      <label><input type="radio" name="schedule-weekly-option" value="monday" checked={reportWeekday === 'monday'}/>Monday</label>
      <label><input type="radio" name="schedule-weekly-option" value="tuesday" checked={reportWeekday === 'tuesday'}/>Tuesday</label>
      <label><input type="radio" name="schedule-weekly-option" value="wednesday" checked={reportWeekday === 'wednesday'}/>Wednesday</label>
      <label><input type="radio" name="schedule-weekly-option" value="thursday" checked={reportWeekday === 'thursday'}/>Thursday</label>
      <label><input type="radio" name="schedule-weekly-option" value="friday" checked={reportWeekday === 'friday'}/>Friday</label>
      <label><input type="radio" name="schedule-weekly-option" value="saturday" checked={reportWeekday === 'saturday'}/>Saturday</label>
    </fieldset>
  }
}
