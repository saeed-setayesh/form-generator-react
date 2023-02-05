import React, { useState } from 'react';
import { validate } from 'email-validator';


interface Access {
  Limited:string;
}
export interface FormField {
  type: string;
  label: string;
  desciption:string;
  required?: boolean;
  options?: string[];
  error?: string;
  pattern?: RegExp;
  access?:Access;
  placeholder?:string;
  max?:string;
}
export interface FormFields {
  [key:string]: FormField | any;
}

interface Props {
  formFields: FormFields;
  onSubmit: (formData: any) => void;
  preFileds:FormFields;
}

const FormGenerator: React.FC<Props> = ({ formFields,preFileds, onSubmit }) => {
  const [formData, setFormData] = useState<FormFields>(preFileds);
  const [submitted, setSubmitted] = useState(false);

  const validateField = (key: string) => {
    let field = formFields[key];
    if (!field.required) return;
    if (!formData[key]) {
      field.error = 'This field is required';
    } else if (field.type === 'email' && !validate(formData[key])) {
      field.error = 'Invalid Email';
    } else if (field.type === 'date' && !(formData[key] instanceof Date)) {
      field.error = 'Invalid date';
    } else if (field.pattern && !field.pattern.test(formData[key])) {
      field.error = 'Invalid Input';
    } else {
      field.error = '';
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    Object.keys(formFields).forEach(key => validateField(key));
    if (Object.values(formFields).every(field => !field.error)) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(formFields).map(([key, field]) => (
        <div className={`divider ${field.type === 'checkbox' ? "flex items-center" : ""}`} key={key}>
          <label>{field.label}:</label>
          {field.type === 'text' && 
            <input placeholder={field.placeholder} disabled={field.access === "Limited" ? true : false} type="text" value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} onBlur={() => validateField(key)} required={field.required} pattern={field.pattern?.source}  title={field.pattern?.source} />
          }
           {field.type === 'textarea' && 
            <textarea placeholder={field.placeholder} disabled={field.access === "Limited" ? true : false}  value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} onBlur={() => validateField(key)} required={field.required}  title={field.pattern?.source} />
          }
          {field.type === 'number' && 
            <input placeholder={field.placeholder} disabled={field.access === "Limited" ? true : false} type="number" value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} onBlur={() => validateField(key)} required={field.required} pattern={field.pattern?.source}  title={field.pattern?.source}/>
          }
          {field.type === 'email' && 
            <input placeholder={field.placeholder} disabled={field.access === "Limited" ? true : false} type="email" value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} onBlur={() => validateField(key)} required={field.required} pattern={field.pattern?.source}  title={field.pattern?.source}/>
          }
          {field.type === 'date' && 
            <input max={field.max} placeholder={field.placeholder} disabled={field.access === "Limited" ? true : false} type="date" value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: new Date(e.target.value).toISOString().slice(0, 10) })} onFocus={() => validateField(key)} required={field.required} pattern={field.pattern?.source}  title={field.pattern?.source}/>
          }

{field.type === 'range' && 
<>
            <input max={field.max} placeholder={field.placeholder} disabled={field.access === "Limited" ? true : false} type="date" value={formData[key + "from"]} onChange={(e) => setFormData({ ...formData, [key + "from"]: new Date(e.target.value).toISOString().slice(0, 10) })} onFocus={() => validateField(key + "from")} required={field.required} pattern={field.pattern?.source}  title={field.pattern?.source}/>
            <input max={field.max} min={formData[key + "from"]} placeholder={field.placeholder} disabled={field.access === "Limited" ? true : false} type="date" value={formData[key + "to"]} onChange={(e) => setFormData({ ...formData, [key + "to"]: new Date(e.target.value).toISOString().slice(0, 10) })} onFocus={() => validateField(key + "to")} required={field.required} pattern={field.pattern?.source}  title={field.pattern?.source}/>
            </>
          }

          {field.type === 'checkbox' && 
            <input placeholder={field.placeholder} disabled={field.access === "Limited" ? true : false} className='w-auto' type="checkbox" checked={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })} onBlur={() => validateField(key)} required={field.required} pattern={field.pattern?.source}  title={field.pattern?.source}/>
          }
          {field.type === 'radio' && 
            <div className='flex'>
              {field.options?.map((option: string) => <label className='flex items-center' key={option}><input placeholder={field.placeholder} disabled={field.access === "Limited" ? true : false} type="radio" value={option} checked={formData[key] === option} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} onBlur={() => validateField(key)} required={field.required} pattern={field.pattern?.source}  title={field.pattern?.source}/>{option}</label>)}
            </div>
          }
          {field.type === 'select' && 
            <select placeholder={field.placeholder} disabled={field.access === "Limited" ? true : false} value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value }as FormFields)} onBlur={() => validateField(key)} required={field.required}  title={field.pattern?.source}>
              {field.options?.map((option: string) => <option key={option} value={option}>{option}</option>)}
            </select>
          }
          <p>{field.desciption}</p>
          {field.error && <div className="error">{field.error}</div>}
        </div>
      ))}
      <div className='flex justify-cneter'>
      <button type="submit" disabled={submitted}>Submit</button>
      </div>
    </form>
  );
};

export default FormGenerator;

