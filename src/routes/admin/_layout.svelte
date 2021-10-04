<script>
  import { getAuth, onAuthStateChanged } from "@firebase/auth";
  import { onMount } from "svelte";
  import { app } from "../_config.svelte";
  import { goto } from "@sapper/app";
  let user2;
  onMount(() => {
    onAuthStateChanged(getAuth(app), (user) => {
      if (user) {
        user2 = user;
        M.AutoInit();
      } else {
        setTimeout(() => {
          goto("/");
        }, 2000);
      }
    });
  });
  import NavComponent from "./_Nav.svelte";
</script>

<main>
  {#if user2}
    <NavComponent />
    <slot />
  {:else}
    <h1>Page Not Found ! 404</h1>
  {/if}
</main>
