<script>
  import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
  import { doc, getFirestore, setDoc } from "firebase/firestore";
  let file;
  let title;
  let body;

  let progress = 0;

  let content;
  let visible = false;
  import { app, storage } from ".././_config.svelte";
  let uploadTask;
  const handleSubmit = (e) => {
    if (file) {
      const storageRef = ref(storage, `images/${file[0].name}`);
      uploadTask = uploadBytesResumable(storageRef, file[0]);

      uploadTask.on(
        "state_changed",
        async (snapshot) => {
          const pro = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress = pro;
          switch (snapshot.state) {
            case "paused":
              (visible = true), (content = "The Upload Was Paused");
              break;
            case "running":
              visible = true;
              content = "File Uploading";
              // setTimeout(() => {
              //   visible = false;
              //   content = "";
              // }, 1200);
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              content = "Permisson Denied";
              visible = true;
              break;
            case "storage/canceled":
              // User canceled the upload
              content = "Canceld";
              visible = true;
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            visible = true;
            content = "File Uploaded Posting Data...";
            const postData = {
              title,
              body: body,
              url: downloadURL,
            };
            await setDoc(
              doc(getFirestore(app), "docs", title.replaceAll(" ", "-")),
              postData
            );
            visible = false;
          });
        }
      );
    }
  };
</script>

<h5>Upload A New Catergory</h5>
<div class="container">
  <form on:submit|preventDefault={() => handleSubmit()}>
    <div class="row">
      <div class="input-field col s6">
        <input
          bind:value={title}
          id="first_name"
          type="text"
          class="validate"
        />
        <label for="first_name">Catergory Title</label>
      </div>
      <div class="input-field col s6">
        <input bind:value={body} id="body" type="text" class="validate" />
        <label for="body">Catergory Body</label>
      </div>

      <button class="btn blue ">Submit</button>
      <button
        class="btn  red"
        on:click={uploadTask.cancel()}
        disabled={!visible}>Cancel</button
      >
    </div>
    {#if progress > 0}
      <div class="progress">
        <div class="determinate" style="width:{progress}%" />
      </div>
    {/if}

    <div class="file-field input-field">
      <div class="btn">
        <span>File <i class="material-icons">perm_media</i></span>
        <input type="file" bind:files={file} />
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" />
      </div>
    </div>
  </form>
</div>

<style>
  input {
    margin: 10px;
  }
</style>
