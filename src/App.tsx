import React,{useState,useEffect} from 'react';
import FormGenerator from './components/form-generator';
import { FormFields } from './components/form-generator';

function App() {



  const [data,setData] = useState({
    name:"saeed",
    age: "2",
    ask: "test1",
    email: "iamsaeedsetayesh@gmail.com",
    gender: "female",
    terms:true
  })

  const [formFields,setFormFields] = useState<FormFields>(
    {
      name: {
        type: 'text',
        label: 'Name',
        required: true,
        pattern: /^[a-zA-Z]+$/,
        desciption:"please enter your name",
        access:"Limited"
      },
      email: {
        type: 'email',
        label: 'Email',
        required: true,
      },
      age: {
        type: 'number',
        label: 'Age',
        required: true,
      },
      gender: {
        type: 'select',
        label: 'Gender',
        options: ['male', 'female'],
      },
      ask: {
        type: 'radio',
        label: 'Which One of This?',
        options: ['Coffee', 'Tea'],
      },
      date: {
        type: 'date',
        label: 'Year',
      },
      range: {
        type: 'range',
        label: 'Range',
      },
      terms: {
        type: 'checkbox',
        label: 'I accept the terms and conditions',
        required: true,
      },
      what: {
        type: 'textarea',
        label: 'TextArea',
        required: true,
        pattern: /^[a-zA-Z]+$/,
        desciption:"please enter your name",
        placeholder:"this is a test"
      },

    }
  )

  useEffect(()=>{
    // You Can Fetch Data here and Fill the Data or Create Your Form
    // setData()
    // setFormFields()
  },[])


  const submit = (value:FormFields | any) =>{
    setData(value)

    // You Can Submit Your Data Here
  }
  return (
    <div className="container">
      <FormGenerator preFileds={data} onSubmit={submit} formFields={formFields}/>

    <div className='flex code-section'>
      <code>
        <p>Input:</p>
        {JSON.stringify(formFields, null, 4)}
        </code>
        <code>
          <p>Output:</p>
        {JSON.stringify(data, null, 4)}
        </code>
        </div>
    </div>
  );
}

export default App;
