import React from 'react';
import { Label, Header } from 'semantic-ui-react';

export default ({ labels }) => {
  return labels.length <= 0 ? null : (
    <div>
      <br />
      <Header as='h3' dividing>文章标签</Header>
      {labels.map(label => (
        <Label 
          key={label.id}
          size='large'
        >
          <Label 
            circular
            style={{
              backgroundColor: '#'+label.color,
              color: '#FFF',
            }}
            size='mini'
            empty
          />
          {' '+label.name}
        </Label>
      ))}
    </div>
  );
}