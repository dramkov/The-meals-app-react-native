import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = (props) => {
  const renderGridItem = ({ item }) => {
    return (
      <CategoryGridTile
        color={item.color}
        title={item.title}
        onSelect={() => {
          props.navigation.navigate('CategoryMeals', {
            catId: item.id,
          });
        }}
      />
    );
  };

  return (
    <FlatList data={CATEGORIES} numColumns={2} renderItem={renderGridItem} />
  );
};

CategoriesScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: 'black',
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
