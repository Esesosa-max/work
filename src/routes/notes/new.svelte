<h4>Upload A New Note</h4>
<script>
import {
    setDoc,
    addDoc
} from "firebase/firestore";
import {
    v4 as uuidv4
} from 'uuid';
import {
    onMount,
    afterUpdate
} from "svelte";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable
} from "firebase/storage";
import {
    app
} from "../../components/config.svelte";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    doc
} from "@firebase/firestore";

const storage = getStorage(app);
let topicOption 
let file = undefined
let pork = 'Choose Catergory'
let docs
let urls = []
$: console.log(urls)
let topics

$: if (pork !== 'Choose Catergory') getSelectedData()

onMount(() => {

    M.AutoInit();
    getSubjects()
})
const getSelectedData = async e => {
    if (pork == 'Choose Catergory') return
    const q = query(collection(getFirestore(app), `subjects/${pork}/topics`));

    const querySnapshot = await getDocs(q);
    topics = querySnapshot.docs
}
const getSubjects = async () => {
    const q = query(collection(getFirestore(app), 'subjects'));
    const querySnapshot = await getDocs(q);
    docs = querySnapshot.docs
}
const handleInput = async e => {
    file = e.target.files[0]
}
const handleSubmit = async e => {
    e.preventDefault();

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
        async (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                M.toast({html:progress})
                // switch (snapshot.state) {
                //     case 'paused':
                       
                //     case 'running':
                //         console.log('Upload is running');
                //         break;
                // }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            async () => {
              console.log(uuidv4(),pork,topicOption)
                await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await setDoc(doc(getFirestore(app), `subjects/${pork}/topics/${topicOption}/notes/`, uuidv4()), {
                      image:downloadURL,
                      date:Date.now(),
                    });

                })
            }
    );

    // Add a new document with a generated id.

}
</script>
<form on:submit="{handleSubmit}" >
    <div class="row">
        
        <div class="input-field col s12">
    
  
        <select class="browser-default" bind:value="{pork}">
            <option selected>Choose Catergory</option>
            {#if docs}
              {#each docs as doc (doc.id)}
                <option value={doc.id}>{doc.id}</option>
              {/each}
            {:else}
              <p>Loading....</p>
            {/if}
          </select>

  </div>
  <div class="input-field col s12">
    <select class="browser-default" bind:value="{topicOption}">
        <option selected>Choose Catergory</option>
        {#if topics}
          {#each topics as topic (topic.id)}
            <option value={topic.id}>{topic.id}</option>
          {/each}
        {:else}
          <p>Loading....</p>
        {/if}
      </select>

    </div>   
     
</div>
<div class="file-field input-field" style='margin-top:50px' >
  <div class="btn">
    <span>File</span>
    <input type="file"  on:change="{handleInput}" >
  </div>
  <div class="file-path-wrapper">
    <input class="file-path validate" type="text" placeholder="Upload images" />
  </div>
</div>
    <button type="submit" class="btn blue darken-2">Submit</button>
 
 
  
  </form>
