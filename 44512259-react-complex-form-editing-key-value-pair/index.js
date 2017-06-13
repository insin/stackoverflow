import update from 'immutability-helper'
import React, {Component} from 'react'

export default class App extends Component {
  state = {
    items: [
      {
        name: 'Product Name',
        sku: '00001',
        attributes: {
          width: 'value',
          height: 'value',
          length: 'value',
          color: 'value',
        },
      },
      {
        name: 'Product Name 2',
        sku: '00002',
        attributes: {
          description: 'Hello World',
          weight: '250',
          quantity: '500',
          hello: 'World',
        },
      },
    ]
  }

  handleChange = (e, index) => {
    let {name, value} = e.target
    let updateSpec
    if (name === 'name') {
      updateSpec = {
        [index]: {
          name: {$set: value}
        }
      }
    }
    else {
      updateSpec = {
        [index]: {
          attributes: {
            [name]: {$set: value}
          }
        }
      }
    }
    this.setState({items: update(this.state.items, updateSpec)})
  }

  render() {
    let {items} = this.state
    return <EditForm items={items} onChange={this.handleChange}/>
  }
}

class EditForm extends Component {
  render() {
    return <table className="editcontainer-table">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Attributes</th>
        </tr>
      </thead>
      <tbody>
        {this.props.items && this.props.items.map((item, idx) =>
          <tr key={item.sku}>
            <td className="edit-table">
              <input
                name="name"
                value={item.name}
                onChange={(e) => this.props.onChange(e, idx)}
              />
            </td>
            <td className="edit-table">
              <ul className="item-attributes">
                {Object.keys(item.attributes).map((key) =>
                  <li key={key}>
                    <label>{key}</label>
                    <input
                      name={key}
                      value={item.attributes[key]}
                      onChange={(e) => this.props.onChange(e, idx) }
                    />
                  </li>
                )}
               </ul>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  }
}
