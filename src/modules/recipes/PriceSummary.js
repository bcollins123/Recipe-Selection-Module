import React from 'react';
import styled from 'styled-components';
import Box from '../../components/Box';
import Flex from '../../components/Flex';
import List, { ListItem } from '../../components/List';
import Text from '../../components/Text';

const StyledListItem = styled(ListItem)`
  border-top-width: 1px;
  border-top-color: #e4e4e4;
  border-top-style: solid;
  padding-top: 8px;
  font-weight: 600;
`;

// Create PriceSummary user interface
const PriceSummary = ({ summary, totalPrice }) => (
  <Box width={['290px', '450px']}>
    <List padding={3} data-testid="price-summary-list">
      {summary.length ? (
        <>
          {summary.map((recipe) => (
            <ListItem key={recipe.id}>
              <Flex justifyContent="space-between" marginBottom={2}>
                <Text>{recipe.name}</Text>
                <Text>{recipe.price}</Text>
              </Flex>
            </ListItem>
          ))}
          <StyledListItem key="total">
            <Flex justifyContent="space-between">
              <Text>Total</Text>
              <Text data-testid="total-price">{totalPrice}</Text>
            </Flex>
          </StyledListItem>
        </>
      ) : (
        <ListItem key="no-recipes">
          <Text>No recipes selected.</Text>
        </ListItem>
      )}
    </List>
  </Box>
);

export default PriceSummary;
