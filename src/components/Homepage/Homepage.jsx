import { useState, useContext,useRef } from "react";
import { MessageData } from '@/context/MsgContext';
import { v4 as uuidv4 } from "uuid";

import Avatar from "../Avatar/Avatar";
import Navbar from "../Navbar/Navbar";

import styles from "./Homepage.module.css";

export default function Homepage(props) {
  const  {infoMessage, setInfoMessage} = useContext(MessageData)
  
  let path = "backgrounds/bg01.jpg";
  const [avatarEdition, setAvatarEdition] = useState(false)
  const [avatarForm, setAvatarForm] = useState('')
  const image = useRef(null)

  function getExtension(filename){
    const parts = filename.split('.');
    const extention = parts[parts.length - 1];
    switch(extention.toUpperCase()){
      case 'JPG':
      case 'JPEG':
      case 'PNG': 
      case 'SVG':
      case 'JFIF':
      case 'BMP':
        return true
      default:
        return false
    }
  }



  async function handleSubmitAvatar(e){
    e.preventDefault();
    const verification = getExtension(avatarForm);
    if(!verification){
      setInfoMessage("Format d'image invalide")
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async() =>{
      const blob = new Blob([fileReader.result], {type: 'image/png'})
      const response = await fetch('api/updateAvatar', {
        method: 'PUT',
        body: JSON.stringify({avatar: blob, id: props.id})
      })
      const data = await response.json();
      setInfoMessage(data.message)

      setAvatarEdition(false)
      setAvatarForm('')
    }
  }



  function handleChange(e){
    setAvatarForm(e.target.value)
    console.log(image.current.files)

  }

  return (
    <>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${path})`,
        }}
      >
        <Avatar setAvatarEdition={setAvatarEdition} avatar={props.avatar}/>
        {avatarEdition && 
            <form className={styles.formAvatar} onSubmit={(e) => handleSubmitAvatar(e)}>
              <span>Modifie ton Avatar</span>
              <p>
                Le fichier sera convertit au format 64x64px
              </p>
              <label htmlFor="file-input" className={styles.dropContainer}>
                <span>Drop files here</span>
                or
                <input type="file" name="image" accept="image/*" required className={styles.avatarFileInput} value={avatarForm} onChange={(e) => handleChange(e)} ref={image}/>
                <button className={styles.submitAvatar}>Valider</button>
              </label>
            </form>

        }
      </div>
      <Navbar page={"homepage"} />
    </>
  );
}
