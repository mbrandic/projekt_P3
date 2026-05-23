import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const API_URL = 'https://zencuatkidebnlyupztm.supabase.co/rest/v1/books';

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplbmN1YXRraWRlYm5seXVwenRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjQ4MDAsImV4cCI6MjA5MzkwMDgwMH0.NwhlyWxQdTH9NDVMjTFmhf3kqYmvc3RwdL-pLbKrz9U';

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };

  const getBooks = async () => {
    try {
      const res = await fetch(`${API_URL}?select=*`, {
        headers,
      });

      const data = await res.json();

      console.log('BOOKS:', data);

      setBooks(data);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Cannot load books');
    }
  };

  const deleteBook = async (id) => {
    try {
      console.log('Deleting ID:', id);

      const res = await fetch(
        `${API_URL}?id=eq.${id}`,
        {
          method: 'DELETE',
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
        }
      );

      console.log('STATUS:', res.status);

      const text = await res.text();

      console.log('RESPONSE:', text);

      if (res.ok) {
        Alert.alert('Success', 'Book deleted');

        getBooks();
      } else {
        Alert.alert('Delete failed', text);
      }
    } catch (error) {
      console.log(error);

      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', getBooks);

    return unsub;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.author}>by {item.author}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>ISBN: {item.isbn}</Text>

        <Text style={styles.meta}>
          Year: {item.publishedyear}
        </Text>
      </View>

      <View
        style={[
          styles.badge,
          {
            backgroundColor: item.available
              ? '#16a34a'
              : '#dc2626',
          },
        ]}
      >
        <Text style={styles.badgeText}>
          {item.available ? 'Available' : 'Not available'}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.detailsBtn}
          onPress={() =>
            navigation.navigate('BookDetails', {
              book: item,
            })
          }
        >
          <Text style={styles.btnText}>Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate('AddEditBook', {
              book: item,
            })
          }
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={async () => {
            console.log('BUTTON PRESSED');

            await deleteBook(item.id);
          }}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Library</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddEditBook')}
      >
        <Text style={styles.addText}>+ Add Book</Text>
      </TouchableOpacity>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  header: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
  },

  addBtn: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },

  addText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  author: {
    color: '#6b7280',
    marginBottom: 10,
    marginTop: 4,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  meta: {
    fontSize: 13,
    color: '#374151',
  },

  badge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },

  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  detailsBtn: {
    backgroundColor: '#111827',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    minWidth: 90,
    alignItems: 'center',
  },

  editBtn: {
    backgroundColor: '#f59e0b',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    minWidth: 90,
    alignItems: 'center',
  },

  deleteBtn: {
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    minWidth: 90,
    alignItems: 'center',
  },

  btnText: {
    color: 'white',
    fontWeight: '600',
  },
});