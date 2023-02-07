import React from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import Button from '../../components/Button';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import { parseRawPrice } from './price';
import useFetchHelloFreshBox from '../../hooks/useFetchHelloFreshBox';

const Recipes = () => {
  // This state stores the array of recipes with the changes performed by the customer.
  const [recipes, setRecipes] = React.useState([]);
  const { data, loading } = useFetchHelloFreshBox();
  // These states stores min/max recipe boundaries
  const [minRecipesSelected, setMinRecipesSelected] = React.useState(false);
  const [maxRecipesSelected, setMaxRecipesSelected] = React.useState(false);
  // States for price summary and total price
  const [summary, setSummary] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(parseRawPrice(0));
  // State for infinite loading
  const [loadedRecipes, setLoadedRecipes] = React.useState(6);

  // Updates the array of recipes once the customer add or remove a receipe
  const updateRecipes = (recipe, selected) => {
    const newRecipes = recipes.map((r) => {
      if (r.id === recipe.id) {
        return { ...r, selected: selected };
      }
      return r;
    });
    setRecipes(newRecipes);
  };

  // add recipe button event handler
  const handleAddRecipe = (recipe) => {
    updateRecipes(recipe, recipe.selected + 1);
  };
  // remove recipe button event handler
  const handleRemoveRecipe = (recipe) => {
    updateRecipes(recipe, recipe.selected - 1);
  };
  // load more button event handler
  const handleLoadMore = () => {
    setLoadedRecipes(loadedRecipes + 6 > recipes.length ? recipes.length : loadedRecipes + 6);
  };

  React.useEffect(() => {
    const { recipes: fetchedRecipes } = data;

    if (fetchedRecipes) {
      setRecipes(fetchedRecipes);
    }
  }, [setRecipes, data]);

  React.useEffect(() => {
    // Filter the summary and total price from the array of recipes
    const newSummary = recipes.reduce(
      (result, r) => {
        if (r.selected) {
          let summary = {
            id: r.id,
            name: r.name + (r.selected > 1 && ` x ${r.selected}`),
            price: parseRawPrice((data.baseRecipePrice + r.extraCharge) * r.selected),
          };
          result.filtered.push(summary);
          result.totalPrice += (data.baseRecipePrice + r.extraCharge) * r.selected;
        }
        return result;
      },
      { filtered: [], totalPrice: 0 }
    );
    // Update the summary and total price states
    if (newSummary.filtered.length) {
      // If it has selected recipes, add shipping item at the end of the list
      setSummary([
        ...newSummary.filtered,
        {
          id: 'shipping',
          name: 'Shipping',
          price: parseRawPrice(data.shippingPrice),
        },
      ]);
      // And the shipping price to total price
      setTotalPrice(parseRawPrice(newSummary.totalPrice + data.shippingPrice));
    } else {
      setSummary([]);
      setTotalPrice(parseRawPrice(0));
    }

    // Get the number of selected recipes
    const numOfSelectedRecipes = recipes.reduce(
      (previousValue, currentValue) => previousValue + currentValue.selected,
      0
    );
    // Update the min/max boundaries
    if (numOfSelectedRecipes >= data.min) {
      setMinRecipesSelected(true);
    } else {
      setMinRecipesSelected(false);
    }
    if (numOfSelectedRecipes >= data.max) {
      setMaxRecipesSelected(true);
    } else {
      setMaxRecipesSelected(false);
    }
  }, [recipes, data]);

  if (loading) {
    return null;
  }

  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>{data.headline}</h3>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs" data-testid="text-total-price">
              <h3>{totalPrice}</h3>
            </Box>
            <PriceInfo summary={summary} totalPrice={totalPrice} />
          </Flex>
        </Col>
      </Row>

      <Row data-testid="recipes-list">
        {recipes.slice(0, loadedRecipes).map((recipe) => (
          <Col sm={12} md={6} xl={4} key={recipe.id}>
            <Box mb="md">
              <RecipeCard
                {...recipe}
                handleAddRecipe={() => {
                  handleAddRecipe(recipe);
                }}
                handleRemoveRecipe={() => {
                  handleRemoveRecipe(recipe);
                }}
                minRecipesSelected={minRecipesSelected}
                maxRecipesSelected={maxRecipesSelected}
              />
            </Box>
          </Col>
        ))}
      </Row>

      {loadedRecipes < recipes.length && (
        <Flex justifyContent="center">
          <Button variant="secondary" mb="md" onClick={handleLoadMore} data-testid="button-load-more">
            Load More
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Recipes;
