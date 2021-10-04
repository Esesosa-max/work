<script>
  import {
    collection,
    getDocs,
    getFirestore,
    query,
  } from "@firebase/firestore";
  import { app } from "../_config.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  $: id = null;

  let dataObj;
  onMount(async () => {
    id = window.location.pathname.replace("/docs/", "");
    const q = query(collection(getFirestore(app), `docs/${id}/blogs`));
    let documentSnapshots = await getDocs(q);
    dataObj = documentSnapshots.docs;
    M.AutoInit();
  });
  const handleChange = (id) => {
    dispatch("changeContent", id);
  };
</script>
<div class="fixed-action-btn">
  <button
    href=""
    class="btn-floating btn-large red sidenav-trigger"
    data-target="slide-out"
  >
    <i class="large material-icons">menu</i>
  </button>
</div>
<ul id="slide-out" class="sidenav container">
  <li>
    <h6 class="center-align">Table of Content</h6>
  </li>
  {#if dataObj}
    {#each dataObj as data (data.id)}
      <li>
        <button class="waves-effect">
          <ul>
            <li>
              <button on:click={() => handleChange(data.id)}
                >{data.data().title}</button
              >
            </li>
          </ul>
        </button>
      </li>
    {/each}
  {:else}
   <p>Loading..</p>
  {/if}
</ul>
