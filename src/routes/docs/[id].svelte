<script context="module">
  export function preload(page) {
    return { page };
  }
</script>

<script>
  import {
    collection,
    doc,
    endBefore,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    startAfter,
  } from "@firebase/firestore";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { app } from "../_config.svelte";
  import Sidebar from "./_Sidebar.svelte";
  export let page;
  let dataObj = undefined;
  let singleObj = undefined;
  let visible = false;
  onMount(async () => {
    // const docRef = doc(getFirestore(app), "docs/", page.params.id);
    // const docdata = await getDoc(docRef);
    // data = docdata.data();
    const first = query(
      collection(getFirestore(app), `docs/${page.params.id}/blogs`),
      orderBy("title"),
      startAfter(0),
      limit(1)
    );
    let documentSnapshots = await getDocs(first);
    dataObj = documentSnapshots.docs;
    visible = true;
  });
  const handleChange = async (e) => {
    const q = doc(
      getFirestore(app),
      `docs/${page.params.id}/blogs/${e.detail}`
    );

    let documentSnapshots = await getDoc(q);
    console.log(documentSnapshots.data());
    singleObj = documentSnapshots;
    visible = false;
  };
</script>

<main>
  <Sidebar on:changeContent={handleChange} />

  {#if visible}
    {#each dataObj as data (data.id)}
      <div class="banner">
        <h1>{data.data().title}</h1>
      </div>

      {@html data.data().html}
    {/each}
  {/if}

  {#if singleObj}
    <div class="banner">
      <h1>{singleObj.data().title}</h1>
    </div>
    <div class="container">

      {@html singleObj.data().html}
    </div>
  {/if}
</main>

<style>
  .banner {
    background: salmon;
    padding: 30px;
    text-align: center;
    color: #fff;
  }
</style>
