<script>
  import { getAuth, onAuthStateChanged } from "@firebase/auth";
  import { onMount } from "svelte";
  import { app } from "./_config.svelte";
  export let segment;
  let user2;
  onMount(() => {
    onAuthStateChanged(getAuth(app), (user) => {
      if (user) {
        user2 = user;
      } else {
      }
    });
  });
</script>

{#if segment !== "admin"}
  <nav class="purple">
    <div class="nav-wrapper container">
      <a href="/" class="brand-logo">KptPlans</a>
      <a href="/" data-target="mobile-demo" class="sidenav-trigger"
        ><i class="material-icons">menu</i></a
      >
      <ul class="right hide-on-med-and-down">
        {#if user2}
          <li><a href="/admin" rel="prefetch">Admin</a></li>
        {/if}
        <li><a href="/about" rel="prefetch">About</a></li>
        <li><a href="/blog" rel="prefetch">Blog</a></li>
      </ul>
    </div>
  </nav>
  <ul class="sidenav" id="mobile-demo">
    <li><a href="/about" rel="prefetch">About</a></li>
    {#if user2}
      <li><a href="/admin" rel="prefetch">Admin</a></li>
    {/if}
    <li><a href="/" rel="prefetch">Home</a></li>
    <li><a href="/blog" rel="prefetch">Blog</a></li>
  </ul>
{/if}
