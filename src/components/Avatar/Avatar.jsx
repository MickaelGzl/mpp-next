import { useEffect, useState } from 'react'
import styles from './avatar.module.css'

export default function Avatar(props) {
    const [imageUrl, setImageUrl] = useState(null)

    const blob = new Blob([props.avatar], {type: "image/png"})

    useEffect(()=>{
        const objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl)
    }, [])

    function handleClick(){
        props.setAvatarEdition(true)
    }

    return(
        <div 
            className={styles.avatar} style={{
                // backgroundImage: `url(public/icons/logo.svg')`,
                backgroundColor: '#fff',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
            onClick={handleClick}
        >
            {imageUrl && <img src={imageUrl} alt="avatar"/>}
        </div>
    )
}