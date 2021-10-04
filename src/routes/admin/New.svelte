<script>
  import {
    collection,
    doc,
    getDocs,
    getFirestore,
    query,
    setDoc,
  } from "firebase/firestore";
  import { onMount } from "svelte";

  import { app, storage } from ".././_config.svelte";
  let title;
  $: type = undefined;

  let progress = 0;
  let categoryData;
  onMount(() => (tinymceloaded(), getCatergoryData()));
  function tinymceloaded() {
    //set up the tinymceloaded variable as a function here
    if (tinymce) {
      M.AutoInit();

      type = tinymce;
      tinymce.init({
        selector: "textarea",
      });
    }
  }
  async function getCatergoryData() {
    const first = query(collection(getFirestore(app), "docs"));
    let snapshot = await getDocs(first);
    categoryData = snapshot.docs;
  }
  let content;
  let visible = false;
  let uploadTask;
  const handleSubmit = async (e) => {
    let selected = document.querySelector("select").value;
    await setDoc(
      doc(
        getFirestore(app),
        "docs",
        selected.replaceAll(" ", "-"),
        "blogs",
        title.replaceAll(" ", "-")
      ),
      {
        html: tinymce.editors[0].contentDocument.activeElement.innerHTML,
        title,
        date: new Date().toLocaleDateString(),
      }
    );
  };
</script>

<h5>Start A New Catergory</h5>

<form on:submit|preventDefault={() => handleSubmit()}>
  <div class="form-group">
    <input
      type="text"
      bind:value={title}
      class="form-control"
      placeholder="Blog Title"
    />
  </div>
  <div class="">
    <textarea class="form-control" name="" id="" cols="30" rows="10" />
  </div>

  <select class="browser-default">
    <option selected>Choose Catergory</option>
    {#if categoryData}
      {#each categoryData as catergory (catergory.id)}
        <option value={catergory.data().title}>{catergory.data().title}</option>
      {/each}
    {:else}
      <p>Loading....</p>
    {/if}
  </select>

  <button class="btn btn-primary mb-3 ">Submit</button>
</form>

<style>
  input {
    margin: 10px;
  }

  form {
    margin: 0 auto;
    width: 960px;
  }
</style>
