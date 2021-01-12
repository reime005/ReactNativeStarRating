import React from 'react';
import { FlatList } from 'react-native';
import Book, { IBook, IToggleProps } from './Book';

const data: IBook[] = [
  {
    author: 'Matt Haig',
    title: 'The Midnight Library',
    rating: 4.24,
    source: require('../../assets/images/book-1.jpg'),
  },
  {
    author: 'Fredrik Backman',
    title: 'Anxious People',
    rating: 4.31,
    source: require('../../assets/images/book-3.jpg'),
  },
  {
    author: 'Kiley Reid',
    title: 'Such a Fun Age',
    rating: 2.75,
    source: require('../../assets/images/book-4.jpg'),
  },
  {
    author: 'Jeanine Cummins',
    title: 'American Dirt',
    rating: 4.32,
    source: require('../../assets/images/book-2.jpg'),
  },
  {
    author: 'Fredrik Backman',
    title: 'Anxious People',
    rating: 4.31,
    source: require('../../assets/images/book-3.jpg'),
  },
  {
    author: 'Kiley Reid',
    title: 'Such a Fun Age',
    rating: 2.75,
    source: require('../../assets/images/book-4.jpg'),
  },
  {
    author: 'Matt Haig',
    title: 'The Midnight Library',
    rating: 4.24,
    source: require('../../assets/images/book-1.jpg'),
  },
  {
    author: 'Fredrik Backman',
    title: 'Anxious People',
    rating: 4.31,
    source: require('../../assets/images/book-3.jpg'),
  },
];

const BookList = (props: IToggleProps) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      numColumns={2}
      data={data}
      keyExtractor={(p) => p.title}
      renderItem={({ item }) => <Book {...item} {...props} />}
    />
  );
};

export default BookList;
