import React, { useState } from 'react';

const InputList = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputList, setInputList] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      const uniqueId = Math.floor(1000 + Math.random() * 9000);
      const addObj = {
        id: uniqueId,
        name: inputValue,
      };
      console.log('addObj :>>', addObj);
      setInputList([...inputList, addObj]);
      setInputValue('');
    }
  };

  const handleEdit = (index) => {
    const editedValue = prompt('Enter the new value:');
    if (editedValue !== null && editedValue.trim() !== '') {
      const updatedList = [...inputList];
      updatedList[index] = editedValue;
      setInputList(updatedList);
    }
  };

  const handleDelete = (index) => {
    const updatedList = [...inputList];
    updatedList.splice(index, 1);
    setInputList(updatedList);
  };

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        placeholder='Enter a value'
      />
      <button onClick={handleAdd}>Add</button>
      <pre>{JSON.stringify(inputList, null, 4)}</pre>
      {/* <ul>
        {inputList.map((value, index) => (
          <li key={index}>
            {value}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default InputList;
