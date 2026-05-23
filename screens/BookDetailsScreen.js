import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

export default function BookDetailsScreen({ route }) {
  const { book } = route.params;

  return (
    <View style={styles.container}>
      {/* HERO CARD */}
      <View style={styles.heroCard}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: book.available ? '#16a34a' : '#dc2626',
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {book.available ? 'Available' : 'Not available'}
          </Text>
        </View>
      </View>

      {/* BOOK DETAILS = PLAVA */}
      <View style={styles.bookCard}>
        <Text style={styles.bookTitleSection}>Book Details</Text>

        <View style={styles.row}>
          <Text style={styles.bookLabel}>ISBN</Text>
          <Text style={styles.bookValue}>{book.isbn}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bookLabel}>Year</Text>
          <Text style={styles.bookValue}>{book.publishedyear}</Text>
        </View>
      </View>

      {/* SYSTEM INFO = SIVA */}
      <View style={styles.systemCard}>
        <Text style={styles.systemTitle}>System Info</Text>

        <Text style={styles.systemText}>
          Created: {formatDate(book.created_at)}
        </Text>

        <Text style={styles.systemText}>
          Last modified: {formatDate(book.modified_at)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  heroCard: {
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: 'white',
    marginBottom: 6,
  },

  author: {
    color: '#d1d5db',
    marginBottom: 12,
    fontSize: 16,
  },

  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
  },

  badgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  /* BOOK DETAILS = plava */
  bookCard: {
    backgroundColor: '#eef2ff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },

  bookTitleSection: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111827',
  },

  bookLabel: {
    color: '#4b5563',
    fontWeight: '500',
  },

  bookValue: {
    color: '#111827',
    fontWeight: '700',
  },

  /* SYSTEM INFO = siva */
  systemCard: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  systemTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111827',
  },

  systemText: {
    color: '#374151',
    marginBottom: 6,
  },
});