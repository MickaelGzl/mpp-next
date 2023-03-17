import { useEffect, useState } from 'react'
import styles from './avatar.module.css'

export default function Avatar(props) {
    const [imageUrl, setImageUrl] = useState(null)
    const blob = new Blob([Buffer.from(props.avatar)], {type: 'image/png'})
    console.log(blob)


    useEffect(()=>{
        const objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl)
    },[])


    function handleClick(){
        props.setAvatarEdition(true)
    }

    return(
        <div 
            className={styles.avatar} style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundColor: '#fff',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
            onClick={handleClick}
        >
        </div>
    )
}