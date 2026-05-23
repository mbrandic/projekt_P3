import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookListScreen from './screens/BookListScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import AddEditBookScreen from './screens/AddEditBookScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BookList"
          component={BookListScreen}
          options={{ title: 'Books' }}
        />

        <Stack.Screen
          name="BookDetails"
          component={BookDetailsScreen}
          options={{ title: 'Book Details' }}
        />

        <Stack.Screen
          name="AddEditBook"
          component={AddEditBookScreen}
          options={{ title: 'Add / Edit Book' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}