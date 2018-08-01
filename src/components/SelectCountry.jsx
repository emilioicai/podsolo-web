import React from "react";
import { Form, FormGroup, Input, Col } from "reactstrap";

export default class SelectContry extends React.Component {
  selectCountry = event => {
    this.props.getTopPodcasts(event.target.value);
    this.props.selectCountry(event.target.value);
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <div>
            {/* <Col xs={7} sm={4} lg={2}> */}
            <Input
              style={{
                width: "auto",
                display: "inline-block",
                marginBottom: "25px",
                marginTop: " 5px"
              }}
              type="select"
              onChange={this.selectCountry}
            >
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
            {/* </Col> */}
          </div>
        </FormGroup>
      </Form>
    );
  }
}
