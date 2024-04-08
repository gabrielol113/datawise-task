import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/UserContext";
import './FormModal.css'
import { useNavigate } from "react-router-dom";
type ModalData = {
    type: string;
    id?: string;
    ChangeShowModal: ()=> void;
}

export default function FormModal({ChangeShowModal, type, id: postId}: ModalData){
    const nav = useNavigate();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const { user, createPost, editPost } = useContext(AuthContext);
    async function GetPostById(id: string){
        await fetch(`http://localhost:3000/posts/${id}`)
        .then(res=> res.json())
        .then( post => {
            setTitle(post.title);
            setText(post.text)
        })
    }
    useEffect(()=>{
        GetPostById(postId as string);
    },[type, postId]) ; 
    function GetDate(){
        const year = new Date().getFullYear();
        const day = new Date().getDay();
        const month = new Date().getMonth();
        const hour = new Date().getHours();
        const time = `${year}-${month}-${day}T${hour}:00:00`;
        return time;
    }
    function handleCreatePost() {
        const {id} = user!;
        const userId: string = id!;
        const postedAt = GetDate();
        const data = {
            userId,
            title,
            text,            
            postedAt
        }
        createPost(data);
        ChangeShowModal();
        nav('/profile');
    }
    function handleEditPost(){
        const {id} = user!;
        const userId: string = id!;
        const postedAt = GetDate();
        const data = {
            id: postId,
            userId,
            title: title,
            text: text,            
            postedAt
        }
        editPost(data);
        ChangeShowModal();
        nav('/profile');
    }
    if(type === 'Edit'){              
        return(
            <div className="modalContainer">
                <h2>Edit Modal</h2>              
                    
                <div className="inputContainer">
                <label>Title</label>
                <input 
                        type="text" 
                        name="title" 
                        value={title}
                        onChange={ ev => setTitle(ev.target.value)  }
                    />  
                </div>
                <div className="inputContainer">
                    <label>Text</label>
                    <input 
                        type="text" 
                        name="text" 
                        value={text}
                        onChange={ ev => setText(ev.target.value) }
                    />
                </div>                  
                <button className="formButton" onClick={ handleEditPost }>Save</button> 
            </div>
        )
    }
    else if(type === 'Create'){
        return(
            <div className="modalContainer">
                <h2>Create Modal</h2>   
                <div className="inputContainer">
                    <label>Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={title}
                        onChange={ ev => setTitle(ev.target.value) }
                    />   
                </div> 
                <div className="inputContainer">
                    <label>Text</label>
                    <input 
                        type="text" 
                        name="text" 
                        value={text}
                        onChange={ ev => setText(ev.target.value) }
                    />
                </div>   
                <button className="formButton" onClick={ handleCreatePost }>Send</button>    
            </div>
        )
    }
    else return null;
}