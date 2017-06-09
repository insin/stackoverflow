import React from 'react'

let optionData = [];

export default class ContentCountries extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 'Select',
      jsonData: 0
    };
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    var data = {
      name: this.state.value
    }
   console.log(data);
    /*$.ajax({
      type: 'POST',
      url: 'https://google.com',
      data: data
    })*/
  }
  componentDidMount(){
    //ajax request
    /*$.ajax({
      type: 'GET',
      url: 'https://google.com',
      succes: function(data){
        optionData = data;
      }
    })*/
    //static example
    optionData.push('Bangalore');
    optionData.push('Pune');
    this.setState({jsonData: 1});//change the status so the select tag will get the new values(render will happen)
  }
  render() {
    var optionsTag = <option value="">Select City</option>
   if(optionData.length){
     optionsTag = optionData.map((data,index) => {
                          return <option value={data} key={index}>{data}</option>
                          })
   }

    return (
   <form onSubmit={false}>
        <label>
          Please select city:
          <select value={this.state.value} onChange={this.handleChange.bind(this)}>
            { optionsTag}
          </select>
        </label>
        <input type="button" onClick={this.handleSubmit.bind(this)} value="Submit" />
      </form>
    )
  }
}
