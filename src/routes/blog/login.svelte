<script>
  import { app } from "../_config.svelte";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { goto } from "@sapper/app";
  let email;
  let password;
  const handleClick = (e) => {
    if (email && password) {
      signInWithEmailAndPassword(getAuth(app), email, password)
        .then((user) => {
          console.log(user);
          M.toast({ html: "Success" });
          setTimeout(() => {
            goto("/admin");
          }, 1000);
        })
        .catch((err) => M.toast({ html: err.code }));
    }
  };
</script>

<div class="container">
  <h4 class="center-align">Login Into Your Account</h4>
  <form on:submit|preventDefault={handleClick}>
    <input type="text" bind:value={email} id="email" class="validate" />
    <label for="email">Enter Email</label>
    <input type="text" bind:value={password} id="password" />
    <label for="password">Enter Password</label>
    <button class="btn green darken-2">Submit</button>
  </form>
</div>
