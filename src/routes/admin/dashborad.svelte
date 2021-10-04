<script>
  import {
    collection,
    query,
    orderBy,
    startAfter,
    getDocs,
    getFirestore,
    doc,
  } from "firebase/firestore";
  import { app } from "../_config.svelte";
  import { onMount } from "svelte";
  let colleId;

  let collectionobj = [];
  let docsObj;
  import { deleteDoc } from "firebase/firestore";
  onMount(async () => {
    getInitData();
    M.AutoInit();
  });
  async function handleDelete(id) {
    console.log(colleId, id);
    await deleteDoc(doc(getFirestore(app), `docs/${colleId}/blogs/${id}`));
  }
  async function getInitData() {
    const first = query(
      collection(getFirestore(app), "docs"),
      orderBy("title"),
      startAfter(0)
    );
    let documentSnapshots = await getDocs(first);
    collectionobj = documentSnapshots.docs;
  }
  async function getAllDocuments(id) {
    colleId = id;
    const first = query(collection(getFirestore(app), `docs/${id}/blogs`));
    let documentSnapshots = await getDocs(first);
    docsObj = documentSnapshots.docs;
    console.log(documentSnapshots.docs, id);
    console.log(`Got The Documents You Asked ${docsObj}    `);
  }
</script>

<ul id="slide-out" class="sidenav">
  <h4>Collections</h4>

  {#if collectionobj.length > 0}
    {#each collectionobj as data2, i (data2.id)}
      <li>
        <a href="admin/dashborad" on:click={() => getAllDocuments(data2.id)}>
          Catergory {data2.data().title}</a
        >
      </li>
    {:else}
      <p>No Data..</p>
    {/each}
  {/if}
</ul>
<div class="fixed-action-btn">
  <a
    class="btn-floating btn-large blue sidenav-trigger"
    href="admin/dashborad"
    data-target="slide-out"
  >
    <i class="large material-icons">mode_edit</i>
  </a>
</div>

{#if docsObj}
  <h4 class="center-align">All Documents in {colleId}</h4>
  <table class=" centered">
    <thead>
      <tr>
        <th>docs</th>
        <th>ops</th>
        <th />
      </tr>
    </thead>

    <tbody>
      {#each docsObj as data2, i (data2.id)}
        <tr>
          <td>{data2.data().title}</td>
          <td
            ><button
              class="btn btn-danger"
              on:click={() => handleDelete(data2.id)}>Delete</button
            ></td
          >
          <td
            ><a class="btn btn-info" href="/admin/edit/{colleId}/{data2.id}"
              >Edit</a
            ></td
          >
        </tr>
      {:else}
        <p />
      {/each}
    </tbody>
  </table>
{/if}

<style>
  button {
    margin: 20px;
  }
</style>
