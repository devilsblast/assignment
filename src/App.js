  import logo from './logo.svg';
  import './App.css';
  import { useContext, useEffect, useState } from 'react';
  import { FaEdit } from "react-icons/fa";
  import Pagination from './components/Pagination';
  import {MdDelete} from "react-icons/md";
  import  { Context } from "./user"

  function App() {
  const {getUsers,getLength,getsingledelete,getsearch,addcheck,addcheckall,delchecked,updatedmain}= useContext(Context);
    const [page, setPage]= useState(1);
    const [count,setCount]= useState(new Set());
    const [gettotal,setGettotal]= useState(getLength());
    const [issc,setIssc] = useState(-1);
    const [name, setName] = useState("");
    const [limit, setLimit]= useState(10);
    const [users, setUsers] = useState([]);
    const [temp,setTemp]=useState(getUsers(page ,limit));
    const [dele,setDele] = useState(0);
  const [updateState,setUpdateState] = useState(-1);
    const [search, setSearch] = useState("");
    const [input, setInput] = useState('');
    const[ totalPage,setTotalPage] = useState(Math.ceil(getLength()/limit));
    useEffect(() => {
    if(search!==''){
      setUsers(getsearch(input,1,limit));
    }else{
      setUsers(getUsers(page,limit));
      setTotalPage(Math.ceil(getLength()/limit));
    setGettotal(getLength());
      if(dele===1 && page!==1 && page===totalPage){
        setPage(totalPage-1);
        setDele(0);
        setSearch(true);
        }
    setDele(0);
    setIssc(-1);
      }
    },[page,dele,issc,search]);

  const deletecheck = () =>{


  setDele(1);
    delchecked(page,limit);
    setCount(new Set());

  
  };

  function singledelete(id){
    setDele(1);
    const newset = new Set(count);
    newset.delete(id);
    setCount(newset);
  setUsers( getsingledelete(id,page,limit));


  }
    const handleInput = (e) =>{
      setInput(e.target.value);
    }

    const handleSubmit = (e) =>{
      
      if(input!==''){
        setSearch(input);
      setUsers(getsearch(input,1,10));
    setTotalPage(Math.ceil(users.length/limit));
    
    }else{
      setSearch("");
      setUsers(getUsers(page,limit));
    
      setTotalPage(Math.ceil(getLength()/limit));
   
    }

    }
  


  function handlePageChange(value){
    if(value ==="&laquo;") {
    setPage(1);
    }
  else if(value === "&lsaquo;"){
  if( page!==1){
    setPage(page-1);
  }
  }
  else if(value === "&rsaquo;"){
  if(page!== totalPage){
    setPage(page+1);
  }
  }
  else if(value === "&raquo;"){
  setPage(totalPage);
  }else {
    if(value!=="...") setPage(value);
  }

  }

    const handleChange = (e) => {
      setIssc(e.target.id);
      const {id,checked} = e.target;
      const newset= new Set(count);
      if(id === "checkbox-all") {
      if(checked){
        for(let i=0;i<users.length;i++){
          newset.add(users[i].id);
        }
      }else{
        for(let i=0;i<users.length;i++){
        newset.delete(users[i].id);
        }
      }
    
        let tempuser = users.map( user =>{ return {...user, ischecked : checked}});
        addcheckall(page,limit,checked); 
        setUsers(tempuser);
      }else{
        if(checked){
          newset.add(id);
        }else{
          newset.delete(id);
        }

    let tempuser = users.map( user => user.id === id ? {...user, ischecked : checked} : user);
    addcheck(id,checked);
    setUsers(tempuser);
      }
      setCount(newset);
    } 

  function handleEdit(id,user){
    setUpdateState(id);
    setName(user.name);
  }

  function handleUpdate(e){

  }

    return (
      <>
      <div className='head'> Admin Panel</div>
      <div className='heading'>
  <form onSubmit={handleSubmit}>
    
    <div class="form-group">
      <label for="Search"></label>
      <input className='searchinn' type="text" class="" id="search"  placeholder="Search"  onChange={handleInput}/>
      <button type="submit" class="search" >Search</button>
    </div>
  </form>
  
                  <MdDelete className='icon' onClick={ deletecheck}/>
                </div>
  <div class="max-w-2xl mx-auto">

    <div class="flex flex-col">
      <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <div class="inline-block min-w-full align-middle">
          
    <table class="table ">
      <thead class="thead-dark">
        <tr className='fs-4 text ' >
                              <th scope="col" >
                                  <div class="form-check form-check-lg">
                                    <input id="checkbox-all" class="form-check-input" type="checkbox"
                                    checked = {users.filter(user => user?.ischecked !== true).length  === 0}
                                    onChange={handleChange}
                                    />
                                      <label class="form-check-label" for="checkbox-all" ></label>
                                  </div> 
                              </th>
                              <th scope="col" >
                                  Name
                              </th>
                              <th scope="col" >
                                  Email
                              </th>
                              <th scope="col" >
                                  Role
                              </th>
                              <th scope="col" >
                                  Actions
                              </th>
                          </tr>
                      </thead>
                      <tbody> 
                        {users.map((user) => (
                          (updateState===user.id) ? <Edit user={user} users={users} setUsers={setUsers}/> :
                          <tr key={user.id} className='fs-4 text '>
                              <td className={user.ischecked ? 'bg-secondary text-white' : ''}>
                                  <div class="form-check form-check-lg">
                                      <input  id={user.id} class="form-check-input" type="checkbox" onChange={handleChange} checked = {user.ischecked || false}  />
                                      <label for={user.id} class="form-check-label"></label>
                                  </div>
                              </td>
                              <td className={`fs-4 text ${user.ischecked ? 'bg-secondary text-white' : ''}` } >{user.name}</td>
                              <td className={`fs-4 text ${user.ischecked ? 'bg-secondary text-white' : ''}`}>{user.email}</td>
                              <td className={`fs-4 text ${user.ischecked ? 'bg-secondary text-white' : ''}`}>{user.role}</td>
                              <td className={`fs-4 text ${user.ischecked ? 'bg-secondary text-white' : ''}`}>
                                <div className='font'>
                              <FaEdit  type="button"  className='edit' onClick={()=>handleEdit(user.id,user)}/>
                                  <MdDelete type="button" className='delete' onClick={()=>singledelete(user.id)}/>
                                  </div>
                              </td>
                          </tr>
                        ))}
                      


                          
                      </tbody>
                  </table>
                
                
              
          </div>
      </div>
  </div>

    
  </div>
  <div className='all'>
    <p className='count'> {count.size} out of {gettotal} row(s) selected</p>
  <div className='pagi'>
    <p className='page'>Page {page} of {totalPage}</p>
  <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1} onPageChange={handlePageChange}/>
   </div>
   </div>
    </>
    );
    function Edit  ({ user, users, setUsers }) {
      const [editedUser, setEditedUser] = useState(user);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
      };
    
      const handleSave = (e) => {
        e.preventDefault();

        const updatedUsers = users.map((u) =>
          u.id === editedUser.id ? editedUser : u
        );

        setUsers(updatedUsers);
        updatedmain(editedUser);
        setUpdateState(-1);
   
      };
    
      return (
        <tr>
      <td></td>    
 
          <td className='td'>
            <input
            className='inputi'
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
            </td>
            <td className='td'>
            <input
            className='inputi'
              type="text"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
            </td>
            <td className='td'>
            <input
            className='inputi'
              type="text"
              name="role"
              value={editedUser.role}
              onChange={handleInputChange}
            />
            </td>
            {/* Other input fields for editing */}
            <td >
            <button className='buttoni save' onClick={handleSave}>Save</button>
          </td>
        </tr>
      );
    };


  }

  export default App;
