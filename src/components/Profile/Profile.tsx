import Header from "../Header/Header";
import { AuthContext } from "../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import './Profile.css'
import FormModal from "../FormModal/FormModal";
interface Post{
    userId: string;
    posteAt: string;
    text: string;
    title: string;
    id: string;
}

export default function Profile(){
    const { user, deletePost } = useContext(AuthContext);
    const [posts, setPosts] = useState<Post[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [typeOfModal, setTypeOfModal] = useState('');
    const [id, setId] = useState('');
    useEffect( ()=>{
        GetPosts();
    });
    function setModal(type: string, id: string){
        if(type === 'Edit'){            
            ChangeShowModal();
            console.log(showModal);
            setTypeOfModal('Edit');
            setId(id);
        }
        if(type === 'Create'){            
            ChangeShowModal();     
            setTypeOfModal('Create');
        }
    }
    function ChangeShowModal(){
        setShowModal(!showModal);
    }
    function GetPosts(){
        fetch(`http://localhost:3000/posts?userId=${user.id}`)
        .then(res=> res.json())
        .then( posts => setPosts(posts))
    }
    return(
        <>
            <Header />

            <div className="Postscontainer">
                <div className="post-head">
                    <h2>{'Posts from ' + user.firstName}</h2>                    
                    <button onClick={ () => setModal('Create', '') }>+</button>
                </div>
                { 
                showModal && <FormModal type={typeOfModal} id={id} ChangeShowModal={ChangeShowModal}/>
                }
                <div className="ListContainer">
                    <ul>
                        { 
                            posts.map((post)=>{
                                return(
                                    <li key={post.posteAt}>
                                        <h1 className="post-title">{post.title}</h1>
                                        <p className="post-body">{post.text}</p>
                                        <button onClick={ () => setModal("Edit", post.id) } className="editButton">Edit</button>
                                        <button onClick={() => deletePost(post.id)} className="deleteButton">Delete</button>
                                    </li>
                                )                                
                            })                        
                        }                       
                    </ul>
                </div>
            </div>
        </>
    )
}