<h4 id="h4">Sign Up for And Admin Account</h4>

<script>
import { app } from "../../components/config.svelte";
import { getAuth, createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {goto} from '@sapper/app'

    let username
    let email
    let password
    let Admin_password
    const handleSubmit = e => {
        e.preventDefault();
        if(Admin_password != '40402e') return
        else{

const auth = getAuth(app);
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(user,{
        displayName:username
    })
    goto('/')
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
});
        }
    }
</script>
<div class="row">
    <form class="col s12" on:submit="{handleSubmit}">
      <div class="row">
        <div class="input-field col s6">
          <input id="first_name" type="text" class="validate" bind:value="{username}">
          <label for="first_name">User_Name</label>
        </div>
     
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" bind:value="{password}">
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" bind:value="{Admin_password}">
          <label for="password">Admin_password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" bind:value="{email}">
          <label for="email">Email</label>
        </div>
      </div>

      <button type="submit" class="btn red">SignUp</button>
    </form>
  </div>
  <style>
    @media(max-width:700px){
      h4{
        font-size: 1.3rem;
    text-align: center;
      }
    }
  </style>