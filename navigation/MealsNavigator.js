import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultNavigatorOptions from '../components/DefaultNavigatorOptions';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();
const StackFav = createStackNavigator();
const StackFilter = createStackNavigator();
const Tab =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MealsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={DefaultNavigatorOptions}>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={({ navigation }) => {
          return {
            title: 'Meal Categories',
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => {
          const selectedCategory = CATEGORIES.find(
            (cat) => cat.id === route.params.catId
          );
          return { title: selectedCategory.title };
        }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => {
          const mealTitle = route.params.mealTitle;
          const toggleFavorite = route.params.toggleFav;
          const isFavorite = route.params.isFav;

          return {
            title: mealTitle,
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Favorite"
                  iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                  onPress={toggleFavorite}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

const getNavigationOptions = () => {
  if (Platform.OS === 'android') {
    //Props for the android navigator
    return {
      activeColor: 'white',
      shifting: true,
    };
  }
  //Props for any other OS navigator
  return {
    tabBarOptions: { activeTintColor: Colors.accentColor },
  };
};

const favoritesNavigator = () => {
  return (
    <StackFav.Navigator screenOptions={DefaultNavigatorOptions}>
      <StackFav.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({ navigation }) => {
          return {
            title: 'Your Favorites',
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <StackFav.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => {
          const mealTitle = route.params.mealTitle;
          const toggleFavorite = route.params.toggleFav;
          const isFavorite = route.params.isFav;
          return {
            title: mealTitle,
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Favorite"
                  iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                  onPress={toggleFavorite}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </StackFav.Navigator>
  );
};

const MealsFavTabNavigator = () => {
  return (
    <Tab.Navigator {...getNavigationOptions()}>
      <Tab.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="ios-restaurant" size={25} color={color} />;
          },
          tabBarColor: Colors.primaryColor,
          labelStyle: {
            fontFamily: 'open-sans-bold',
          },
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
            ) : (
              'Meals'
            ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={favoritesNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="ios-star" size={25} color={color} />;
          },
          tabBarColor: Colors.accentColor,
          labelStyle: {
            fontFamily: 'open-sans-bold',
          },
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
            ) : (
              'Favorites'
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const FiltersNavigator = () => {
  return (
    <StackFilter.Navigator screenOptions={DefaultNavigatorOptions}>
      <StackFilter.Screen
        name="Filters"
        component={FiltersScreen}
        options={({ navigation, route }) => {
          return {
            title: 'Filter Meals',
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Save"
                  iconName="ios-save"
                  onPress={route.params?.save ?? 'defaultValue'}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </StackFilter.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: Colors.accentColor,
          labelStyle: {
            fontFamily: 'open-sans-bold',
          },
        }}
      >
        <Drawer.Screen
          name="MealsFav"
          component={MealsFavTabNavigator}
          options={{ title: 'Meals' }}
        />
        <Drawer.Screen
          name="Filters"
          component={FiltersNavigator}
          options={{ title: 'Filters' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
