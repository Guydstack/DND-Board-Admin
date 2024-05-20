import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

function FilterButtonGroup({ buttons, onClick, activeFilter }) {
  return (
    <ButtonGroup>
      {buttons.map((btn) => (
        <Button
          key={btn.id}
          variant={activeFilter === btn.id ? 'solid' : 'outline'}
          onClick={() => onClick(btn.id)}
          colorScheme={btn.color}
        >
          {btn.name}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default FilterButtonGroup;
