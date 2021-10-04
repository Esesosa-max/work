<script context="module">
  export function preload(page) {
    return { page };
  }
</script>

<script>
  export let page;
  let title;
  let body;

  console.log(page.params);
  import {
    collection,
    doc,
    getDoc,
    getFirestore,
    query,
    setDoc,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import { app } from "../../../_config.svelte";
  $: type = undefined;
  onMount(() => (tinymceloaded(), getPrevData()));
  async function getPrevData() {
    const first = query(
      doc(getFirestore(app), `docs/${page.params.slug}/blogs/${page.params.id}`)
    );
    let documentSnapshots = await getDoc(first);
    title = documentSnapshots.data().title;
    body = documentSnapshots.data().html;

    console.log(documentSnapshots.data());
  }
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

  const handleSubmit = async (e) => {
    await setDoc(
      doc(getFirestore(app), "docs", page.params.slug, "blogs", page.params.id),
      {
        html: tinymce.editors[0].contentDocument.activeElement.innerHTML,
        title,
        date: new Date().toLocaleDateString(),
      }
    );
  };
</script>

<h5 class="center-align">
  Edit Document {page.params.id} on Collection {page.params.slug}
</h5>

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
    <textarea
      class="form-control"
      name=""
      id=""
      cols="30"
      rows="10"
      bind:value={body}
    />
  </div>

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
