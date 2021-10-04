<script>
  // imports
  import { onMount } from "svelte";
  import { app } from "../_config.svelte";
  import {
    collection,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    startAfter,
    query,
    endBefore,
    limitToLast,
  } from "firebase/firestore";
  import CardDetails from "./CardDetails.svelte";
  import { fade, fly } from "svelte/transition";

  let data = undefined;
  let latestDoc;
  let firstDoc;
  let error;
  onMount(async () => {
    getInitData();
  });

  async function getInitData() {
    const first = query(
      collection(getFirestore(app), "docs"),
      orderBy("title"),
      startAfter(latestDoc || 0),
      limit(2)
    );
    try {
      let documentSnapshots = await getDocs(first);
      latestDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      firstDoc = documentSnapshots.docs[0];
      data = documentSnapshots.docs;
    } catch (e) {
      error = "Error Loading Documents Please Check Your Internet...";
    }
  }

  async function getPrev() {
    const last = query(
      collection(getFirestore(app), "docs"),
      orderBy("title"),
      endBefore(firstDoc),
      limitToLast(2)
    );
    let documentSnapshots = await getDocs(last);
    data = documentSnapshots.docs;
    latestDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    firstDoc = documentSnapshots.docs[0];
  }
</script>

<svelte:head>
  <title>Ktp Plans || Blog</title>
</svelte:head>
<div class="banner"   
>
  <h4>Learn The Fundamentals Of Developing a Business</h4>
  <p>Learn Business Planing , Learn Business Propsal Wirting</p>
</div>

<div class="grid">
  {#if data}
    {#each data as dat (dat.id)}
      <div transition:fade>
        <CardDetails {...dat.data()} id={dat.id} />
      </div>
    {/each}
  {:else}
   <p>Loading..</p>
    <br />
    <br />
    <br />
  {/if}
</div>
{#if error}{error}{:else}<p />{/if}
<button on:click={getPrev} class="btn red"> 👈️ Prev</button>
<button on:click={getInitData} class="btn success"> Next 👉️</button>

<style>
  .grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .banner {
    background: salmon;
    padding: 30px;
    text-align: center;
    height: 250px;
    color: #fff;
  }
</style>
