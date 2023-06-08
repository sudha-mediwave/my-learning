import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormInput = () => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const getUsers = localStorage.getItem('users');
    if (getUsers) {
      const usersList = JSON.parse(getUsers);
      setUsers(usersList);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      userName: '',
      role: '',
      email: '',
      skill: '',
    },

    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .required('User Name is required'),
      role: Yup.string().required('Role is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('submit values :>>', values);
      // findIndex, slice and push
      if (editingIndex !== null) {
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = { ...values };
        setUsers(updatedUsers);
        setEditingIndex(null);
      } else {
        values['skill'] = [values.skill];
        const newUser = { ...values };
        console.log('newUser :>>', newUser);
        setUsers((prevState) => {
          const addUser = [newUser, ...prevState];
          localStorage.setItem('users', JSON.stringify(addUser));
          return addUser;
        });
      }
      resetForm();
    },
  });

  const handleEdit = (index) => {
    const userToEdit = users[index];
    formik.setValues(userToEdit);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className='form_main_block'>
      <form className='form_section' onSubmit={formik.handleSubmit}>
        <label htmlFor='userName'>User Name:</label>
        <input
          type='text'
          id='userName'
          {...formik.getFieldProps('userName')}
        />
        {formik.touched.userName && formik.errors.userName && (
          <div className='error'>{formik.errors.userName}</div>
        )}

        <label htmlFor='role'>Role:</label>
        <select id='role' {...formik.getFieldProps('role')}>
          <option value=''>Select Role</option>
          <option value='Admin'>Admin</option>
          <option value='Front-End Developer'>Front-End Developer</option>
          <option value='Back-End Developer'>Back-End Developer</option>
          <option value='Devops Engineer'>Devops Engineer</option>
          <option value='Project Support'>Project Support</option>
        </select>
        {formik.touched.role && formik.errors.role && (
          <div className='error'>{formik.errors.role}</div>
        )}

        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email && (
          <div className='error'>{formik.errors.email}</div>
        )}

        <label htmlFor='skill'>Skills:</label>
        <input type='text' id='skill' {...formik.getFieldProps('skill')} />
        {formik.touched.skill && formik.errors.skill && (
          <div className='error'>{formik.errors.skill}</div>
        )}

        <button type='submit'>Submit</button>
      </form>
      <pre>{JSON.stringify(users, null, 4)}</pre>
      <div>
        <h3>Users List: {users.length}</h3>
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Skill</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className='user_list'>{user.userName}</td>
                  <td className='user_list'>{user.role}</td>
                  <td className='user_list'>{user.email}</td>
                  <td className='user_list'>{user.skill}</td>

                  <td className='btn_align'>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default FormInput;
