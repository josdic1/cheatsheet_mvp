import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LanguageCheatForm() {
  const { user, createCheat, updateCheat, allCategories } = useAuth()
  const { languageId, cheatId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    notes: '',
    category_id: '',
    language_id: !languageId ? 0 : parseInt(languageId),
    user_id: !user ? 0 : parseInt(user.id),
  })
  const [inEditMode, setInEditMode] = useState(false);

  const language = user?.languages?.find(l => l.id === parseInt(languageId));
  const cheat = language?.cheats?.find(ch => ch.id === parseInt(cheatId));

  useEffect(() => {
    if(cheat?.id) {
      setInEditMode(true)
      setFormData({
        title: cheat.title,
        code: cheat.code,
        notes: cheat.notes,
        category_id: cheat.category_id,
        language_id: !languageId ? 0 : parseInt(languageId),
        user_id: !user ? 0 : parseInt(user.id),
      })
    }
  },[cheat])

  if (!language) return <div>Language not found</div>;
  if (!cheat && inEditMode) return <div>Cheat not found</div>;


// CLEAR FORM //
  const onClear = () => {
    setFormData({
      title: "",
      code: "",
      notes: "",
      category_id: "",
      language_id: "",
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
      category_id: parseInt(formData.category_id),
      language_id: parseInt(languageId),
      user_id: parseInt(user.id),
    };

    const result = await updateCheat(cheatId, payload);
    
    
    if (!result.success) {
      console.error("Failed:", result.error);
      return;
    }
    onClear();
    navigate(`/languages/${languageId}`);
  };


  // CREATING CHEAT //
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      code: formData.code,
      notes: formData.notes,
      category_id: parseInt(formData.category_id),
      language_id: parseInt(languageId),
      user_id: parseInt(user.id),
    };

    const result = await createCheat(payload);
    
    
    if (!result.success) {
      console.error("Failed:", result.error);
      return;
    }
    onClear();
    navigate(`/languages/${languageId}`);
  };

  return (
    <>

    <button onClick={() => navigate(-1)}> Go Back </button>
     <h3>{language.name} Form</h3>
        <div>
            <form onSubmit={inEditMode ? handleUpdate : handleSubmit}>
              <label htmlFor=''> Title </label>
              <input type='text'
                name='title'
                onChange={handleFormData}
                value={formData.title}
                placeholder='Type TITLE here...'
                />

              <label htmlFor=''> Category </label>
              <select name='category_id' onChange={handleFormData} value={formData.category_id}>
                <option value="" disabled>
                    Select a category
                  </option>
                  {allCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
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