import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CategoryCheatForm() {
  const { user, createCheat, updateCheat, allLanguages } = useAuth()
      const { categoryId, cheatId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    notes: '',
    language_id: '',
    category_id: !categoryId ? 0 : parseInt(categoryId),
    user_id: !user ? 0 : parseInt(user.id),
  })
    const [inEditMode, setInEditMode] = useState(false);

      const category = user?.categories?.find(c => c.id === parseInt(categoryId));
      const cheat = category?.cheats?.find(ch => ch.id === parseInt(cheatId));

        if (!category) return <div>Category not found</div>;
        if (!cheat && inEditMode) return <div>Cheat not found</div>;
      
      useEffect(() => {
        if(cheat?.id) {
          setInEditMode(true)
          setFormData({
                title: cheat.title,
    code: cheat.code,
    notes: cheat.notes,
    language_id: cheat.language_id,
    category_id: !categoryId ? 0 : parseInt(categoryId),
    user_id: !user ? 0 : parseInt(user.id),
          })
        }
      },[cheat])


// CLEAR FORM //
  const onClear = () => {
    setFormData({
      title: "",
      code: "",
      notes: "",
      category_id: "",
      user_id: ""
    });
  };

// FORM INPUTS //
    const handleFormData = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

// UPDATING CHEAT //
 const handleUpdate = async (e) => {
    e.preventDefault();
    
    const payload = {
      id: parseInt(cheatId),
      title: formData.title,
      code: formData.code,
      notes: formData.notes,
      language_id: parseInt(formData.language_id),
      category_id: parseInt(categoryId),
      user_id: parseInt(user.id),
    };

    const result = await updateCheat(cheatId, payload);
    
    
    if (!result.success) {
      console.error("Failed:", result.error);
      return;
    }
    onClear();
    navigate(`/categories/${categoryId}`);
  };


  // CREATING CHEAT //
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      code: formData.code,
      notes: formData.notes,
      language_id: parseInt(formData.language_id),
      category_id: parseInt(categoryId),
      user_id: parseInt(user.id),
    };

    const result = await createCheat(payload);
    
    
    if (!result.success) {
      console.error("Failed:", result.error);
      return;
    }
    onClear();
    navigate(`/categories/${categoryId}`);
  };

  return (
    <>

    <button onClick={() => navigate(-1)}> Go Back </button>
     <h3>{category.name} Form</h3>
        <div>
            <form onSubmit={inEditMode ? handleUpdate : handleSubmit}>
              <label htmlFor=''> Title </label>
              <input type='text'
                name='title'
                onChange={handleFormData}
                value={formData.title}
                placeholder='Type TITLE here...'
                />

              <label htmlFor=''> Language </label>
              <select name='language_id' onChange={handleFormData} value={formData.language_id}>
                <option value="" disabled>
                    Select a language
                  </option>
                  {allLanguages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
                  </select>
              <label htmlFor=''> Code </label>
              <textarea
                name='code'
                onChange={handleFormData}
                value={formData.code}
                placeholder='Type CODE here...'
                />
                <textarea
                name='notes'
                onChange={handleFormData}
                value={formData.notes}
                placeholder='Type NOTES here... (optional)'
                />
                <div>
                  <button type='submit'>{inEditMode ? 'Update!' : 'Create!'}</button>
                  <button type='button' onClick={onClear}> Clear Form </button>
                </div>
            </form>
        </div>


 
    </>
  )
}
