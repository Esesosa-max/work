<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMount } from "svelte";
import { app } from "./config.svelte";
let user
const auth = getAuth(app);
  onMount(async () =>{
    M.AutoInit();
    onAuthStateChanged(auth,authUser => {
      if(authUser) user = authUser
      else{
        user = undefined
      }
    })
  })

</script>

<nav class="purple">
    <div class="nav-wrapper container">
      <a href="/" class="brand-logo">SS1-Notes</a>
      <a href="/" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/notes/all">All Subjects</a></li>
        <!-- <li><a href="/assignments">Assignments</a></li> -->
        <li><a href="/auth/signup" class="btn" >Sign Up Admin</a></li>
        {#if user}
          
        <li><a href="/notes/new" class="btn purple">Add New Note to Topic</a></li>
        <li><a href="/topics/new" class="btn purple">Add New Topic to Subject</a></li>
        {/if}
      </ul>
    </div>
 
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><a href="/notes/all">All Subjcets</a></li>
    <!-- <li><a href="/works">Assignments</a></li> -->
    <li><a href="/auth/signup" class="btn" >Sign Up Admin</a></li>
    {#if user}
    <li><a href="/notes/new" class="btn purple">Add New Note</a></li>
        <li><a href="/topics/new" class="btn purple">Add New Topic to Subject</a></li>
    {/if}
  </ul>

  


        