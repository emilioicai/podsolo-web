import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default class SelectContry extends React.Component {
  selectCountry = event => {
    this.props.getTopPodcasts(event.target.value);
    this.props.selectCountry(event.target.value);
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Input type="select" onChange={this.selectCountry}>
            {this.props.countries.map(country => {
              return (
                <option
                  value={country.code}
                  selected={country.code === this.props.selectedCountry}
                >
                  {country.name}
                </option>
              );
            })}
          </Input>
        </FormGroup>
      </Form>
    );
  }
}
