import React from 'react';
import { Divider, Segment } from 'semantic-ui-react';

export default () => (
  <div>
    <Divider inverted section />
    <Segment textAlign='center' style={{marginBottom: '1em'}}>
      Build with ❤ using React/Redux by ksco.
    </Segment>
    <br />
  </div>
);