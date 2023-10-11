import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Container, FormInput, SubmitButton } from './ContactForm.styled';

export default function ContactForm({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contacts.some((contact) => contact.text.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      setName('');
      setNumber('');
    } else {
      onSubmit(name, number);
      setName('');
      setNumber('');
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormInput>
          Name
          <br />
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            id={nanoid()}
            value={name}
            onChange={handleChange}
            required
          />
        </FormInput>
        <br />
        <FormInput>
          Number
          <br />
          <input
            type="tel"
            placeholder="Enter number"
            name="number"
            id={nanoid()}
            value={number}
            onChange={handleChange}
            required
          />
        </FormInput>
        <br />
        <SubmitButton type="submit">Add contact</SubmitButton>
      </form>
    </Container>
  );
}