// import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// const FormInput = () => {
//   const [users, setUsers] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [role, setRole] = useState('');
//   const [email, setEmail] = useState('');
//   const [skill, setSkill] = useState(['']);
//   const [editingIndex, setEditingIndex] = useState(null);
//   useEffect(() => {
//     // Load data from local storage on component mount
//     const storedUsers = localStorage.getItem('users');
//     if (storedUsers) {
//       setUsers(JSON.parse(storedUsers));
//     }
//   }, []);

//   useEffect(() => {
//     // Update local storage whenever users array changes
//     localStorage.setItem('users', JSON.stringify(users));
//   }, [users]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userName && role && email && skill) {
//       if (editingIndex !== null) {
//         // Update existing user
//         const updatedUsers = [...users];
//         updatedUsers[editingIndex] = { userName, role, email, skill };
//         setUsers(updatedUsers);
//         setEditingIndex(null);
//       } else {
//         // Add new user
//         const newUser = { userName, role, email, skill };
//         setUsers([...users, newUser]);
//       }
//       setUserName('');
//       setRole('');
//       setEmail('');
//       setSkill('');
//     }
//   };
//   const handleEdit = (index) => {
//     const userToEdit = users[index];
//     setUserName(userToEdit.userName);
//     setRole(userToEdit.role);
//     setEmail(userToEdit.email);
//     setEditingIndex(index);
//   };
//   const handleDelete = (index) => {
//     const updatedUsers = users.filter((_, i) => i !== index);
//     setUsers(updatedUsers);
//   };

//   const initialValues = {
//     userName: '',
//     role: '',
//     email: '',
//     skill: '',
//   };
//   const validateForm = (values) => {
//     const errors = {};

//     if (!values.userName) {
//       errors.userName = 'User Name is required';
//     }

//     if (!values.role) {
//       errors.role = 'Role is required';
//     }

//     if (!values.email) {
//       errors.email = 'Email is required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//       errors.email = 'Invalid email address';
//     }

//     if (!values.skill) {
//       errors.skill = 'Skill is required';
//     }

//     return errors;
//   };
//   return (
//     <div className='form_main_block'>
//       <Formik
//         initialValues={initialValues}
//         validate={validateForm}
//         onSubmit={handleSubmit}
//       >
//         <form className='form_section' onSubmit={handleSubmit}>
//           <label htmlFor='userName'>User Name:</label>
//           <input
//             type='text'
//             id='userName'
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <ErrorMessage name='userName' component='div' />
//           <label htmlFor='role'>Role:</label>
//           <select
//             id='role'
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <ErrorMessage name='roll' component='div' />
//             <option value=''>Select Role</option>
//             <option value='Admin'>Admin</option>
//             <option value='Front-End Developer'>Front-End Developer</option>
//             <option value='User' User>
//               Back-End Developer
//             </option>
//             <option value='User'>Devops Engineer</option>
//             <option value='User'>Project Support</option>
//           </select>

//           <label htmlFor='email'>Email:</label>
//           <input
//             type='email'
//             id='email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <ErrorMessage name='email' component='div' />
//           <label htmlFor='skill'>Skills:</label>
//           <input
//             type='text'
//             id='skill'
//             value={skill}
//             onChange={(e) => setSkill(e.target.value)}
//           />
//           <button type='submit'>Submit</button>
//         </form>
//       </Formik>
//       <pre>{JSON.stringify(users, null, 4)}</pre>
//       <div>
//         <h3>Users List:</h3>
//         {users.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>User Name</th>
//                 <th>Role</th>
//                 <th>Email</th>
//                 <th>Skill</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={index}>
//                   <td className='user_list'>{user.userName}</td>
//                   <td className='user_list'>{user.role}</td>
//                   <td className='user_list'>{user.email}</td>
//                   <td className='user_list'>{user.skill}</td>

//                   <td className='btn_align'>
//                     <button onClick={() => handleEdit(index)}>Edit</button>
//                     <button onClick={() => handleDelete(index)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No users found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormInput;
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormInput = () => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Load data from local storage on component mount
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever users array changes
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const formik = useFormik({
    initialValues: {
      userName: '',
      role: '',
      email: '',
      skill: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('User Name is required'),
      role: Yup.string().required('Role is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      skill: Yup.string().required('Skill is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingIndex !== null) {
        // Update existing user
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = { ...values };
        setUsers(updatedUsers);
        setEditingIndex(null);
      } else {
        // Add new user
        const newUser = { ...values };
        setUsers([...users, newUser]);
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
        <h3>Users List:</h3>
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
