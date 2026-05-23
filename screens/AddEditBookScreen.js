import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';

const API_URL = 'https://zencuatkidebnlyupztm.supabase.co/rest/v1/books';
const API_KEY = 'sb_publishable_K6jc9Xah7PrH-YuS_xhjUw_rgGKQqHu';

const formatDate = (d) => {
  if (!d) return '-';
  const date = new Date(d);
  return date.toLocaleString('hr-HR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function AddEditBookScreen({ route, navigation }) {
  const book = route.params?.book;

  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [isbn, setIsbn] = useState(book?.isbn || '');
  const [publishedyear, setPublishedyear] = useState(
    book ? String(book.publishedyear) : ''
  );
  const [available, setAvailable] = useState(book?.available || false);

  const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };

  const saveBook = async () => {
    if (!title.trim()) {
      Alert.alert('Required field', 'Title is required.');
      return;
    }

    const payload = {
      title,
      author,
      isbn,
      publishedyear: Number(publishedyear),
      available,
      modified_at: new Date().toISOString(),
    };

    try {
      if (book) {
        await fetch(`${API_URL}?id=eq.${book.id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            ...payload,
            created_at: new Date().toISOString(),
          }),
        });
      }

      navigation.goBack();
    } catch (e) {
      Alert.alert('Error saving book');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {book ? 'Edit Book' : 'Add Book'}
      </Text>

      <Text style={styles.label}>
        Title <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Author</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Enter author"
      />

      <Text style={styles.label}>ISBN</Text>
      <TextInput
        style={styles.input}
        value={isbn}
        onChangeText={setIsbn}
        placeholder="Enter ISBN"
      />

      <Text style={styles.label}>Year</Text>
      <TextInput
        style={styles.input}
        value={publishedyear}
        onChangeText={setPublishedyear}
        keyboardType="numeric"
        placeholder="Enter year"
      />

      <View style={styles.row}>
        <Text style={styles.label}>Available</Text>
        <Switch value={available} onValueChange={setAvailable} />
      </View>

      {book && (
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Book Info</Text>

          <Text style={styles.infoText}>
            Created: {formatDate(book.created_at)}
          </Text>

          <Text style={styles.infoText}>
            Last modified: {formatDate(book.modified_at)}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.saveBtn} onPress={saveBook}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
    marginTop: 4,
  },

  required: {
    color: '#dc2626',
  },

  input: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },

  infoCard: {
    marginTop: 20,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#eef2ff',
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },

  infoTitle: {
    fontWeight: '700',
    marginBottom: 6,
  },

  infoText: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 4,
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 12,
  },

  saveText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});