import React from 'react';
import { Label } from 'semantic-ui-react';
import { Link } from 'redux-little-router';

export default ({ label }) => (
  <Link
    href={`/tags/${label.name}`}
  >
    <Label
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
      {` ${label.name}`}
    </Label> {' '}
  </Link>
);