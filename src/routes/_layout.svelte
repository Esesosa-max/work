<script>
  import { onMount } from "svelte";

  import Nav from "./_Nav.svelte";
  onMount(() => M.AutoInit());
  export let segment;
</script>

<Nav {segment} />

<slot />
<footer class="blue darken-4 text-white ">
  <div class=" py-3 footer-flex">
    <span>Kpt Plans</span>Home<span>Contact</span><span>Team</span>
    <span>Blog</span>
  </div>
</footer>

<style>
  footer {
    position: absolute;
    bottom: 0;
  }
  .footer-flex {
    display: flex;
    justify-content: space-around;
    font-size: 1.24rem;
    /* font-size: 30; */
  }
  :global(.text-white) {
    color: #fff;
  }
  .py-3 {
    padding: 2em;
  }
  @media (max-width: 450px) {
    .footer-flex {
      font-size: 1.1rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .footer-flex span {
      margin: 10px 0px;
    }
    :global(h3, h2, h4) {
      font-size: 1.5rem;
      text-align: center;
    }
  }
  @media (max-width: 1200px) {
    :global(h3, h2, h4) {
      font-size: 1.5rem;
      text-align: center;
    }
  }
</style>
