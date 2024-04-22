import React, { Component } from 'react';
import UploadForm from './items/UploadForm'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
       <p>Here you can upload your file.csv </p>
       <UploadForm/>
      </div>
    );
  }
}
