import React from 'react';
import { Divider, Label, Header } from 'semantic-ui-react';

export default ({ labels }) => {
  return labels.length <= 0 ? null : (
    <div>
      <br />
      <Header as='h3' dividing>文章标签</Header>
      {labels.map(label => (
        <Label key={label.id} style={{backgroundColor: '#'+label.color, color: '#FFF'}}>
          {label.name}
        </Label>
      ))}
    </div>
  );
}