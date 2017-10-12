import React from 'react';
import { Header } from 'semantic-ui-react';
import Label from './Label';

export default ({ labels }) => {
  return labels.length <= 0 ? null : (
    <div>
      <br />
      <Header as='h3' dividing>文章标签</Header>
      {labels.map(label => (
        <Label 
          key={label.id}
          label={label}
        />
      ))}
    </div>
  );
}