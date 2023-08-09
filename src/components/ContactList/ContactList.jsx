import React from 'react';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deleteContact }) => {
  // console.log(contacts);
  if (contacts !== undefined) {
    return (
      <ul>
        {contacts.map(({ id, name, number }, index) => (
          <li key={id}>
            {name}:&nbsp;
            {number}
            <button type="button" onClick={() => deleteContact(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
};

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
export default ContactList;
